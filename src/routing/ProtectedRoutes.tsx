import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router";
import Spinner from "../pages/shared/Spinner";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const Transactions = lazy(() => import("../pages/transactions/Transactions"));

const ProtectedRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/transactions" component={Transactions} />
      </Switch>
    </Suspense>
  );
};

export default ProtectedRoutes;