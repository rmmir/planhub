<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useQuery } from "@vue/apollo-composable"
import { GET_WHITEBOARD_BY_ID } from "@/api/whiteboard"

// Elements state
const elements = ref<any[]>([])

// Dynamic Excalidraw component
const ExcalidrawComponent = ref<any>(null)

// Get ID from route
const route = useRoute()
const id = route.params.id as string

// GraphQL query
const { result, loading, error } = useQuery(GET_WHITEBOARD_BY_ID, { id })

// Watch for data changes
watch([result, loading, error], () => {
    if (!loading.value && !error.value && result.value?.getById?.elements) {
        elements.value = result.value.getById.elements
    }
})

// Dynamically import Excalidraw client-side only
onMounted(async () => {
    const mod = await import("@excalidraw/excalidraw")
    ExcalidrawComponent.value = mod.Excalidraw
})

// Sync updated elements
function handleElementsChange(updatedElements: readonly any[]) {
    const mutableElements = [...updatedElements]
    if (JSON.stringify(mutableElements) !== JSON.stringify(elements.value)) {
        elements.value = mutableElements
    }
}

function handlePointerUp() {
    elements.value = [...elements.value]
}
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="text-gray-600">Loading whiteboard...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-8">
        <div class="text-red-600">Error loading whiteboard. Please try again.</div>
    </div>

    <div v-else style="height: 85vh; width: 90vw; border-radius: 20px; overflow: hidden">
        <component
            :is="ExcalidrawComponent"
            v-if="ExcalidrawComponent"
            :initialData="{ elements }"
            @change="handleElementsChange"
            @pointerup="handlePointerUp"
        />
    </div>
</template>
