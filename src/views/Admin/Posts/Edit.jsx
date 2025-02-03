import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function PostsEdit() {
  document.title = "Edit Post - Desa Digital";

  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = Cookies.get("token");

  const fetchDataCategory = async () => {
    await Api.get("/api/admin/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data.data);
    });
  };

  const fetchDataPost = async () => {
    await Api.get(`/api/admin/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setCategoryId(response.data.data.category_id);
      setContent(response.data.data.content);
    });
  };

  useEffect(() => {
    fetchDataCategory();

    fetchDataPost();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", categoryId);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/posts/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        navigate("/admin/posts");
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
                  to="/admin/posts"
                  className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil-alt"></i> Edit Post
                    </h6>
                    <hr />
                    <form onSubmit={updatePost}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="form-control"
                        />
                      </div>
                      {errors.image && (
                        <div className="alert alert-danger text-center">
                          {errors.image[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                          placeholder="Enter Title Posts"
                        />
                      </div>
                      {errors.title && (
                        <div className="alert alert-danger text-center">
                          {errors.title[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label fw-bold">Category</label>
                        <select
                          className="form-select"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((category) => (
                            <option
                              className="text-capitalize"
                              value={category.id}
                              key={category.id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category_id && (
                        <div className="alert alert-danger">
                          {errors.category_id[0]}
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
                        <div className="alert alert-danger text-center">
                          {errors.content[0]}
                        </div>
                      )}

                      <div>
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary me-2"
                        >
                          <i className="fa fa-save"></i> Update
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
