import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function PagesCreate() {
  document.title = "Create Page - Desa Digital";

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const storePage = async (e) => {
    e.preventDefault();
    await Api.post(
      "/api/admin/pages",
      {
        title: title,
        content: content,
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

        navigate("/admin/pages");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
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
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil-alt"></i> Create Pages
                    </h6>
                    <hr />
                    <form onSubmit={storePage}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title Pages"
                          className="form-control"
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
                          onClick={(e) => resetForm(e)}
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
