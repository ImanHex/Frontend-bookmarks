<template>
  <div id="app">
    <div class="m-10 ml-44 w-full">
      <input
        v-model="searchQuery"
        placeholder="Search for recipes..."
        @keyup.enter="fetchRecipes"
        class="mt-4 w-9/12 px-4 py-2 border rounded shadow-sm"
      />
      <button
        @click="fetchRecipes"
        class="mt-4 ml-14 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <div class="ml-44" v-if="recipes && recipes.length > 0">
      <h2 class="text-xl font-semibold mb-4">
        Search Results for "{{ currentQuery }}":
      </h2>
      <ul class="space-y-4">
        <li
          v-for="recipe in recipes"
          :key="recipe.index"
          class="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <h3 class="text-lg text-blue-600 font-semibold">{{ recipe.name }}</h3>
          <p class="text-sm text-gray-500">Prep Time: {{ recipe.prep_time }}</p>
          <div class="mt-2 text-sm text-gray-700">
            <span class="font-medium">Instructions:</span>
            {{ recipe.recipe_instructions }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import RecipeSearch from "../services/RecipeSearch";

export default {
  setup() {
    const searchQuery = ref("");
    const recipes = ref([]);
    const currentQuery = ref("");

    const fetchRecipes = async () => {
      if (!searchQuery.value.trim()) return;

      try {
        const response = await RecipeSearch.getRecipe(searchQuery.value);
        recipes.value = response.data.results;
        console.log(recipes.value);
        console.log(JSON.parse(JSON.stringify(recipes.value)));
        currentQuery.value = searchQuery.value;
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        recipes.value = []; // Clear previous results on error
      }
    };

    return {
      searchQuery,
      recipes,
      currentQuery,
      fetchRecipes,
    };
  },
};
</script>
