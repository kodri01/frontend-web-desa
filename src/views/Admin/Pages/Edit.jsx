import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function PagesEdit() {
  document.title = "Edit Page - Desa Digital";

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const fetchDataPages = async () => {
    await Api.get(`/api/admin/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  useEffect(() => {
    fetchDataPages();
  }, []);

  const updatePages = async (e) => {
    e.preventDefault();
    await Api.post(
      `/api/admin/pages/${id}`,
      {
        title: title,
        content: content,
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
        navigate("/admin/pages");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mt-5 mb-5">
            <div className="row">
              <div className="col-md-12">
                <Link
                  to="/admin/pages"
                  className="btn btn-primary btn-md border-0 shadow-sm mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil-alt"></i> Edit Page
                    </h6>
                    <hr />
                    <form onSubmit={updatePages}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                          placeholder="Enter Title Page"
                        />
                      </div>
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label fw-bold">Content</label>
                        <ReactQuill
                          theme="snow"
                          rows="5"
                          value={content}
                          onChange={(content) => setContent(content)}
                        />
                      </div>
                      {errors.content && (
                        <div className="alert alert-danger">
                          {errors.content[0]}
                        </div>
                      )}

                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm me-2"
                        >
                          <i className="fa fa-save"></i> Save
                        </button>
                        <button
                          type="reset"
                          className="btn btn-warning btn-sm me-2"
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
