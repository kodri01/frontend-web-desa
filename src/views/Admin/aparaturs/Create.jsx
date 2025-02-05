import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function AparatursCreate() {
  document.title = "Create Aparatur - Desa Digital";

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const storeAparaturs = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("role", role);

    await Api.post("/api/admin/aparaturs", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multiple/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/admin/aparaturs");
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
                  to="/admin/aparaturs"
                  className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                </Link>
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil"></i> Create Aparatur
                    </h6>
                    <hr />
                    <form onSubmit={storeAparaturs}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      {errors.image && (
                        <div className="alert alert-danger">
                          {errors.image[0]}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
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
                      <div className="mb-3">
                        <label className="form-label fw-bold">Role</label>
                        <input
                          type="text"
                          className="form-control"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Enter Role Name"
                        />
                      </div>
                      {errors.role && (
                        <div className="alert alert-danger">
                          {errors.role[0]}
                        </div>
                      )}
                      <div>
                        <button
                          type="submit"
                          className="btn btn-md btn-primary me-2"
                        >
                          <i className="fa fa-save"></i> Save
                        </button>
                        <button type="reset" className="btn btn-md btn-warning">
                          <i className="fa fa-redo"></i> Reset
                        </button>
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
