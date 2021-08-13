import { createRouter, createWebHashHistory } from "vue-router";
import inscriptionView from "@/views/inscription.vue";
import connection from "@/views/connection.vue";
import mur from "@/views/mur.vue";
const routes = [
  {
    path: "/connection",
    name: "connection",
    component: connection,
    props:true,
      
  },
  {
    path: "/",
    name: "inscription",
    component: inscriptionView,
  },
  {
    path: "/mur",
    name: "mur",
    component: mur,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
