<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <RegisterForm title="Register" button-text="Create Account">
            <p class="text-sm text-center mt-4">
                Already have an account?
                <router-link to="/login" class="text-blue-600 hover:underline">
                    Log In
                </router-link>
            </p>
        </RegisterForm>
    </div>
</template>

<script lang="ts" setup>
import RegisterForm from "@/components/RegisterForm.vue"
</script>
<script lang="ts" setup></script>
