import Sidebar from "../../components/molecules/Sidebar";
import TableTransactions from "../../components/molecules/Table/Transactions";

const Transactions = () => {
  return (
    <div>
      <div className="d-flex gap-2" style={{ marginTop: "170px" }}>
        <Sidebar />
        <div className="container p-5" style={{ marginTop: "-250px" }}>
          <TableTransactions />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
