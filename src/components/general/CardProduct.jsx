import React from "react";
import MoneyFormat from "../../utils/MoneyFormat";
import { Link } from "react-router-dom";

export default function CardProduct(props) {
  return (
    <div className="col-md-4 mb-3" key={props.key}>
      <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
        <Link to={`/products/${props.slug}`} className="text-decoration-none">
          <img src={props.image} className="card-img-top" alt="..." />
          <div className="card-body text-black">
            <h5 className="card-title">
              {props.title.length > 50
                ? `${props.title.substring(0, 50)}...`
                : props.title}
            </h5>
            <p className="card-text mt-3">{MoneyFormat(props.price)}</p>
          </div>
        </Link>
        <div className="card-footer">
          <a
            href={`https://api.whatsapp.com/send?phone=${props.phone}&text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20${props.title}`}
            className="btn btn-primary w-100"
            target="_blank"
          >
            <i className="fa-brands fa-whatsapp"></i> Beli Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
