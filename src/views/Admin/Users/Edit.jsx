import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function UserEdit() {
  document.title = "Edit User - Desa Digital";

  const navigata = useNavigate();
  const { id } = useParams();

  //data users
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const fetchDataRoles = async () => {
    await Api.get("/api/admin/roles/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoles(response.data.data);
    });
  };

  const fetchDataUser = async () => {
    await Api.get(`/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setRolesData(response.data.data.roles.map((obj) => obj.name));
    });
  };

  useEffect(() => {
    fetchDataRoles();
    fetchDataUser();
  }, []);

  //handle checkbox
  const handleCheckboxChange = (e) => {
    let data = rolesData;

    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }

    setRolesData(data);
  };

  //update Users
  const updateUsers = async (e) => {
    e.preventDefault();

    await Api.post(
      `/api/admin/users/${id}`,
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
        roles: rolesData,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigata("/admin/users");
      })
      .catch((errors) => {
        setErrors(errors.response.data);
      });
  };
  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-12">
                <Link
                  to="/admin/users"
                  className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-user"></i> Edit User
                    </h6>
                    <hr />
                    <form onSubmit={updateUsers}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter Full Name"
                            />
                          </div>
                          {errors.name && (
                            <div className="alert alert-danger">
                              {errors.name[0]}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Email"
                            />
                          </div>
                          {errors.email && (
                            <div className="alert alert-danger">
                              {errors.eamil[0]}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Your Password"
                            />
                          </div>
                          {errors.password && (
                            <div className="alert alert-danger">
                              {errors.password[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Password Confirmation
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={passwordConfirm}
                              onChange={(e) =>
                                setPasswordConfirm(e.target.value)
                              }
                              placeholder="Enter Password Confirmation"
                            />
                          </div>
                          {errors.passwordConfirm && (
                            <div className="alert alert-danger">
                              {errors.passwordConfirm[0]}
                            </div>
                          )}
                        </div>

                        <hr />
                        <div className="mb-3">
                          <label className="fw-bold">Roles</label>
                          <br />
                          {roles.map((role) => (
                            <div
                              className="form-check form-check-inline"
                              key={Math.random()}
                            >
                              <input
                                type="checkbox"
                                value={role.name}
                                defaultChecked={rolesData.some(
                                  (name) => name === role.name ?? true
                                )}
                                onChange={handleCheckboxChange}
                                id={`check-${role.id}`}
                                className="form-check-input"
                              />
                              <label
                                htmlFor={`check-${role.id}`}
                                className="form-check-label fw-normal"
                              >
                                {role.name}
                              </label>
                            </div>
                          ))}
                          {errors.roles && (
                            <div className="alert alert-danger">
                              {errors.roles[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-md btn-primary me-2"
                          >
                            <i className="fa fa-save"></i> Update
                          </button>
                          <button
                            type="reset"
                            className="btn btn-md btn-warning me-2"
                          >
                            <i className="fa fa-redo"></i> Reset
                          </button>
                        </div>
                      </div>
                    </form>
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
