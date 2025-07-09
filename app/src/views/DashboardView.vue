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
        <div class="font-semibold text-gray-600">
            <span class="profile-user">User</span>
        </div>
    </header>

    <section class="flex justify-center items-center my-8 gap-2">
        <input
            type="text"
            placeholder="Search..."
            class="px-3 py-2 border border-gray-300 rounded-md min-w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            v-model="searchQuery"
        />
        <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
            Search
        </button>
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

<script lang="ts" setup>
import DashboardCard from '@/components/DashboardCard.vue';
import { ref, computed } from 'vue';

const searchQuery = ref('');
const cards = ref([
    { id: 1, title: 'Card One', description: 'Description for card one.' },
    { id: 2, title: 'Card Two', description: 'Description for card two.' },
    { id: 3, title: 'Card Three', description: 'Description for card three.' },
]);

const filteredCards = computed(() =>
    cards.value.filter(
        (card) =>
            card.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            card.description
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()),
    ),
);
</script>
