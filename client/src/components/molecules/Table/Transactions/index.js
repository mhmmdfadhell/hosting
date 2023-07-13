import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";

import convertRupiah from "rupiah-format";

import { API } from "../../../../config/server";
import ViewPayment from "../../../Modal/ViewPayment";

import { Aprove, Cancel } from "../../../../assets";

const TableTransactions = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  console.log("target", transactions);
  console.log("target product", transactions[0]?.orders);

  // fetch data toppings
  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await API("/transactions");
      console.log(response);
      setTransaction(response.data.data.transactions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data on render
  useEffect(() => {
    fetchTransaction();
  }, [wait]);

  const handleApprove = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "On The Way",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);

      await Swal.fire(
        "Approved",
        "The transaction's status successfully",
        "success"
      );

      setWait(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleCancel = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "Canceled",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);

      await Swal.fire(
        "Canceled",
        "The transaction  successfully Canceled",
        "success"
      );
      setWait(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const path = "http://localhost:5000/uploads/";

  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const handleSelectOne = (transactionId) => {
    const updatedSelectedTransactions = [...selectedTransactions];
    const transactionIndex = updatedSelectedTransactions.indexOf(transactionId);
    if (transactionIndex > -1) {
      updatedSelectedTransactions.splice(transactionIndex, 1);
    } else {
      updatedSelectedTransactions.push(transactionId);
    }
    setSelectedTransactions(updatedSelectedTransactions);
  };

  const handleSelectAll = () => {
    const transactionIds = transactions.map((transaction) => transaction.id);
    setSelectedTransactions((prevSelectedTransactions) =>
      prevSelectedTransactions.length === transactionIds.length
        ? []
        : transactionIds
    );
  };

  const calculateTotalIncome = () => {
    let totalIncome = 0;
    transactions.forEach((transaction) => {
      if (selectedTransactions.includes(transaction.id)) {
        totalIncome += parseInt(transaction.income, 10);
      }
    });
    return totalIncome;
  };

  const totalIncome = calculateTotalIncome();

  console.log("test case", transactions.income);

  return (
    <div className="d-flex gap-5" style={{ marginTop: "160px" }}>
      <div className=" table-responsive" style={{ marginTop: "-150px" }}>
        <h3 className="header3">Income Transaction</h3>
        <table
          className="table table-bordered"
          style={{ borderColor: "#000000" }}
        >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col" width="15%">
                Note Pembelian
              </th>
              <th scope="col" width="50%">
                Order Product
              </th>

              <th scope="col" width="15%">
                No.Table
              </th>
              <th scope="col" width="15%">
                Income
              </th>
              <th scope="col">Attachment</th>
              <th scope="col" width="15%">
                Tanggal Pemesanan
              </th>
              <th scope="col" width="15%">
                Status
              </th>
              <th scope="col" width="15%" className="text-center">
                Action
              </th>
              <th scope="col" width="15%" className="text-center">
                Fillter
                <div className="d-flex">
                  <input
                    type="checkbox"
                    checked={
                      selectedTransactions.length === transactions.length
                    }
                    onChange={handleSelectAll}
                    className="form-check-input"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              <>
                {transactions && transactions.length > 0 ? (
                  transactions.map((transaction, i) => (
                    <tr key={transaction.id}>
                      <td>{i + 1}</td>
                      <td>{transaction.name}</td>
                      <td>{transaction.address}</td>
                      <td>
                        {transaction.orders.map((order) => (
                          <div
                            className="d-flex gap-2 justify-content-center"
                            key={order}
                          >
                            <img
                              className="rounded"
                              src={path + order?.products?.image}
                              alt={order.products?.image}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <div>
                              <div className="d-flex gap-2 justify-content-center">
                                <h6>Product:</h6>
                                <div className="row">
                                  <div>{order?.products?.tittle}</div>

                                  {transaction.orders.map((order) => (
                                    <div key={order}>
                                      {convertRupiah
                                        .convert(order?.products?.price)
                                        .toLocaleString()}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="d-flex gap-2 justify-content-center ">
                                <h6>Extra Dish :</h6>
                                <div className="row">
                                  {transaction.orders.map((order, index) => (
                                    <div key={index}>
                                      {order.toppingorders.map(
                                        (topping, index) => (
                                          <div key={index}>
                                            <div>{topping?.toppings?.name}</div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ))}

                                  {transaction.orders.map((order, index) => (
                                    <div key={index}>
                                      {order.toppingorders.map(
                                        (topping, index) => (
                                          <div key={index}>
                                            {convertRupiah
                                              .convert(topping?.toppings?.price)
                                              .toLocaleString()}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </td>

                      <td>{transaction.postcode}</td>
                      <td align="right">
                        <label style={{ color: "#061E99" }}>
                          {convertRupiah
                            .convert(transaction.income)
                            .toLocaleString()}
                        </label>
                      </td>
                      <td className="text-center">
                        <ViewPayment
                          setShow={show}
                          handleClose={handleClose}
                          id={transaction.id}
                          image={transaction.attachment}
                        />
                      </td>
                      <td>
                        {moment(transaction.createdAt).format(
                          "HH:mm [WIB], DD-MM-YYYY"
                        )}
                      </td>
                      <td>
                        {transaction.status === "Waiting Approve" ? (
                          <label style={{ color: "#FF9900" }}>
                            {transaction.status}
                          </label>
                        ) : transaction.status === "Success" ? (
                          <label style={{ color: "#78A85A" }}>
                            {transaction.status}
                          </label>
                        ) : transaction.status === "On The Way" ? (
                          <label style={{ color: "#00D1FF" }}>
                            {transaction.status}
                          </label>
                        ) : (
                          <label style={{ color: "#E83939" }}>
                            {transaction.status}
                          </label>
                        )}
                      </td>
                      <td className="text-center">
                        {transaction.status === "Waiting Approve" ? (
                          <>
                            <Button
                              className="btn btn-danger-custom"
                              size="sm"
                              style={{ margin: "2px" }}
                              onClick={() => handleCancel(transaction.id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="btn btn-success-custom"
                              size="sm"
                              style={{ margin: "2px" }}
                              onClick={() => handleApprove(transaction.id)}
                            >
                              Approve
                            </Button>
                          </>
                        ) : transaction.status === "Completed" ? (
                          <img src={Aprove} alt="success" />
                        ) : transaction.status === "Canceled" ? (
                          <img src={Cancel} alt="cancel" />
                        ) : (
                          <img src={Aprove} alt="success" />
                        )}
                      </td>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedTransactions.includes(
                            transaction.id
                          )}
                          onChange={() => handleSelectOne(transaction.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr
                    style={{ height: "40px", borderRight: "1px solid black" }}
                  >
                    <td colSpan={4}>Tidak Ada Data!</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
        <div className="">
          <div className=" card mt-2  p-5 w-25">
            <h4>Total :</h4>
            <div>{convertRupiah.convert(totalIncome).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTransactions;
