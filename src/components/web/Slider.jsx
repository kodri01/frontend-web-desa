import { useState, useEffect } from "react";
import Api from "../../services/Api";
import { Carousel } from "react-bootstrap";
import Loading from "../general/Loading";

export default function Slider() {
  const [sliders, setSliders] = useState([]);
  const [loadingSlider, setLoadingSlider] = useState(true);

  const fetchDataSlider = async () => {
    setLoadingSlider(true);

    await Api.get("/api/public/sliders").then((response) => {
      setSliders(response.data.data);

      setLoadingSlider(false);
    });
  };

  useEffect(() => {
    fetchDataSlider();
  }, []);

  return (
    <>
      <Carousel
        prevIcon={
          <i className="fa fa-chevron-left fa-lg carousel-custom text-dark shadow-sm"></i>
        }
        nextIcon={
          <i className="fa fa-chevron-right fa-lg carousel-custom text-dark shadow-sm"></i>
        }
      >
        {loadingSlider ? (
          <Loading />
        ) : (
          sliders.map((slider) => (
            <Carousel.Item key={slider.id}>
              <img
                src={slider.image}
                alt="First Slide"
                className="d-block w-100"
                style={{ height: "500", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))
        )}
      </Carousel>
    </>
  );
}
