import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
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
              <Trans>Basic UI Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.basicUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/basic-ui/buttons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/buttons"
                  >
                    <Trans>Buttons</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/basic-ui/dropdowns")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/dropdowns"
                  >
                    <Trans>Dropdowns</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/basic-ui/typography")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/typography"
                  >
                    <Trans>Typography</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/form-elements")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.formElementsMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-playlist-play"></i>
            </span>
            <span className="menu-title">
              <Trans>Form Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.formElementsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/form-elements/basic-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/basic-elements"
                  >
                    <Trans>Basic Elements</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/tables")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.tablesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("tablesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-table-large"></i>
            </span>
            <span className="menu-title">
              <Trans>Tables</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.tablesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/tables/basic-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/basic-table"
                  >
                    <Trans>Basic Table</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/charts")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.chartsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("chartsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-chart-bar"></i>
            </span>
            <span className="menu-title">
              <Trans>Charts</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.chartsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/charts/chart-js")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chart-js"
                  >
                    <Trans>Chart Js</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/icons")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("iconsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-contacts"></i>
            </span>
            <span className="menu-title">
              <Trans>Icons</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.iconsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/icons/mdi")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/mdi"
                  >
                    <Trans>Material</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/user-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.userPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("userPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-security"></i>
            </span>
            <span className="menu-title">
              <Trans>User Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.userPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/user-pages/login-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-1"
                  >
                    <Trans>Login</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/user-pages/register-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-1"
                  >
                    <Trans>Register</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">
            <Trans>More</Trans>
          </span>
        </li>
        <li
          className={
            isPathActive("/error-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              values.errorPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("errorPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-lock"></i>
            </span>
            <span className="menu-title">
              <Trans>Error Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={values.errorPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/error-pages/error-404")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-404"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isPathActive("/error-pages/error-500")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-500"
                  >
                    500
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
