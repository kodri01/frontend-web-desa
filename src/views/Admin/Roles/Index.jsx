import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import hasAnyPermission from "../../../utils/Permissions";
import Pagination from "../../../components/general/Pagination";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function RolesIndex() {
  // title page
  document.title = "Roles - Desa Digital";

  const [roles, setRoles] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define keyword:
  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/roles?search${keywords}&page${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoles(response.data.data.data);
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = async (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  const deleteRole = (id) => {
    confirmAlert({
      title: "Are You Sure?",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/roles/${id}`, {
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
          <div className="container-fluid mt-5 mb-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {hasAnyPermission(["roles.create"]) && (
                    <div className="col-md-3 col-12 mb-2">
                      <Link
                        to="/admin/roles/create"
                        className="btn btn-md btn-primary border-0 shadow w-100"
                        type="button"
                      >
                        Add New
                      </Link>
                    </div>
                  )}
                  <div className="col-md-9 col-12 mb-2">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        onChange={(e) => {
                          searchData(e);
                        }}
                        placeholder="Search here...."
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
                            <th className="border-0" style={{ width: "5%" }}>
                              No.
                            </th>
                            <th className="border-0">Role Name</th>
                            <th className="border-0" style={{ width: "60%" }}>
                              Permissions
                            </th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            //cek apakah data ada
                            roles.length > 0 ? (
                              //looping data "roles" dengan "map"
                              roles.map((role, index) => (
                                <tr key={index}>
                                  <td className="fw-bold text-center">
                                    {++index +
                                      (pagination.currentPage - 1) *
                                        pagination.perPage}
                                  </td>
                                  <td>{role.name}</td>
                                  <td>
                                    {role.permissions.map(
                                      (permission, index) => (
                                        <span
                                          className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                          key={index}
                                        >
                                          {permission.name}
                                        </span>
                                      )
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {hasAnyPermission(["roles.edit"]) && (
                                      <Link
                                        to={`/admin/roles/edit/${role.id}`}
                                        className="btn btn-primary btn-sm me-2"
                                      >
                                        <i className="fa fa-pencil-alt"></i>
                                      </Link>
                                    )}

                                    {hasAnyPermission(["roles.delete"]) && (
                                      <button
                                        onClick={() => deleteRole(role.id)}
                                        className="btn btn-danger btn-sm"
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
                                <td colSpan={4}>
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
