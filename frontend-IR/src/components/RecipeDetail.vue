<template>
  <div class="m-auto items-center">
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl p-10"
    >
      <div>
        <img
          :src="
            recipe.images !== 'No Data Provide'
              ? recipe.images
              : 'https://i.pinimg.com/564x/b9/a9/66/b9a9668152a83397e96215ec1cadae0f.jpg'
          "
          alt="Recipe"
          class="recipe-image w-full h-52 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div>
        <h1>{{ recipe.name }}</h1>
        <p>Preparation Time: {{ recipe.prep_time }}</p>
        <p>Description : {{ recipe.description }}</p>
        <p>Instruction : {{ recipe.recipe_instructions }}</p>
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
