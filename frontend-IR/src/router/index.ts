import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import Search from "@/view/menuList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/search",
    name: "Search",
    component: Search, // Use the Search component for the search page
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
