import { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import hasAnyPermission from "../../../utils/Permissions";

export default function Dashboard() {
  //title Page
  document.title = "Dashboard - Desa Digital";

  const [countCategory, setCountCategory] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countAparaturs, setCountAparaturs] = useState(0);

  const token = Cookies.get("token");

  useEffect(() => {
    //fecth data from API
    Api.get("/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((respone) => {
      //set Data
      setCountCategory(respone.data.data.categories);
      setCountPosts(respone.data.data.posts);
      setCountProducts(respone.data.data.products);
      setCountAparaturs(respone.data.data.aparaturs);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            {hasAnyPermission(["categories.index"]) && (
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-0">
                  <div className="card-body">
                    <strong>{countCategory}</strong> CATEGORIES
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/categories"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasAnyPermission(["posts.index"]) && (
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4 border-0 shadow-0">
                  <div className="card-body">
                    <strong>{countPosts}</strong> POSTS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/posts"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasAnyPermission(["products.index"]) && (
              <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4 border-0 shadow-0">
                  <div className="card-body">
                    <strong>{countProducts}</strong> PRODUCTS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/products"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasAnyPermission(["aparaturs.index"]) && (
              <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4 border-0 shadow-0">
                  <div className="card-body">
                    <strong>{countAparaturs}</strong> APARATURS
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/aparaturs"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
