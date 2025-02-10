import LayoutWeb from "../../../layouts/Web";
import Slider from "../../../components/web/Slider";
import React, { useState, useEffect } from "react";
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import CardProduct from "../../../components/general/CardProduct";
import CardPostHome from "../../../components/general/CardPostHome";

export default function Home() {
  document.title = "Selamat Datang di Desa Santri, Kab. Jombang, Jawa Timur";
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchDataProduct = async () => {
    setLoadingProduct(true);
    await Api.get("/api/public/products_home").then((response) => {
      setProducts(response.data.data);
      setLoadingProduct(false);
    });
  };

  const fetchDataPosts = async () => {
    setLoadingPosts(true);

    //fetch data
    await Api.get("/api/public/posts_home").then((response) => {
      //assign response to state "posts"
      setPosts(response.data.data);

      //setLoadingPosts "false"
      setLoadingPosts(false);
    });
  };

  useEffect(() => {
    fetchDataProduct();
    fetchDataPosts();
  }, []);

  return (
    <>
      <LayoutWeb>
        <Slider />

        <div className="container mt-5 mb-3">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="section-title">
                <h4>
                  <i className="fa fa-shopping-bag"></i>
                  <strong style={{ color: "rgb(209 104 0)" }}> PRODUK </strong>
                  DESA
                </h4>
              </div>
            </div>
            {loadingProduct ? (
              <Loading />
            ) : products.length > 0 ? (
              products.map((product) => (
                <CardProduct
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  slug={product.slug}
                  price={product.price}
                  phone={product.phone}
                />
              ))
            ) : (
              <AlertDataEmpty />
            )}
          </div>
        </div>

        <div className="container mt-2 mb-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="section-title">
                <h4>
                  <i className="fa fa-book"></i>
                  <strong style={{ color: "rgb(209 104 0)" }}> BERITA </strong>
                  TERBARU
                </h4>
              </div>
            </div>
            {loadingPosts ? (
              <Loading />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <CardPostHome
                  key={post.id}
                  image={post.image}
                  slug={post.slug}
                  title={post.title}
                  content={post.content}
                  user={post.user.name}
                  date={post.created_at}
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
