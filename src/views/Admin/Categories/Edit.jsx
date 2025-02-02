import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function CategoryEdit() {
  document.title = "Edit Category - Desa Digital";

  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const fetchDataCategory = async () => {
    await Api.get(`/api/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
    });
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();
    await Api.post(
      `/api/admin/categories/${id}`,
      {
        name: name,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigate("/admin/categories");
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
                  to="/admin/categories"
                  className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-folder"></i> Edit Category
                    </h6>
                    <hr />
                    <form onSubmit={updateCategory}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Enter Category Name"
                        />
                      </div>
                      {errors.name && (
                        <div className="alert alert-danger">
                          {errors.name[0]}
                        </div>
                      )}
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
