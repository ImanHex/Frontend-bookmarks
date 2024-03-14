<script>
import RecipeSearchView from "./view/menuList.vue";
import Register from "./components/Register.vue";

export default {
  name: "App",
  components: {
    RecipeSearchView,
    Register,
  },
};
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
