import Api from "../../../services/Api";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function SlidersCreate(props) {
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const token = Cookies.get("token");

  const storeSlider = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    await Api.post("/api/admin/sliders", formData, {
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

        props.fetchData();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  const resetData = () => {
    setImage("");
  };

  return (
    <>
      <div className="card border-0 rounded shadow-sm border-top-success">
        <div className="card-body">
          <form onSubmit={storeSlider}>
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

            <div>
              <button type="submit" className="btn btn-primary btn-md me-2">
                <i className="fa fa-save"></i> Upload
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
