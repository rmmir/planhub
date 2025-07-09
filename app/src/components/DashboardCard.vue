<template>
    <div class="bg-gray-200 h-36 w-full"></div>
    <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-600 text-sm">{{ description }}</p>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
    title: string;
    description: string;
}>();
</script>
