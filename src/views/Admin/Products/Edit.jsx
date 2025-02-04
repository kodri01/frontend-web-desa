import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import "react-quill/dist/quill.snow.css";

export default function ProductsEdit() {
  document.title = "Edit Product - Desa Digital";

  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const fetchData = async () => {
    await Api.get(`/api/admin/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTitle(response.data.data.title);
      setOwner(response.data.data.owner);
      setPhone(response.data.data.phone);
      setPrice(response.data.data.price);
      setAddress(response.data.data.address);
      setContent(response.data.data.content);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("owner", owner);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/products/${id}`, formData, {
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

        navigate("/admin/products");
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
                  to="/admin/products"
                  className="btn btn-md btn-primary mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil-alt"></i> Edit Product
                    </h6>
                    <hr />
                    <form onSubmit={updateProduct}>
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
                        <div className="alert alert-danger">
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
                          placeholder="Enter Title Product"
                        />
                      </div>
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Owner</label>
                        <input
                          type="text"
                          value={owner}
                          onChange={(e) => setOwner(e.target.value)}
                          className="form-control"
                          placeholder="Enter Owner Name"
                        />
                      </div>
                      {errors.owner && (
                        <div className="alert alert-danger">
                          {errors.owner[0]}
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label fw-bold">Phone</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"
                          placeholder="Enter Phone"
                        />
                      </div>
                      {errors.phone && (
                        <div className="alert alert-danger">
                          {errors.phone[0]}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Address</label>
                        <textarea
                          value={address}
                          className="form-control"
                          onChange={(e) => setAddress(e.target.value)}
                          rows="3"
                        ></textarea>
                      </div>
                      {errors.address && (
                        <div className="alert alert-danger">
                          {errors.address[0]}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Price</label>
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="form-control"
                          placeholder="Enter Price"
                        />
                      </div>
                      {errors.price && (
                        <div className="alert alert-danger">
                          {errors.price[0]}
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
