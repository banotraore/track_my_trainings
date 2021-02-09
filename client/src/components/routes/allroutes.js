/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "../views/Dashboard";
import Calendar from "../views/Calendar";

import Profile from "../views/Profile";
import {
  faCalendarAlt,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

var routes = [
  {
    name: "Dashboard",
    icon: faChartLine,
    component: Dashboard,
  },
  {
    name: "Calendar",
    icon: faCalendarAlt,
    component: Calendar,
  },

  {
    name: "User Profile",
    icon: faUser,
    component: Profile,
  },
];
export default routes;
