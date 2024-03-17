<template>
  <div class="container p-56 flex justify-center ml-32">
    <div class="max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div v-if="LoginMessage" class="mt-4 text-black">
          {{ LoginMessage }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import userService from "@/services/RecipeSearch";
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      password: "",
      LoginSuccessful: false,
      LoginMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        await userService.login(this.username, this.password);
        this.LoginSuccessful = true;
        this.LoginMessage = "Login successful";
        setTimeout(() => {
          router.push({ name: "Search" });
        }, 1000);
      } catch (error) {
        console.error("Error logging in:", error);
        this.LoginMessage = "Login failed, please try again";
      }
    },
  },
};
</script>
