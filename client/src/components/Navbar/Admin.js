import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";
import { addproduct, addtopping, keranjang, logout, chat } from "../../assets";
import { AppContext } from "../../context/AppContext";
import Avatar from "react-avatar";
import { API } from "../../config/server";

const Admin = (props) => {
  const [profile, setProfile] = useState({});
  const router = useHistory();
  const [state] = useContext(AppContext);

  const getUser = async () => {
    try {
      //   setWait(true)
      const getProfile = await API.get("/profile");
      setProfile(getProfile.data.data.users);
      //  setWait(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [state]);

  console.log("STATE", state);
  const goToTransaction = () => {
    router.push("/transaction");
  };

  const goToChatAdmin = () => {
    router.push("/complain-admin");
  };

  return (
    <div>
      <Nav>
        <Dropdown>
          <Dropdown.Toggle
            as={Nav.Link}
            style={{ marginRight: "10px", marginLeft: "-10px" }}
          >
            <Avatar
              name={profile.fullname}
              round="50px"
              alt="profile"
              className="img-avatar-user"
              size="60"
              style={{
                // marginLeft: "-25px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className="dropdown-menu">
            <Dropdown.Item onClick={goToChatAdmin} className="mb-3">
              <img src={chat} alt="profile" className="img-icon me-1" />
              Chat User
            </Dropdown.Item>
            <Dropdown.Item onClick={goToTransaction} className="mb-3">
              <img src={keranjang} alt="profile" className="img-icon mr-3" />
              Transactions
            </Dropdown.Item>
            <hr style={{ width: "100%", height: "1px" }} />
            <Dropdown.Item onClick={props.handleLogout}>
              <img src={logout} alt="profile" className="img-icon mr-3" />
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Admin;
