<template>
  <div class="container p-56 flex justify-center ml-32">
    <div class="max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
      <form @submit.prevent="register" class="space-y-4">
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
            type="email"
            v-model="email"
            placeholder="Email"
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
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
      <div v-if="registrationMessage" class="mt-4 text-black">
        {{ registrationMessage }}
      </div>
      <router-link to="/login" class="mt-4 block text-black hover:underline"
        >Already have an account? Login</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import userService from "@/services/RecipeSearch";

export default {
  data() {
    return {
      registrationSuccessful: false,
      registrationMessage: "",
      username: "",
      email: "",
      password: "",
      result: "",
    };
  },
  methods: {
    async register() {
      try {
        await userService.register(this.username, this.email, this.password);
        this.registrationSuccessful = true;
        this.registrationMessage =
          "Registration successful. Redirecting to login...";
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (error) {
        console.error("Error registering user:", error);
        this.registrationMessage = "Error registering user. Please try again.";
      }
    },
  },
};
</script>
