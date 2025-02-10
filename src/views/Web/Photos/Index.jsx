import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import CardPhoto from "../../../components/general/CardPhotos";
import Pagination from "../../../components/general/Pagination";

export default function Photos() {
  document.title = "Galeri Foto - Desa Santri";

  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const fetchDataPhoto = async (pageNumber = 1) => {
    setLoadingPhotos(true);

    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/photos?page=${page}`).then((response) => {
      setPhotos(response.data.data.data);

      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      setLoadingPhotos(false);
    });
  };

  useEffect(() => {
    fetchDataPhoto();
  }, []);
  return (
    <>
      <LayoutWeb>
        <div className="container mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h5 className="text-uppercase">
                <i className="fa fa-image"></i> galeri photo
              </h5>
              <hr />
            </div>
          </div>
          <div className="row mt-4">
            {loadingPhotos ? (
              <Loading />
            ) : photos.length > 0 ? (
              photos.map((photo) => (
                <CardPhoto
                  key={photo.id}
                  image={photo.image}
                  caption={photo.caption}
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
