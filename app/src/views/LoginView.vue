<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <AuthForm
      title="Login"
      button-text="Sign In"
      :on-submit-form="handleLogin"
    >
      <p class="text-sm text-center mt-4">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">
          Register
        </router-link>
      </p>
    </AuthForm>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue'

function handleLogin({ email, username, password }: { email: string; username: string; password: string }) {
  console.log('Logging in with:', email, username, password)
  // TODO: handle login logic
}
</script>
