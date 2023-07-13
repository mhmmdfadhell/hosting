import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API } from "../../../../config/server";

export default function TableToppings() {
  const router = useHistory();
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  // fetch data toppings
  const fetchToppings = async () => {
    try {
      setLoading(true);
      const response = await API.get("/toppings");
      console.log("respons=>", response);
      setToppings(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data on component mount and when `wait` state changes
  useEffect(() => {
    fetchToppings();
  }, [wait]);

  const addPageToppings = () => {
    router.push("/addtopping");
  };

  return (
    <div>
      <div
        className=" d-flex justify-content-end ms-5"
        style={{ marginBottom: "-160px", marginTop: "170px" }}
        onClick={addPageToppings}
      >
        <Button
          className="btn btn-primary"
          style={{ background: "#A94B00", border: "1px solid #A94B00" }}
        >
          Tambah Topping
        </Button>
      </div>
      <div>
        <h3 className="header3">List Topping</h3>
        <table
          className="table table-bordered"
          style={{ borderColor: "#000000" }}
        >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col" width="15%">
                Price
              </th>
              <th scope="col">Image</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              <>
                {toppings && toppings.length > 0 ? (
                  toppings.map((topping, index) => (
                    <tr key={topping.id}>
                      <td>{index + 1}</td>
                      <td>{topping.name}</td>
                      <td>{topping.price}</td>
                      <td>
                        <img
                          src={topping.image}
                          alt={topping.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>{topping.stock}</td>
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
      </div>
    </div>
  );
}
