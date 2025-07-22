<script lang="ts" setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useMutation } from "@vue/apollo-composable"
import { LOGIN } from "@/api/auth"
import { LoginForm } from "@/models/AuthForm"
import { FetchResult } from "@apollo/client/core"

type LoginResult = FetchResult<{ login: { access_token: string } }>

const { mutate } = useMutation(LOGIN)
const router = useRouter()
const form = reactive<LoginForm>({
    email: "",
    password: "",
})
const errors = reactive({ message: "" })

async function handleLogin(event: Event) {
    event.preventDefault()
    const { email, password } = form

    try {
        const result: LoginResult = await mutate({
            input: {
                email,
                password,
            },
        })

        localStorage.setItem("access_token", result.data.login.access_token)

        router.push("/")
    } catch (err) {
        errors.message = err.graphQLErrors?.[0]?.message
    }
}
</script>

<template>
    <form @submit.prevent="handleLogin" class="space-y-4 w-full max-w-sm mx-auto">
        <h2 class="text-2xl font-bold text-center">Login</h2>

        <div>
            <label class="block mb-1 text-sm font-medium">Email</label>
            <input
                v-model="form.email"
                @input="errors.message = ''"
                type="email"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium">Password</label>
            <input
                v-model="form.password"
                @input="errors.message = ''"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>

        <p v-if="errors.message" class="text-red-600 text-sm mt-1">
            {{ errors.message }}
        </p>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
            Sign In
        </button>

        <p class="text-sm text-center mt-4">
            Don't have an account?
            <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </p>
    </form>
</template>
