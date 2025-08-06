<script lang="ts" setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"

const props = defineProps<{
    id: string
    name: string
    description: string
}>()

defineEmits<{
    (e: "openEditWhiteboardModal", payload: { name: string; description: string }): void
}>()

const router = useRouter()

function goToWhiteboardPage() {
    router.push(`/whiteboard/${props.id}`)
}
</script>

<template>
    <div class="bg-gray-200 h-36 w-full"></div>
    <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 cursor-pointer" @click="goToWhiteboardPage">
            {{ name }}
        </h3>
        <p class="text-gray-600 text-sm">{{ description }}</p>
        <button
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
            @click="$emit('openEditWhiteboardModal', { name, description })"
        >
            Edit
        </button>
    </div>
</template>
