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
import UserIndex from "../views/Admin/Users/Index";
import UserCreate from "../views/Admin/Users/Create";
import UserEdit from "../views/Admin/Users/Edit";
import CategoryIndex from "../views/Admin/Categories/Index";
import CategoryCreate from "../views/Admin/Categories/Create";
import CategoryEdit from "../views/Admin/Categories/Edit";
import PostsIndex from "../views/Admin/Posts/Index";
import PostsCreate from "../views/Admin/Posts/Create";
import PostsEdit from "../views/Admin/Posts/Edit";
import PagesIndex from "../views/Admin/Pages/Index";
import PagesCreate from "../views/Admin/Pages/Create";
import PagesEdit from "../views/Admin/Pages/Edit";

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
      {/* Route Users */}
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <UserIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <PrivateRoutes>
            <UserCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoutes>
            <UserEdit />
          </PrivateRoutes>
        }
      />
      {/* Route Category */}
      <Route
        path="/admin/categories"
        element={
          <PrivateRoutes>
            <CategoryIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/categories/create"
        element={
          <PrivateRoutes>
            <CategoryCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoryEdit />
          </PrivateRoutes>
        }
      />
      {/* Route Posts */}
      <Route
        path="/admin/posts"
        element={
          <PrivateRoutes>
            <PostsIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/posts/create"
        element={
          <PrivateRoutes>
            <PostsCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/posts/edit/:id"
        element={
          <PrivateRoutes>
            <PostsEdit />
          </PrivateRoutes>
        }
      />
      {/* Route Pages */}
      <Route
        path="/admin/pages"
        element={
          <PrivateRoutes>
            <PagesIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/pages/create"
        element={
          <PrivateRoutes>
            <PagesCreate />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/pages/edit/:id"
        element={
          <PrivateRoutes>
            <PagesEdit />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
