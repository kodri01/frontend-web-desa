import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import Pagination from "../../../components/general/Pagination";
import toast from "react-hot-toast";
import hasAnyPermission from "../../../utils/Permissions";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

export default function PagesIndex() {
  document.title = "Pages - Desa Digital";

  const [pages, setPages] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState([]);

  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/pages?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPages(response.data.data.data);

      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePage = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "Want to delete this message",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/pages/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });
              fetchData();
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

  const searchData = async (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {hasAnyPermission(["pages.create"]) && (
                    <div className="col-md-3 col-12 mb-2">
                      <Link
                        to="/admin/pages/create"
                        className="btn btn-md btn-primary shadow-sm border-sm w-100"
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
                        placeholder="Search here..."
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
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-centered mb-0">
                        <thead className="thead-dark">
                          <tr className="border-0">
                            <th className="border-0" style={{ width: "5%" }}>
                              No
                            </th>
                            <th className="border-0">Title</th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pages.length > 0 ? (
                            pages.map((page, index) => (
                              <tr key={index}>
                                <td className="text-center fw-bold">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{page.title}</td>
                                <td className="text-center">
                                  {hasAnyPermission(["pages.edit"]) && (
                                    <Link
                                      to={`/admin/pages/edit/${page.id}`}
                                      className="btn btn-sm btn-primary me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermission(["pages.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deletePage(page.id)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5}>
                                <div
                                  className="alert alert-danger text-center border-0 rounded shadow-sm w-100"
                                  role="alert"
                                >
                                  Data Belum Tersedia !!
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
                      position="end"
                      onChange={(pageNumber) => fetchData(pageNumber, keywords)}
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
