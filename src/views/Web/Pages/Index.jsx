import React, { useState, useEffect } from "react";
import CardPages from "../../../components/general/CardPages";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";

export default function Pages() {
  document.title = "Pages - Desa Digital";

  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const fetchDataPage = async () => {
    setLoadingPages(true);

    await Api.get("/api/public/pages").then((response) => {
      setPages(response.data.data);

      setLoadingPages(false);
    });
  };

  useEffect(() => {
    fetchDataPage();
  }, []);

  return (
    <>
      <LayoutWeb>
        <div className="container mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h5 className="text-uppercase">
                <i className="fa fa-info-circle"></i> TENTANG DESA
              </h5>
              <hr />
            </div>
          </div>
          <div className="row mt-4">
            {loadingPages ? (
              <Loading />
            ) : pages.length > 0 ? (
              pages.map((page) => (
                <CardPages key={page.id} title={page.title} slug={page.slug} />
              ))
            ) : (
              <AlertDataEmpty />
            )}
          </div>
        </div>
      </LayoutWeb>
    </>
  );
}
