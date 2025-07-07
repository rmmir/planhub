<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <AuthForm
      title="Register"
      button-text="Create Account"
      :on-submit-form="handleRegister"
    >
      <p class="text-sm text-center mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Log In
        </router-link>
      </p>
    </AuthForm>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue'

function handleRegister({ email, username, password }: { email: string; username: string; password: string }) {
  console.log('Registering with:', email, password)
  // TODO: implement registration logic
}
</script>
