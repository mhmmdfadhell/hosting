import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API } from "../../../../config/server";
import Loading from "../../../Loading";

export default function TableUsers() {
  const router = useHistory()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  // fetch data toppings
  const fetchUers = async () => {
    try {
      setLoading(true);
      const response = await API("/users");
      console.log(response);
      setUsers(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data on render
  useEffect(() => {
    fetchUers();
  }, [wait]);

 

const addPageUsers = () => {
  router.push('/add-user')
}

  return loading || !users || users.length < 1 ? (
    <Loading />
  ) : (
    <div>
        <div className=" d-flex justify-content-end ms-5" style={{marginBottom:'-160px',marginTop:'170px'}} onClick={addPageUsers}>
      <Button  className="btn btn-primary" style={{background:"#A94B00",border:"1px solid #A94B00",cursor:"pointer"}} >Tambah Users</Button>
      </div>
      <div>
      <h3 className="header3">List Pengguna</h3>
      <table
        className="table table-bordered"
        style={{ borderColor: "#000000" }}
      >
        <thead style={{ backgroundColor: "#E5E5E5" }}>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col" width="15%">
              Email
            </th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        ) : (
          <>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr style={{ height: '40px', borderRight: '1px solid black' }}>
                <td colSpan={4}>Tidak Ada Data!</td>
              </tr>
            )}
          </>
        )}
      </tbody>
      </table>
    </div>
    </div>
  )
}
