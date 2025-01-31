import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Navbar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const sidebarToggleHandler = (e) => {
    e.preventDefault();

    if (!sidebarToggle) {
      //add class on body
      document.body.classList.add("sb-sidenav-toggled");

      setSidebarToggle(true);
    } else {
      document.body.classList.remove("sb-sidenav-toggled");

      setSidebarToggle(false);
    }
  };

  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();

    //fecth to rest API for logout
    await Api.post("/api/logout").then(() => {
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permission");

      toast.success("Logout Successfully", {
        position: "top-right",
        duration: 4000,
      });

      //navigate to login page
      navigate("/login");
    });
  };

  return (
    <>
      <nav
        className="sb-topnav navbar navbar-expand navbar-dark bg-green border-top-yellow shadow-sm fixed-top"
        style={{ paddingLeft: 0, height: "56px", zIndex: "1039" }}
      >
        <a href="index.html" className="navbar-brand ps-3 fw-bold">
          DESA DIGITAL
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={sidebarToggleHandler}
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>

        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-itam dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdwon"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
