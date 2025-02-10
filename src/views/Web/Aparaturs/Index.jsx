import LayoutWeb from "../../../layouts/Web";
import React, { useEffect, useState } from "react";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import CardAparaturs from "../../../components/general/CardAparaturs";

export default function Aparaturs() {
  document.title = "Aparaturs - Desa Santri";

  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparaturs, setLoadingAparaturs] = useState(true);

  const fetchDataAparaturs = async () => {
    await Api.get("/api/public/aparaturs").then((response) => {
      setAparaturs(response.data.data);

      setLoadingAparaturs(false);
    });
  };

  useEffect(() => {
    fetchDataAparaturs();
  }, []);

  return (
    <>
      <LayoutWeb>
        <div className="container mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h5 className="text-uppercase">
                <i className="fa fa-user-circle"></i> Aparaturs Desa
              </h5>
              <hr />
            </div>
          </div>
          <div className="row mt-4">
            {loadingAparaturs ? (
              <Loading />
            ) : aparaturs.length > 0 ? (
              aparaturs.map((aparatur) => (
                <CardAparaturs
                  key={aparatur.id}
                  name={aparatur.name}
                  image={aparatur.image}
                  role={aparatur.role}
                />
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
