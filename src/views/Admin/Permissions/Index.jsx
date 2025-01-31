import { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import Pagination from "../../../components/general/Pagination";

export default function PermissionsIndex() {
  document.title = "Permissions - Desa Digital";

  const [permissions, setPermissions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState("");
  //   get token from cookies
  const token = Cookies.get("token");

  //   function fecth Data
  const fecthData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    // fecth data from API
    await Api.get(`/api/admin/permissions?search=${keywords}&${page}`, {
      headers: {
        // header bearer token
        Authorization: `Bearer ${token}`,
      },
    }).then((respone) => {
      //set data respon to state "categories"
      setPermissions(respone.data.data.data);

      //set data respon Pagination
      setPagination(() => ({
        currentPage: respone.data.data.current_page,
        perPage: respone.data.data.per_page,
        total: respone.data.data.total,
      }));
    });
  };

  useEffect(() => {
    //Call function fetch data
    fecthData();
  }, []);

  //function Search Data
  const searchData = async (e) => {
    //set value keywords
    setKeywords(e.target.value);

    //call function fetch
    fecthData(1, e.target.value);
  };

  return (
    <LayoutAdmin>
      <main>
        <div class="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Permission Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          permissions.length > 0 ? (
                            //looping data "permissions" dengan "map"
                            permissions.map((permission, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{permission.name}</td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={2}>
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
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
