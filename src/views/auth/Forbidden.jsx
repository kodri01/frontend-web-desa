import { Link } from "react-router-dom";
import LayoutAuth from "../../layouts/Auth";

export default function Forbidden() {
  return (
    <LayoutAuth>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-12 col-xl-12 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body text-center">
                <img
                  src="/images/no-touch.png"
                  alt="images"
                  width={"200"}
                  className="mt-5 mb-3"
                />
                <h2>Access Denied!!</h2>
                <Link to="/dashboard" className="btn btn-md btn-tertiary mt-3">
                  <i className="fa fa-long-arrow-alt-left me-2"></i>
                  Back To Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
