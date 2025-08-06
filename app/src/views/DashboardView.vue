<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { useToast } from "vue-toastification"
import { CREATE_WHITEBOARD, GET_WHITEBOARDS } from "@/api/whiteboard"
import { useMutation, useQuery } from "@vue/apollo-composable"
import { FetchResult } from "@apollo/client/core"
import HeaderMenu from "@/components/common/HeaderMenu.vue"
import DashboardCard from "@/components/whiteboard/DashboardCard.vue"
import CreateWhiteboardModal from "@/components/whiteboard/CreateWhiteboardModal.vue"

type CreateWhiteboardResult = FetchResult<{ create: { message: string } }>
type WhiteboardPayload = {
    name: string
    description: string
}
type Whiteboard = {
    id: string
    name: string
    description: string
    elements: any[]
}

const { mutate } = useMutation(CREATE_WHITEBOARD)
const { result, loading, error, refetch } = useQuery(GET_WHITEBOARDS)
const toast = useToast()
const searchQuery = ref("")
const isAddWhiteboardModalOpen = ref(false)

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

onMounted(() => {
    !result.value && refetch()
})

function handleClose() {
    isAddWhiteboardModalOpen.value = false
}

function handleEditWhiteboardModal(payload: WhiteboardPayload) {
    console.log("Edit Whiteboard Modal Opened", payload)
}

async function handleCreate(payload: WhiteboardPayload) {
    try {
        const result: CreateWhiteboardResult = await mutate({
            input: {
                name: payload.name,
                description: payload.description,
            },
        })

        toast.success(result.data?.create?.message || "Whiteboard created successfully")
        await refetch()
    } catch (error) {
        toast.error("Failed to create whiteboard")
    }

    isAddWhiteboardModalOpen.value = false
}
</script>

<template>
    <HeaderMenu />

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
                :id="card.id"
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
