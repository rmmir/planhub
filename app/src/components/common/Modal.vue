<script setup>
import { Dialog, DialogPanel } from "@headlessui/vue"
defineProps({
    isOpen: Boolean,
    onClose: Function,
})
</script>

<template>
    <Dialog
        :open="isOpen"
        @close="onClose"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
        <DialogPanel class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <slot></slot>
        </DialogPanel>
    </Dialog>
</template>
