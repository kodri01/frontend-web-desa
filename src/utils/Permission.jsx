import Cookies from "js-cookie";

export default function hasAnyPermission(permission) {
  //get permission form cookies
  let allPermission = JSON.parse(Cookies.get("permission"));

  let hasPermission = false;

  permission.forEach(function (item) {
    if (allPermission[item]) hasPermission = true;
  });

  return hasPermission;
}
