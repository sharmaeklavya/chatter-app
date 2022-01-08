import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

function PrivateRoute({ render: Component, ...rest }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(-1);

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    if (!location.search.includes(username) || !location.search.includes(room))
      return setIsLoggedIn(0);

    if (username === "" || room === "") return setIsLoggedIn(0);

    if (
      localStorage.getItem("username") !== null &&
      localStorage.getItem("room") !== null
    ) {
      setIsLoggedIn(1);
    } else {
      setIsLoggedIn(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
