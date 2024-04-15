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
                    <th scope="col" class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in workOrders" :key="item.id">
                <tr
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                    <td class="px-6 py-4">{{ item.workOrder }}</td>
                    <td class="px-6 py-4">{{ item.category }}</td>
                    <td class="px-6 py-4">
                        {{ item.status }}
                    </td>
                    <td class="px-6 py-4">
                        <button
                            @click="toggleDetails(index)"
                            class="text-blue-600 hover:underline flex items-center"
                        >
                            <span v-if="!item.showDetails">▼</span>
                            <span v-else>▲</span>
                        </button>
                    </td>
                </tr>
                <!-- Conditional rendering for additional details with new styles -->
                <transition name="slide-fade">
                    <tr v-if="item.showDetails" class="border-b">
                        <td colspan="4" class="px-6 py-4">
                            <table
                                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                            >
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                                >
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Date Created
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Contact
                                        </th>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-6 py-4">
                                            {{ item.dateCreated }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ item.price }}
                                        </td>
                                        <td class="px-6 py-4">123-456-7890</td>
                                    </tr>
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Sub Category
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Location
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Labor Hours
                                        </th>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="px-6 py-4">
                                            {{ item.subCategory }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ item.location }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ item.laborHours }}
                                        </td>
                                    </tr>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <tr>
                                        <td class="px-6 py-4">
                                            {{ item.description }}
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </td>
                    </tr>
                </transition>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import "flowbite";
import { ref, onMounted } from "vue";
import { fetchWorkOrders } from "../services/workOrderService";

const workOrders = ref([]);

onMounted(async () => {
    workOrders.value = await fetchWorkOrders();
});

function toggleDetails(index) {
    workOrders.value[index].showDetails = !workOrders.value[index].showDetails;
}
</script>

<style scoped>
/* Existing styles remain, add the following: */

/* Styling for detail rows */
.detail-row {
    background-color: #f3f3f3; /* Light grey background for detail rows */
    color: #333; /* Darker text color for better contrast */
}

.detail-cell {
    padding-left: 2rem; /* Indent the content of detail cells */
    border-top: 1px solid #ccc; /* Add a top border for separation */
}

/* Active transition states */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

/* Initial state for entering and final state for leaving */
.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(10px); /* Adjust the direction/magnitude as needed */
}
</style>
