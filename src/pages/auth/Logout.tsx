import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useLogout } from "../../common/custom-hooks";
import { routeConstants } from "../../routing/RouteConstants";

const Logout = () => {
  const { doLogout } = useLogout();

  useEffect(() => {
    const loggingOut = doLogout;

    loggingOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Redirect to={routeConstants.LOGOUT_ENDPOINT} />
    </>
  );
};

export default Logout;
