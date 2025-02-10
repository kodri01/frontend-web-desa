import React, { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import CardPost from "../../../components/general/CardPosts";
import Pagination from "../../../components/general/Pagination";

export default function Posts() {
  document.title = "Posts - Desa Digital";

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const fetchDataPosts = async (pageNumber = 1) => {
    setLoadingPosts(true);

    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/posts?page=${page}`).then((response) => {
      setPosts(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });

      setLoadingPosts(false);
    });
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);
  return (
    <>
      <LayoutWeb>
        <div className="container mt-4 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h5 className="text-uppercase">
                <i className="fa fa-book"></i> berita desa
              </h5>
              <hr />
            </div>
          </div>
          <div className="row mt-4">
            {loadingPosts ? (
              <Loading />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <CardPost
                  key={post.id}
                  image={post.image}
                  slug={post.slug}
                  title={post.title}
                  content={post.content}
                  date={post.created_at}
                />
              ))
            ) : (
              <AlertDataEmpty />
            )}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            perPage={pagination.perPage}
            total={pagination.total}
            onChange={(pageNumber) => fetchDataPosts(pageNumber)}
            position="center"
          />
        </div>
      </LayoutWeb>
    </>
  );
}
