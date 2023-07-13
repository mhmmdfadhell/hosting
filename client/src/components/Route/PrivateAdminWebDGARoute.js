import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PrivateAdminWebDGARoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  console.log("TSS", state);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.isLogin === true && state.user.role === "AdminWebDGA") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/transaction" />;
        }
      }}
    />
  );
};

export default PrivateAdminWebDGARoute;
