import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import Search from "@/view/menuList.vue";
import RecipeDetail from "@/components/RecipeDetail.vue";

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
    component: Search,
  },
  {
    path: "/recipe/:index",
    name: "RecipeDetail",
    component: RecipeDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
