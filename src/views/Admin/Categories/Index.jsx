import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";
import Cookies from "js-cookie";
import hasAnyPermission from "../../../utils/Permissions";
import { confirmAlert } from "react-confirm-alert";

//import css confirm alert for delete Data
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

export default function CategoryIndex() {
  document.title = "Category - Desa Digital";

  const [category, setCategory] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  const fetchDataCategory = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategory(response.data.data.data);

      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  //delete Data
  const deleteCategory = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/categories/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });
              fetchDataCategory();
            });
          },
        },
        {
          label: "NO",
          className: "btn btn-warning",
          onClick: () => {},
        },
      ],
    });
  };

  //search data
  const searchData = (e) => {
    setKeywords(e.target.value);
    fetchDataCategory(1, e.target.value);
  };

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {hasAnyPermission(["categories.create"]) && (
                    <div className="col-md-3 col-12 mb-2">
                      <Link
                        to="/admin/categories/create"
                        className="btn btn-md btn-primary border-0 shadow-sm w-100"
                        type="button"
                      >
                        <i className="fa fa-plus-circle"></i> Add New
                      </Link>
                    </div>
                  )}

                  <div className="col-md-9 col-12 mb-2">
                    <div className="input-group">
                      <input
                        type="text"
                        onChange={(e) => searchData(e)}
                        placeholder="Search here...."
                        className="form-control border-0 shadow-sm"
                      />
                      <span className="input-group-text border-0 shadow-sm">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-centered mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0">
                            <th style={{ width: "5%" }} className="border-0">
                              No.
                            </th>
                            <th className="border-0">Category Name</th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.length > 0 ? (
                            category.map((categori, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{categori.name}</td>
                                <td className="text-center">
                                  {hasAnyPermission(["categories.edit"]) && (
                                    <Link
                                      to={`/admin/categories/edit/${categori.id}`}
                                      className="btn btn-sm btn-primary me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermission(["categories.delete"]) && (
                                    <button
                                      onClick={() =>
                                        deleteCategory(categori.id)
                                      }
                                      className="btn btn-sm btn-danger me-2"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>
                                <div
                                  className="alert alert-danger border-0 shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Belum Tersedia!
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      currentPage={pagination.currentPage}
                      perPage={pagination.perPage}
                      total={pagination.total}
                      onChange={(pageNumber) =>
                        fetchDataCategory(pageNumber, keywords)
                      }
                      position="end"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutAdmin>
    </>
  );
}
