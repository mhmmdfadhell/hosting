import Sidebar from "../../components/molecules/Sidebar";
import TableUsers from "../../components/molecules/Table/Users";

const Users = () => {
  return (
    <> 
    <div className="d-flex gap-2" style={{marginTop:'170px'}}>
      <Sidebar/>
      <div className="container p-5" style={{marginTop:'-250px'}}>
      <TableUsers/>
        </div>
    </div>
    </>
  );
};

export default Users;
