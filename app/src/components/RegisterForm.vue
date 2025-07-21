<script lang="ts" setup>
import { REGISTER } from "@/api/auth"
import { RegisterForm, registerSchema } from "@/models/AuthForm"
import { FetchResult } from "@apollo/client/core"
import { useMutation } from "@vue/apollo-composable"
import { reactive } from "vue"

interface Props {
    title: string
    buttonText: string
}

defineProps<Props>()
type RegisterResult = FetchResult<{ login: { username: string } }>

const { mutate } = useMutation(REGISTER)
const form = reactive<RegisterForm>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
})
const errors = reactive<Partial<Record<keyof RegisterForm | "message", string>>>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
})

async function handleRegister(event: Event) {
    event.preventDefault()

    const result = registerSchema.safeParse(form)
    if (!result.success) {
        result.error.errors.forEach((error) => {
            const field = error.path[0] as keyof RegisterForm
            errors[field] = error.message
        })
        return
    }

    const { email, username, password, confirmPassword } = form

    try {
        const result: RegisterResult = await mutate({
            input: {
                username,
                email,
                password,
            },
        })
    } catch (err) {
        errors.message = err
    }
    console.log("Registering with:", username, email, password, confirmPassword)
    // TODO: implement registration logic
}
</script>

<template>
    <form
        @submit.prevent="handleRegister"
        class="space-y-4 w-full max-w-sm mx-auto"
    >
        <h2 class="text-2xl font-bold text-center">{{ title }}</h2>

        <div>
            <label class="block mb-1 text-sm font-medium">Email</label>
            <input
                v-model="form.email"
                @input="errors.email = ''"
                type="email"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">
                {{ errors.email }}
            </p>
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium">Username</label>
            <input
                v-model="form.username"
                @input="errors.username = ''"
                type="text"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">
                {{ errors.username }}
            </p>
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium">Password</label>
            <input
                v-model="form.password"
                @input="errors.password = ''"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">
                {{ errors.password }}
            </p>
        </div>

        <div>
            <label class="block mb-1 text-sm font-medium"
                >Confirm Password</label
            >
            <input
                v-model="form.confirmPassword"
                @input="errors.confirmPassword = ''"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">
                {{ errors.confirmPassword }}
            </p>
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
            {{ buttonText }}
        </button>

        <p class="text-sm text-center mt-4">
            Already have an account?
            <router-link to="/login" class="text-blue-600 hover:underline">
                Log In
            </router-link>
        </p>
    </form>
</template>
