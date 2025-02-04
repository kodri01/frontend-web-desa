import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useState } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function ProductsCreate() {
  document.title = "Create Product - Desa Digital";

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const storeProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("owner", owner);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("price", price);

    await Api.post("/api/admin/products", formData, {
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

  const resetForm = () => {
    setImage("");
    setTitle("");
    setContent("");
    setAddress("");
    setOwner("");
    setPhone("");
    setPrice("");
  };
  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mt-5 mb-5">
            <div className="row">
              <div className="col-md-12 ">
                <Link
                  to="/admin/products"
                  className="btn btn-primary btn-md mb-3"
                  type="button"
                >
                  <i className="fa fa-long-arrow-alt-left"></i> Back
                </Link>
                <div className="card border-0 shadow-sm rounded border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-pencil-alt"></i> Create Product
                    </h6>
                    <hr />
                    <form onSubmit={storeProduct}>
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
                          placeholder="Enter Telphone Number"
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
                          className="form-control"
                          rows="3"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter Address"
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
                          onClick={(e) => resetForm(e.target.value)}
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
