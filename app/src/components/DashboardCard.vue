<script lang="ts" setup>
import { defineProps, onMounted, watchEffect } from "vue"
import { useQuery } from "@vue/apollo-composable"
import { GET_USER } from "@/api/auth"

defineProps<{
    title: string
    description: string
}>()

const { result, loading, error } = useQuery(GET_USER, {
    id: "3f4cc871-a576-411d-a041-249660ddc758",
})

watchEffect(() => {
    console.log("DashboardCard mounted with user: ", result.value)
})
</script>

<template>
    <div class="bg-gray-200 h-36 w-full"></div>
    <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-600 text-sm">{{ description }}</p>
    </div>
</template>
