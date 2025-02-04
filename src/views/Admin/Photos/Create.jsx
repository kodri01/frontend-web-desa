import { useState } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function PhotosCreate(props) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const storePhotos = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("caption", caption);

    await Api.post("/api/admin/photos", formData, {
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

        document.getElementById("file").value = "";
        setCaption("");

        props.fetchData();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  const resetData = () => {
    setCaption("");
    setImage("");
  };

  return (
    <>
      <div className="card border-0 rounded shadow-sm border-top-success">
        <div className="card-body">
          <form onSubmit={storePhotos}>
            <div className="mb-3">
              <label className="form-label fw-bold">Image</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
              />
            </div>
            {errors.image && (
              <div className="alert alert-danger">{errors.image[0]}</div>
            )}

            <div className="mb-3">
              <label className="form-label fw-bold">Caption</label>
              <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="form-control"
                placeholder="Enter Captions Photo"
              />
            </div>
            {errors.caption && (
              <div className="alert alert-danger">{errors.caption[0]}</div>
            )}
            <div>
              <button type="submit" className="btn btn-primary btn-md me-2">
                <i className="fa fa-save"></i> Save
              </button>
              <button
                type="reset"
                onClick={(e) => resetData(e.target.value)}
                className="btn btn-warning btn-md me-2"
              >
                <i className="fa fa-redo"></i> Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
