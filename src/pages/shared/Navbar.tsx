import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { routeConstants } from "../../routing/RouteConstants";
import { encryptStorage } from "../../common/helpers";

const Navbar = () => {
  const toggleOffcanvas = () => {
    (document as any)
      .querySelector(".sidebar-offcanvas")
      .classList!.toggle("active");
  };

  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img
            src={require("../../assets/images/vfdLogo.svg").default}
            alt="logom"
            style={{ verticalAlign: "middle" }}
            height="40"
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <Dropdown alignRight as="li" className="nav-item">
            <Dropdown.Toggle
              as="a"
              className="nav-link cursor-pointer no-caret"
            >
              <div className="navbar-profile">
                <img
                  className="img-xs rounded-circle"
                  src={require("../../assets/images/faces/face15.jpg").default}
                  alt="profile"
                />
                <p className="mb-0 d-none d-sm-block navbar-profile-name">
                  <Trans>{encryptStorage.getItem("name")}</Trans>
                </p>
                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
              <h6 className="p-3 mb-0">
                <Trans>Profile</Trans>
              </h6>
              <Dropdown.Divider />
              <Dropdown.Item
                href={routeConstants.LOGOUT_ENDPOINT}
                className="preview-item"
              >
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">
                    <Trans>Log Out</Trans>
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <div className="text-center">
                <small className="p-3 mb-0 text-center">
                  <Trans> - you are the best -</Trans>
                </small>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="mdi mdi-format-line-spacing"></span>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
