//import react router dom
import { Routes, Route } from "react-router-dom";

//import private routes
import PrivateRoutes from "./PrivateRoutes";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";

//import viuew forbidden
import Forbidden from "../views/Auth/Forbidden";
import Dashboard from "../views/Admin/Dashboard/Dashboard";
import PermissionsIndex from "../views/Admin/Permissions/Index";
import RolesIndex from "../views/Admin/Roles/Index";
import RolesCreate from "../views/Admin/Roles/Create";
import RolesEdit from "../views/Admin/Roles/Edit";

//import view dashboard

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />
      //Private Route
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />
      {/* Route Role */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
