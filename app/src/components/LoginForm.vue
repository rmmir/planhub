<template>
    <form
        @submit.prevent="handleLogin"
        class="space-y-4 w-full max-w-sm mx-auto"
    >
        <h2 class="text-2xl font-bold text-center">{{ title }}</h2>

        <div>
            <label class="block mb-1 text-sm font-medium">Email</label>
            <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium">Password</label>
            <input
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
            {{ buttonText }}
        </button>

        <slot></slot>
    </form>
</template>

<script lang="ts" setup>
import { LoginForm } from "@/models/AuthForm"
import { reactive } from "vue"

interface Props {
    title: string
    buttonText: string
}

defineProps<Props>()

const form = reactive<LoginForm>({
    email: "",
    password: "",
})

function handleLogin(event: Event) {
    event.preventDefault()
    const { email, password } = form
    console.log("Logging in with:", email, password)
    // TODO: implement login logic
}
</script>
