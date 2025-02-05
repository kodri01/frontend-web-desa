import { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import { Link } from "react-router-dom";
import Pagination from "../../../components/general/Pagination";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import hasAnyPermission from "../../../utils/Permissions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AparatursIndex() {
  document.title = "Aparaturs - Desa Digital";

  const [aparaturs, setAparaturs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/aparaturs?search=${keywords}&page${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setAparaturs(response.data.data.data);

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

  const searchData = (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  const deleteData = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/aparaturs/${id}`, {
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

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {hasAnyPermission(["aparaturs.create"]) && (
                    <div className="col-md-3 col-12 mb-3">
                      <Link
                        to="/admin/aparaturs/create"
                        className="btn btn-md btn-primary border-0 shadow-sm w-100"
                      >
                        <i className="fa fa-plus-circle"></i> Add New
                      </Link>
                    </div>
                  )}
                  <div className="col-md-9 col-12 mb-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => searchData(e)}
                        placeholder="Search here..."
                      />
                      <span className="input-group-text border-0 shadow-sm rounded">
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
                              No.
                            </th>
                            <th className="border-0">Image</th>
                            <th className="border-0">Name</th>
                            <th className="border-0">Role</th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            //cek apakah data ada
                            aparaturs.length > 0 ? (
                              //looping data "aparaturs" dengan "map"
                              aparaturs.map((aparatur, index) => (
                                <tr key={index}>
                                  <td className="fw-bold text-center">
                                    {++index +
                                      (pagination.currentPage - 1) *
                                        pagination.perPage}
                                  </td>
                                  <td className="text-center">
                                    <img src={aparatur.image} width="50" />
                                  </td>
                                  <td>{aparatur.name}</td>
                                  <td>{aparatur.role}</td>
                                  <td className="text-center">
                                    {hasAnyPermission(["aparaturs.edit"]) && (
                                      <Link
                                        to={`/admin/aparaturs/edit/${aparatur.id}`}
                                        className="btn btn-primary btn-sm me-2"
                                      >
                                        <i className="fa fa-pencil-alt"></i>
                                      </Link>
                                    )}

                                    {hasAnyPermission(["aparaturs.delete"]) && (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteData(aparatur.id)}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              //tampilkan pesan data belum tersedia
                              <tr>
                                <td colSpan={5}>
                                  <div
                                    className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                    role="alert"
                                  >
                                    Data Belum Tersedia!.
                                  </div>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      currentPage={pagination.currentPage}
                      perPage={pagination.perPage}
                      total={pagination.total}
                      onChange={(pageNumber) => fetchData(pageNumber, keywords)}
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
