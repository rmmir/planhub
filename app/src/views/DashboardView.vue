<script lang="ts" setup>
import DashboardCard from "@/components/DashboardCard.vue"
import { router } from "@/router"
import { ref, computed } from "vue"

const searchQuery = ref("")
const showProfileDropdown = ref(false)
const cards = ref([
    { id: 1, title: "Card One", description: "Description for card one." },
    { id: 2, title: "Card Two", description: "Description for card two." },
    { id: 3, title: "Card Three", description: "Description for card three." },
])

const toggleDropdown = () =>
    (showProfileDropdown.value = !showProfileDropdown.value)

const filteredCards = computed(() =>
    cards.value.filter(
        (card) =>
            card.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            card.description
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
    )
)

function logout() {
    localStorage.removeItem("access_token")
    router.push("/login")
}
</script>

<template>
    <header
        class="flex justify-between items-center px-8 py-4 bg-gray-100 border-b border-gray-200"
    >
        <div class="flex items-center">
            <img src="" alt="Logo" class="h-10 mr-6" />
            <nav>
                <ul class="flex gap-6 m-0 p-0 list-none">
                    <li>
                        <a
                            href="#"
                            class="text-gray-800 font-medium hover:text-blue-600"
                            >Dashboard</a
                        >
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
    </header>

    <section class="flex justify-start items-center my-8 ml-8">
        <input
            type="text"
            placeholder="Search..."
            class="px-3 py-2 border border-gray-300 rounded-md min-w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            v-model="searchQuery"
        />
    </section>

    <section class="flex flex-wrap gap-6 justify-center mx-8">
        <div
            v-for="card in filteredCards"
            :key="card.id"
            class="bg-white border border-gray-200 rounded-lg w-64 shadow-sm flex flex-col overflow-hidden"
        >
            <DashboardCard
                :title="card.title"
                :description="card.description"
            />
        </div>
    </section>
</template>
