import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ render: Component, ...rest }) {
  const [isLoggedIn, setIsLoggedIn] = useState(-1);

  useEffect(() => {
    if (
      localStorage.getItem("username") !== null &&
      localStorage.getItem("room") !== null
    ) {
      setIsLoggedIn(1);
    } else {
      setIsLoggedIn(0);
    }
  }, []);

  if (isLoggedIn === -1)
    return (
      <div className="w-screen h-screen grid place-content-center">
        Redirecting you...
      </div>
    );

  if (isLoggedIn === 0) return <Redirect to="/login" />;

  if (isLoggedIn === 1)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default PrivateRoute;
