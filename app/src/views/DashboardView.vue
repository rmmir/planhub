<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue"
import { useToast } from "vue-toastification"
import { router } from "@/router"
import { CREATE_WHITEBOARD, GET_WHITEBOARDS } from "@/api/whiteboard"
import { useMutation, useQuery } from "@vue/apollo-composable"
import { FetchResult } from "@apollo/client/core"
import DashboardCard from "@/components/whiteboard/DashboardCard.vue"
import CreateWhiteboardModal from "@/components/whiteboard/CreateWhiteboardModal.vue"

type CreateWhiteboardResult = FetchResult<{ create: { message: string } }>
type Whiteboard = {
    id: string
    name: string
    description: string
    elements: any[]
}

const { mutate } = useMutation(CREATE_WHITEBOARD)
const { result, loading, error, refetch } = useQuery(GET_WHITEBOARDS)
const toast = useToast()
const isAddWhiteboardModalOpen = ref(false)
const searchQuery = ref("")
const showProfileDropdown = ref(false)

const toggleDropdown = () => (showProfileDropdown.value = !showProfileDropdown.value)

const whiteboards = computed(() => {
    return result.value?.getAll || []
})

const filteredBoards = computed(() => {
    if (!searchQuery.value.trim()) {
        return whiteboards.value
    }

    return whiteboards.value.filter(
        (board: Whiteboard) =>
            board.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            board.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

watch(error, (newError) => {
    if (newError) {
        toast.error("Failed to load whiteboards")
    }
})

onMounted(() => {
    !result.value && refetch()
})

function logout() {
    localStorage.removeItem("access_token")
    router.push("/login")
}

function handleClose() {
    isAddWhiteboardModalOpen.value = false
}

function handleEditWhiteboardModal(payload: { name: string; description: string }) {
    console.log("Edit Whiteboard Modal Opened", payload)
}

async function handleCreate(payload) {
    try {
        const result: CreateWhiteboardResult = await mutate({
            input: {
                name: payload.name,
                description: payload.description,
            },
        })

        console.log(result.data)
        toast.success(result.data?.create?.message || "Whiteboard created successfully")

        await refetch()
    } catch (error) {
        toast.error("Failed to create whiteboard")
    }

    isAddWhiteboardModalOpen.value = false
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

    <div class="flex justify-start items-center my-8 ml-8">
        <input
            type="text"
            placeholder="Search..."
            class="px-3 py-2 border border-gray-300 rounded-md min-w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            v-model="searchQuery"
        />
        <button
            @click="isAddWhiteboardModalOpen = true"
            class="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
        >
            Add Whiteboard
        </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="text-gray-600">Loading whiteboards...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-8">
        <div class="text-red-600">Error loading whiteboards. Please try again.</div>
    </div>

    <div v-else class="flex flex-wrap gap-6 justify-center mx-8">
        <div v-if="filteredBoards.length === 0" class="text-center py-8 text-gray-600">
            <div v-if="searchQuery.trim()">No whiteboards found matching "{{ searchQuery }}"</div>
            <div v-else>No whiteboards available. Create your first whiteboard!</div>
        </div>

        <div
            v-for="card in filteredBoards"
            :key="card.id"
            class="bg-white border border-gray-200 rounded-lg w-64 shadow-sm flex flex-col overflow-hidden"
        >
            <DashboardCard
                :name="card.name"
                :description="card.description"
                @openEditWhiteboardModal="handleEditWhiteboardModal"
            />
        </div>
    </div>

    <CreateWhiteboardModal
        :isOpen="isAddWhiteboardModalOpen"
        @close="handleClose"
        @create="handleCreate"
    />
</template>
