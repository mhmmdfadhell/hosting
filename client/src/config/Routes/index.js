import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../../components/Navbar/Header";

import PrivateAdminRoute from "../../components/Route/PrivateAdminRoute";
import PrivateRoute from "../../components/Route/PrivateRoute";
import { API, setAuthToken } from "../server";
import { AppContext } from "../../context/AppContext";

import Transaction from "../../pages/admin/Transactions";
import AddProduct from "../../pages/admin/AddProduct";
import AddTopping from "../../pages/admin/AddTopping";

import Profile from "../../pages/user/Profile";
import Product from "../../pages/user/Product";
import Loading from "../../components/Loading";
import Cart from "../../pages/user/CartPage";
import Home from "../../pages/Home";
import EditProfile from "../../pages/user/EditProfile";
// import Dashboard from "../../pages/admin/Dashboard";
import NotFound from "../../pages/NotFound";
import EditProduct from "../../pages/admin/EditProduct";
// import Footer from "../../components/Footer/Footer";
import Complain from "../../pages/user/Complain";
import ComplainAdmin from "../../pages/admin/ComplainAdmin";
import Users from "../../pages/admin/Users";
import AddUsers from "../../pages/admin/AddUsers";
import Toppings from "../../pages/admin/Toppings"
import Products from "../../pages/admin/Products"

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Routes = () => {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        let payload = response.data.data.user;
        payload.token = localStorage.token;

        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
        dispatch({
          type: "UPDATE_CART",
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return state.isLoading ? (
    <Loading />
  ) : (
    <div className="mt-5">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />

          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/editprofile" component={EditProfile} />
          <PrivateRoute exact path="/product/:id" component={Product} />
          <PrivateRoute exact path="/complain" component={Complain} />
          <PrivateAdminRoute exact path="/addProduct" component={AddProduct} />
          <PrivateAdminRoute
            exact
            path="/complain-admin"
            component={ComplainAdmin}
          />
          <PrivateAdminRoute
            exact
            path="/editproduct"
            component={EditProduct}
          />
          <PrivateAdminRoute exact path="/addTopping" component={AddTopping} />

          <PrivateAdminRoute
            exact
            path="/transaction"
            component={Transaction}
          />

      <PrivateAdminRoute
            exact
            path="/users"
            component={Users}
          />
      <PrivateAdminRoute
            exact
            path="/toppings"
            component={Toppings}
          />
      <PrivateAdminRoute
            exact
            path="/products"
            component={Products}
          />

        <PrivateAdminRoute
            exact
            path="/add-user"
            component={AddUsers}
          />

          <Route>
            <Redirect to="/notfound" />
            <NotFound />
          </Route>

        </Switch>
        {/* <Footer style={{ marginTop: "100px" }} /> */}
      </Router>
    </div>
  );
};

export default Routes;
