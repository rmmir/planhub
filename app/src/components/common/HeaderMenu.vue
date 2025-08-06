<script lang="ts" setup>
import { ref } from "vue"
import { router } from "@/router"

const showProfileDropdown = ref(false)
const toggleDropdown = () => (showProfileDropdown.value = !showProfileDropdown.value)

function logout() {
    localStorage.removeItem("access_token")
    router.push("/login")
}
</script>

<template>
    <div class="flex justify-between items-center px-8 py-4 bg-gray-100 border-b border-gray-200">
        <div class="flex items-center">
            <img src="" alt="Logo" class="h-10 mr-6" />
            <nav>
                <ul class="flex gap-6 m-0 p-0 list-none">
                    <li>
                        <a href="#" class="text-gray-800 font-medium hover:text-blue-600">
                            Dashboard
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="relative">
            <button
                @click="toggleDropdown"
                class="font-semibold text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
            >
                User
            </button>

            <div
                v-if="showProfileDropdown"
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
            >
                <ul class="py-1">
                    <li>
                        <a
                            href="/settings"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Settings
                        </a>
                    </li>
                    <li>
                        <button
                            @click="logout"
                            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
