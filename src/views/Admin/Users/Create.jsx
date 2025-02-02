import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserCreate() {
  document.title = "Create Users - Desa Digital";

  //navigate pages
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  //fetching Data Role
  const fetchDataRoles = async () => {
    await Api.get("/api/admin/roles/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoles(response.data.data);
    });
  };

  useEffect(() => {
    fetchDataRoles();
  }, []);

  //handle checkbox roles
  const handleCheckboxChange = (e) => {
    let data = rolesData;

    data.push(e.target.value);

    setRolesData(data);
  };

  //method user Store
  const userStore = async (e) => {
    e.preventDefault();

    await Api.post(
      "api/admin/users",
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
        roles: rolesData,
      },
      {
        headers: {
          Authorization: `Bearer ${token},`,
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigate("/admin/users");
      })
      .catch((error) => {
        setErrors(error.response.data);
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
                  className="btn btn-md btn-primary shadow-sm border-0 mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-user"></i> Create User
                    </h6>
                    <hr />
                    <form onSubmit={userStore}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter Full Name"
                              className="form-control"
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
                            <label className="form-label fw-bold">Email</label>
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Email"
                              className="form-control"
                            />
                          </div>
                          {errors.email && (
                            <div className="alert alert-danger">
                              {errors.email[0]}
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
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Your Password"
                              className="form-control"
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
                              value={passwordConfirm}
                              onChange={(e) =>
                                setPasswordConfirm(e.target.value)
                              }
                              placeholder="Enter Password Confirmation"
                              className="form-control"
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
                              key={Math.random}
                              className="form-check form-check-inline"
                            >
                              <input
                                type="checkbox"
                                className="form-check-input"
                                value={role.name}
                                onChange={handleCheckboxChange}
                                id={`check-${role.id}`}
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
                            <div className="alert alert-danger mt-2">
                              {errors.role[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-md btn-primary me-2"
                          >
                            <i className="fa fa-save"></i> Save
                          </button>
                          <button
                            type="reset"
                            className="btn btn-md btn-warning"
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
