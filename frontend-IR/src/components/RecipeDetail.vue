<template>
  <div class="flex justify-center px-2 py-10">
    <div
      class="bg-white rounded-xl shadow-lg w-full max-w-4xl md:flex md:flex-col overflow-hidden ml-32"
    >
      <router-link
        to="/Search"
        class="text-gray-700 bg-slate-300 p-5 hover:text-gray-400"
      >
        <p class="text-md font-semibold">Back</p>
      </router-link>
      <!-- Image Section -->
      <div class="md:order-1">
        <img
          :src="
            recipe.images !== 'No Data Provide'
              ? recipe.images
              : 'https://i.pinimg.com/564x/b9/a9/66/b9a9668152a83397e96215ec1cadae0f.jpg'
          "
          alt="Recipe"
          class="w-full object-cover h-48 md:h-52"
        />
      </div>

      <!-- Content Section -->
      <div class="md:order-2 px-4 py-4 flex flex-col justify-between">
        <!-- Reduced padding for content compactness -->
        <div>
          <h1 class="text-lg font-bold mb-2">{{ recipe.name }}</h1>
          <div class="mb-1">
            <span class="text-xs font-bold">Preparation Time: </span>
            <span class="text-xs block">{{ recipe.prep_time }}</span>
          </div>
          <div class="mb-2">
            <p class="text-xs mb-1 font-bold">Description:</p>
            <p class="text-xs">{{ recipe.description }}</p>
          </div>
          <div class="mb-2">
            <span class="text-xs font-bold">Instruction: </span>
            <span class="text-xs block">{{ recipe.recipe_instructions }}</span>
          </div>
        </div>

        <!-- Rating and Save Icon Section -->
        <div class="flex justify-between items-center">
          <!-- Rating Display -->
          <div class="text-yellow-400 text-2xl">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>

          <button class="text-gray-500 hover:text-gray-700 text-2xl">
            <i class="far fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RecipeSearch from "../services/RecipeSearch";

export default {
  setup() {
    const recipe = ref({});
    const route = useRoute();

    onMounted(async () => {
      const recipeId = route.params.index;
      try {
        const response = await RecipeSearch.getRecipeById(recipeId);
        recipe.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      recipe,
    };
  },
};
</script>
