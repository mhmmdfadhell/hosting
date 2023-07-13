import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { API } from "../../../../config/server";




const AddUsers = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullname: "",
        role:""
      });
      const handleChange = (e) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
  
      const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify(formData);
          const response = await API.post("/register", body, config);
          console.log(response);
    
          // Notification
            if (response.status === 200) {
                Swal.fire({
                text: "Success create account !",
                icon: "success",
                confirmButtonColor: "red",
                }).then((result) => {
                if (result.dismiss === Swal.DismissReason.close) {
                    // Your logic here after the Swal dialog is closed
                    console.log("Swal dialog closed without confirmation.");
                }
                });
            } else {
                Swal.fire({
                text: "Failed create account !",
                icon: "error",
                confirmButtonColor: "red",
                });
            }
        } catch (error) {
          Swal.fire({
            text: "Failed create account !",
            icon: "error",
            confirmButtonColor: "red",
          });
          console.log(error);
        }
      };

    const cancelUsers = () => {
        history.push('/users')
    }

  return (
    <div>
       <div className="container content-add-product mb-5" style={{marginTop:'200px'}}>
      <div className="row text-red">
          <h3>Tambah Users</h3>
          <Form onSubmit={handleOnSubmit}>
        <div className="">
            <Form.Group className="mt-5 mb-4">
              <Form.Control
                className="input-overide"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
                placeholder="Email"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                className="input-overide"
                type="text"
                name="fullname"
                onChange={(e) => handleChange(e)}
                placeholder="FullName"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                className="input-overide"
                name="password"
                type="password"
                min={0}
                onChange={(e) => handleChange(e)}
                placeholder="Password"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Select
                className="input-overide"
                aria-label="Default select example"
                name="role" // Set the name to "fullname"
                value={formData.role} // Set the value to the selected option
                onChange={handleChange} // Add onChange event handler
                >
                <option>Role Admin</option>
                <option value="AdminWebDGA">Web DG A</option>
                <option value="AdminWebDGB">Web DG B</option>
                </Form.Select>
            </Form.Group>
        </div>
        <div className="d-flex gap-3">
        <Button onChange={(e) => handleChange(e)} type="submit" className="btn btn-danger" style={{width:'90px',borderRadius:'4px'}}>
            Tambah
        </Button>
        <Button className="btn btn-dark" onClick={cancelUsers}>Kembali</Button> 
      </div>
          </Form>
          
      </div>
    </div>
    </div>
  )
}
export default AddUsers;
