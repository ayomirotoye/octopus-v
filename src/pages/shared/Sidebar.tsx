import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";

const Sidebar = () => {
  const location = useLocation();

  const [values, setValues] = useState(Object.assign({}));
  
  const toggleMenuState = (menuState: any) => {
    if (values[menuState]) {
      setValues({ [menuState]: false });
    } else if (Object.keys(values).length === 0) {
      setValues({ [menuState]: true });
    } else {
      Object.keys(values).forEach((i) => {
        setValues({ [i]: false });
      });
      setValues({ [menuState]: true });
    }
  };

  useEffect(() => {
    onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = (document as any).querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if ((body as any).classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if ((body as any).classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  const onRouteChanged = () => {
    (document as any).querySelector("#sidebar").classList.remove("active");
    Object.keys(values).forEach((i) => {
      setValues({ [i]: false });
    });
    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setValues({ [obj.state]: true });
      }
    });
  };

  const isPathActive = (path: any) => {
    return location?.pathname?.startsWith(path);
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <div id="photo" style={{ textAlign: "left" }}>
          <span style={{ verticalAlign: "middle" }}>OCTOPUS</span>
          <img
            src={require("../../assets/images/vfdLogo.svg").default}
            alt="logom"
            style={{ verticalAlign: "middle" }}
            height="40"
          />
        </div>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img
            src={require("../../assets/images/logo-mini.svg").default}
            alt="logo"
          />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item nav-category">
          <span className="nav-link">
            <Trans>Navigation</Trans>
          </span>
        </li>
        <li
          className={
            isPathActive("/dashboard")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <Link className="nav-link" to="/dashboard">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">
              <Trans>Dashboard</Trans>
            </span>
          </Link>
        </li>
        <li
          className={
            isPathActive("/basic-ui")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.basicUiMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("basicUiMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-laptop"></i>
            </span>
            <span className="menu-title">
              <Trans>EKEDP Transactions</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.basicUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/transactions/ekedp")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/transactions/ekedp"
                  >
                    <Trans>View</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
