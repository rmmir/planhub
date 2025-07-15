<script lang="ts" setup>
import LoginForm from "@/components/LoginForm.vue"
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <LoginForm title="Login" button-text="Sign In">
            <p class="text-sm text-center mt-4">
                Don't have an account?
                <router-link
                    to="/register"
                    class="text-blue-600 hover:underline"
                >
                    Register
                </router-link>
            </p>
        </LoginForm>
    </div>
</template>
