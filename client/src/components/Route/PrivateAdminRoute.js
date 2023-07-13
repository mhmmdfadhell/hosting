// import { useContext } from "react";
// import { Redirect, Route } from "react-router-dom";
// import { AppContext } from "../../context/AppContext";

// const PrivateAdminRoute = ({ component: Component, ...rest }) => {
//   const [state] = useContext(AppContext);
//   const { isLogin, user } = state;
  
//   console.log("TSS", state);

//   const isAdmin =
//     isLogin &&
//     (user.role === "Administrator" || user.role === "AdminWebDGA");

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAdmin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/transaction" />
//         )
//       }
//     />
//   );
// };

// export default PrivateAdminRoute;
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  console.log("TSS", state);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.isLogin === true && state.user.role === "Administrator" || state.user.role === "AdminWebDGA" || state.user.role === "AdminWebDGB") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/transaction" />;
        }
      }}
    />
  );
};

export default PrivateAdminRoute;