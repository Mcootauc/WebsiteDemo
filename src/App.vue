<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">ID #</th>
                    <th scope="col" class="px-6 py-3">Category</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in dataTable" :key="item.id" class="border-b">
                    <td class="px-6 py-4">{{ item.id }}</td>
                    <td class="px-6 py-4">{{ item.workName }}</td>
                    <td class="px-6 py-4">
                        {{ item.status ? "Active" : "Inactive" }}
                    </td>
                    <td class="px-6 py-4">
                        <button
                            @click="item.showDetails = !item.showDetails"
                            class="text-blue-600 hover:underline"
                        >
                            View Details
                        </button>
                        <div v-if="item.showDetails">
                            <!-- Additional details here -->
                            Detailed info for {{ item.workName }}.
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataTable: [
                { id: 1, workName: "Task 1", status: true, showDetails: false },
                {
                    id: 2,
                    workName: "Task 2",
                    status: false,
                    showDetails: false,
                },
                // More items...
            ],
        };
    },
};
</script>

<!-- Add your styles or refer to style.css -->
<style scoped>
/* Your CSS here or keep styles in style.css */
</style>
