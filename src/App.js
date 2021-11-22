import React, { lazy, Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Navbar from "./pages/shared/Navbar";
import Sidebar from "./pages/shared/Sidebar";
import Footer from "./pages/shared/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routing/AppRoutes";
import Spinner from "./pages/shared/Spinner";
import { routeConstants } from "./routing/RouteConstants";

const Login = lazy(() => import("./pages/auth/Login"));
const Logout = lazy(() => import("./pages/auth/Logout"));

function App() {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";
  let footerComponent = !isFullPageLayout ? <Footer /> : "";

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route path={routeConstants.DASHBOARD_ENDPOINT}>
            <div className="container-scroller">
              {sidebarComponent}
              <div className="container-fluid page-body-wrapper">
                {navbarComponent}
                <div className="main-panel">
                  <div className="content-wrapper">
                    <AppRoutes />
                  </div>
                  {footerComponent}
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
