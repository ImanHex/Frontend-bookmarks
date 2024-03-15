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

    <div
      v-if="suggestedQuery && suggestedQuery !== searchQuery"
      class="m-10 ml-44"
    >
      <p class="text-sm text-gray-600">
        Did you mean:
        <span
          class="font-semibold cursor-pointer underline text-blue-600 hover:text-blue-700"
          @click="acceptSuggestion"
          >{{ suggestedQuery }}</span
        >
      </p>
    </div>
    <div
      class="ml-44 bg-blue-50 rounded-md shadow p-2 m-2"
      v-if="recipes && recipes.length > 0"
    >
      <h2 class="p-2">
        Search Results for <span class="text-blue-600">{{ currentQuery }}</span>
      </h2>
    </div>

    <div class="ml-44" v-if="recipes && recipes.length > 0">
      <ul class="grid grid-cols-4 gap-4">
        <li
          v-for="(recipe, index) in recipes"
          :key="recipe.index"
          class="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <img
            :src="
              recipe.images !== 'No Data Provide'
                ? recipe.images
                : 'https://i.pinimg.com/564x/b9/a9/66/b9a9668152a83397e96215ec1cadae0f.jpg'
            "
            alt="Recipe"
            class="recipe-image w-full h-52 object-cover rounded-lg shadow-lg"
          />

          <h3 class="text-md text-blue-600 font-semibold p-4">
            {{ index + 1 }}. {{ recipe.name }}
          </h3>
        </li>
      </ul>
    </div>
    <div class="ml-44" v-if="searchFailed">
      <h2 class="text-xl font-semibold mb-4">
        No recipes found matching {{ currentQuery }}.
      </h2>
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
    const searchFailed = ref(false);
    const suggestedQuery = ref(null);
    const fetchRecipes = async () => {
      if (!searchQuery.value.trim()) return;
      searchFailed.value = false;
      suggestedQuery.value = null; // Reset the suggested query

      try {
        const response = await RecipeSearch.getRecipe(searchQuery.value);
        console.log("Full backend response:", response); // For debugging

        // Now using the corrected path to access the query
        if (response.data.query && response.data.query !== searchQuery.value) {
          suggestedQuery.value = response.data.query;
          console.log("Correction suggested:", suggestedQuery.value);
        } else {
          console.log("No correction needed.");
        }

        if (response.data.results && response.data.results.length > 0) {
          recipes.value = response.data.results;
          searchFailed.value = false;
        } else {
          recipes.value = []; // Clear previous results
          searchFailed.value = true;
        }

        // This maintains the original user query in the display
        currentQuery.value = searchQuery.value;
      } catch (error) {
        console.error("Error fetching recipes:", error);
        recipes.value = [];
        searchFailed.value = true;
      }
    };

    const useSuggestedQuery = () => {
      searchQuery.value = suggestedQuery.value; // Set search query to the suggested query
      fetchRecipes(); // Fetch recipes using the suggested query
    };
    const acceptSuggestion = () => {
      searchQuery.value = suggestedQuery.value;
      currentQuery.value = suggestedQuery.value; // Ensure the UI reflects the accepted suggestion
      suggestedQuery.value = null; // Clear the suggestion
      fetchRecipes(); // Re-fetch recipes based on the accepted suggestion
    };

    return {
      searchQuery,
      recipes,
      currentQuery,
      fetchRecipes,
      searchFailed,
      suggestedQuery,
      useSuggestedQuery,
      acceptSuggestion,
    };
  },
};
</script>
