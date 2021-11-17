import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Navbar from "./pages/shared/Navbar";
import Sidebar from "./pages/shared/Sidebar";
import Footer from "./pages/shared/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";
  let footerComponent = !isFullPageLayout ? <Footer /> : "";
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
