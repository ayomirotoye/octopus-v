import React, { Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";
import Spinner from "../pages/shared/Spinner";
import { routeConstants } from "./RouteConstants";
import ProtectedRoutes from "./ProtectedRoutes";
import { GuardedRoute } from "../auth-guard/GuardedRoute";
import { httpServiceInterfaceOauth2 } from "../services/http-service";
import { encryptStorage } from "../common/helpers";

const AppRoutes = () => {
  useEffect(() => {
    httpServiceInterfaceOauth2.setJwt(encryptStorage.getItem("accessToken"));
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <GuardedRoute path={routeConstants.DASHBOARD_ENDPOINT}>
          <ProtectedRoutes />
        </GuardedRoute>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
