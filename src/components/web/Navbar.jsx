import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;

  const activeRoute = pathname.split("/");

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light navbar-top d-none d-md-block d-lg-block">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item me-4">
                <i className="fa fa-envelope"></i> info@desa.com
              </li>
              <li className="nav-item me-4">
                <i className="fa fa-phone"></i> +628 21384233299
              </li>
            </ul>
            <div>
              IKUTI KAMI :
              <a href="#" className="ms-2 me-2">
                <i className="fab fa-facebook-square text-white fa-lg"></i>
              </a>
              <a href="#" className="ms-2 me-2">
                <i className="fab fa-instagram text-white fa-lg"></i>
              </a>
              <a href="#" className="ms-2 me-2">
                <i className="fab fa-youtube text-white fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="jumbotron-header pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-9 d-none d-md-block d-lg-block">
              <div className="header-logo">
                <a href="">
                  <img
                    src="/images/logo-jbg.png"
                    width="110"
                    className="img-responsive"
                  />
                </a>
              </div>
              <div className="header-text">
                <h2 className="header-school">DESA SANTRI</h2>
                <hr />
                <div className="header-address">
                  Jln. Pegangsaan No. 12 Jambi
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="d-none d-md-block d-lg-block"
                style={{ marginTop: "60px" }}
              ></div>
              <form action="#" className="d-flex" method="GET">
                <input
                  type="search"
                  name="q"
                  placeholder="Cari sesuatu..."
                  aria-label="Search"
                  className="form-control border-0 me-2"
                />
                <button
                  type="submit"
                  className="btn btn-primary-dark"
                  style={{
                    backgroundColor: "#005005",
                    borderColor: "#005005",
                    color: "white",
                  }}
                >
                  CARI
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-md navbar-light navbar-blue navbar-web">
        <div className="container">
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md 0">
              <li className="nav-item ms-2">
                <Link
                  to="/"
                  className={
                    activeRoute[1] === ""
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-home"></i> BERANDA
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/pages"
                  className={
                    activeRoute[1] === "pages"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-info-circle"></i> TENTANG DESA
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/aparaturs"
                  className={
                    activeRoute[1] === "aparaturs"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-user-circle"></i> APARATURS
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/posts"
                  className={
                    activeRoute[1] === "posts"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-book"></i> BERITA
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/products"
                  className={
                    activeRoute[1] === "products"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-shopping-bag"></i> PRODUK DESA
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/photos"
                  className={
                    activeRoute[1] === "photos"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                >
                  <i className="fa fa-images"></i> GALERI
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
