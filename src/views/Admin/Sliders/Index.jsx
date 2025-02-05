import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Pagination from "../../../components/general/Pagination";
import hasAnyPermission from "../../../utils/Permissions";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import SlidersCreate from "./Create";

export default function SlidersIndex() {
  document.title = "Sliders - Desa Digital";

  const [sliders, setSliders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const token = Cookies.get("token");

  const fetchDataSliders = async (pageNumber = 1) => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/sliders?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setSliders(response.data.data.data);

      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  useEffect(() => {
    fetchDataSliders();
  }, []);

  const deleteData = (id) => {
    confirmAlert({
      title: "Are You Sure?",
      message: "Want to delete this data ?",
      buttons: [
        {
          label: "YES",
          className: "btn btn-danger",
          onClick: async () => {
            await Api.delete(`/api/admin/sliders/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });
              fetchDataSliders();
            });
          },
        },
        {
          label: "NO",
          className: "btn btn-warning",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <LayoutAdmin>
        <main>
          <div className="container-fluid mb-5 mt-5">
            <div className="row">
              <div className="col-md-12">
                {hasAnyPermission(["sliders.create"]) && (
                  <SlidersCreate fetchData={fetchDataSliders} />
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-centered mb-0 rounded">
                        <thead className="thead-dark">
                          <tr className="border-0">
                            <th className="border-0" style={{ width: "5%" }}>
                              No.
                            </th>
                            <th className="border-0">Image</th>
                            {hasAnyPermission(["sliders.delete"]) && (
                              <th className="border-0" style={{ width: "15%" }}>
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            //cek apakah data ada
                            sliders.length > 0 ? (
                              //looping data "sliders" dengan "map"
                              sliders.map((slider, index) => (
                                <tr key={index}>
                                  <td className="fw-bold text-center">
                                    {++index +
                                      (pagination.currentPage - 1) *
                                        pagination.perPage}
                                  </td>
                                  <td className="text-center">
                                    <img
                                      src={slider.image}
                                      width={"300px"}
                                      className="rounded"
                                    />
                                  </td>
                                  {hasAnyPermission(["sliders.delete"]) && (
                                    <td className="text-center">
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteData(slider.id)}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))
                            ) : (
                              //tampilkan pesan data belum tersedia
                              <tr>
                                <td colSpan={5}>
                                  <div
                                    className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                    role="alert"
                                  >
                                    Data Belum Tersedia!.
                                  </div>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      currentPage={pagination.currentPage}
                      perPage={pagination.perPage}
                      total={pagination.total}
                      onChange={(pageNumber) => fetchData(pageNumber)}
                      position="end"
                    />
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
