import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import hasAnyPermission from "../../../utils/Permissions";
import Pagination from "../../../components/general/Pagination";
import { confirmAlert } from "react-confirm-alert";

//import css confirm alert for delete Data
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

export default function UserIndex() {
  document.title = "Users - Desa Digital";

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [users, setUsers] = useState([]);
  const [keywords, setKeywords] = useState("");

  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setUsers(response.data.data.data);
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

  //function delete data
  const deleteUser = (id) => {
    confirmAlert({
      title: "Are Your Sure ?",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/users/${id}`, {
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

  //function search data
  const searchData = async (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mt-5 mb-5">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {hasAnyPermission(["users.create"]) && (
                    <div className="col-md-3 col-12 mb-2">
                      <Link
                        to="/admin/users/create"
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
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-centered mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0">
                            <th className="border-0" style={{ width: "5%" }}>
                              No.
                            </th>
                            <th className="border-0">Full Name</th>
                            <th className="border-0">Email Address</th>
                            <th className="border-0">Roles</th>
                            <th className="border-0" style={{ width: "15%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 ? (
                            users.map((user, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  {user.roles.map((role, index) => (
                                    <span
                                      className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                      key={index}
                                    >
                                      {role.name}
                                    </span>
                                  ))}
                                </td>
                                <td className="text-center">
                                  {hasAnyPermission(["users.edit"]) && (
                                    <Link
                                      to={`/admin/users/edit/${user.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}
                                  {hasAnyPermission(["users.delete"]) && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteUser(user.id)}
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
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Belum Tersedia!!
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
