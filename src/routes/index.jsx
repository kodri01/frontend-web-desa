//import react router dom
import { Routes, Route } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/auth/Login";
import Forbidden from "../views/auth/Forbidden";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
