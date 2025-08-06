<script setup>
import { ref } from "vue"
import Modal from "../common/Modal.vue"

defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(["close", "create"])

const name = ref("")
const description = ref("")

const closeModal = () => {
    resetForm()
    emit("close")
}

const submitForm = () => {
    emit("create", { name: name.value, description: description.value })
    closeModal()
}

const resetForm = () => {
    name.value = ""
    description.value = ""
}
</script>

<template>
    <Modal :isOpen="isOpen" :onClose="closeModal">
        <h2 class="text-lg font-semibold">Create New Whiteboard</h2>
        <p class="mt-2 text-sm text-gray-600">
            Give your whiteboard a name and optional description.
        </p>

        <form @submit.prevent="submitForm" class="mt-4 space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input
                    v-model="name"
                    type="text"
                    required
                    class="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring focus:outline-none"
                    placeholder="e.g., Project Planning"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    v-model="description"
                    rows="3"
                    class="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring focus:outline-none"
                    placeholder="Optional description"
                ></textarea>
            </div>

            <div class="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    @click="closeModal"
                    class="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
                >
                    Create
                </button>
            </div>
        </form>
    </Modal>
</template>
