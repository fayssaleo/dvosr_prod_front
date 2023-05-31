import Vue from "vue";
import VueRouter from "vue-router";
import Showvoyages from "../components/Voyages/show/showvoyages";
import ArchivedVoyageTable from "../components/Voyages/show/ArchivedVoyageTable";
import Addvoyage from "../components/Voyages/add/addVoyage";
import Utilisateurs from "../components/utilisateurs/Utilisateurs";
import PasswordChange from "../components/utilisateurs/PasswordChange";
import SetShift from "../components/utilisateurs/SetShift";
Vue.use(VueRouter);

const routes = [
  {
    path: "/voyages",
    name: "showvoyages",
    component: Showvoyages,
  },
  {
    path: "/archive",
    name: "showArchivedVoyages",
    component: ArchivedVoyageTable,
  },
  {
    path: "/add/voyage",
    name: "addvoyage",
    component: Addvoyage,
  },
  {
    path: "/users",
    alias: "/",
    name: "Users",
    component: Utilisateurs,
  },
  {
    path: "/changePassword",
    name: "Security",
    component: PasswordChange,
  },
  {
    path: "/setShift",
    name: "Shift",
    component: SetShift,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
