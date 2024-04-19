<template>
    <div v-if="isLoading" class="loading-message">
        <span>Loading...</span>
        <!-- Loading indicator -->
    </div>
    <!-- Table Section -->
    <div v-else-if="workOrders.length > 0" class="content-container">
        <!-- Table Container -->
        <div class="table-container">
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs text-gray-700 uppercase zdark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700"
                >
                    <tr>
                        <th scope="col" class="center-text px-6 py-5">
                            Work Order #
                        </th>
                        <th scope="col" class="center-text px-6 py-5">
                            Category
                        </th>
                        <th scope="col" class="center-text px-6 py-5">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in workOrders" :key="item.id">
                    <tr class="primary-cell border-b dark:border-gray-700">
                        <td class="center-text px-6 py-4">
                            {{ item.workOrder }}
                        </td>
                        <td class="center-text px-6 py-4">
                            {{ item.category }}
                        </td>
                        <td class="center-text px-6 py-4">
                            <span
                                :class="{
                                    'status-completed':
                                        item.status === 'Completed',
                                    'status-in-progress':
                                        item.status === 'In Progress',
                                }"
                            >
                                {{ item.status }}
                            </span>
                        </td>

                        <td class="px-2 py-4 center-content">
                            <button
                                @click="toggleDetails(index)"
                                class="button-blue"
                            >
                                <span v-if="!item.showDetails">▼</span>
                                <span v-else>▲</span>
                            </button>
                        </td>
                    </tr>
                    <!-- Conditional rendering for additional details with new styles -->
                    <transition name="slide-fade">
                        <tr v-if="item.showDetails" class="border-b">
                            <td colspan="4">
                                <div class="detail-table-container">
                                    <table
                                        class="detail-table text-sm text-left text-gray-500 dark:text-gray-400"
                                    >
                                        <tbody>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-5 py-3"
                                                >
                                                    Date Created
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Contact
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-2 py-3"
                                                ></th>
                                                <!-- Empty cell for better spacing -->
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td class="px-5 py-4">
                                                    {{ item.dateCreated }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    ${{ item.price }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    123-456-7890
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-5 py-3"
                                                >
                                                    Sub Category
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Location
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3"
                                                >
                                                    Labor Time
                                                </th>
                                            </tr>
                                            <tr>
                                                <td class="px-5 py-4">
                                                    {{ item.subCategory }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {{ item.location }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {{ item.laborHours }}
                                                </td>
                                            </tr>
                                            <!-- Separate row for description -->
                                            <tr>
                                                <th
                                                    colspan="3"
                                                    class="px-5 py-3"
                                                >
                                                    Description
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    colspan="3"
                                                    class="px-5 py-4"
                                                >
                                                    {{ item.description }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </transition>
                </tbody>
            </table>
        </div>

        <div>
            <img
                src="https://st.hzcdn.com/simgs/pictures/exteriors/high-park-currant-interior-design-img~f71130a6024f3947_4-3756-1-6f7b4f3.jpg"
                alt="description"
                style="max-width: 100%; height: auto"
            />
        </div>
    </div>
    <!-- No Work Orders Message -->
    <div v-else class="no-data-message">
        <h1>No workorders created!</h1>
    </div>
</template>

<script setup>
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import 'flowbite';
import { ref, onMounted } from 'vue';
import { fetchWorkOrders } from '../services/workOrderService';

const workOrders = ref([]);
const isLoading = ref(true); // State to track loading status

onMounted(async () => {
    try {
        workOrders.value = await fetchWorkOrders();
    } finally {
        isLoading.value = false; // Set loading to false after fetching data
    }
});

function toggleDetails(index) {
    workOrders.value[index].showDetails = !workOrders.value[index].showDetails;
}
</script>

<style scoped>
.table-container table tbody:nth-child(odd) > .primary-cell {
    background-color: #f9fafc; /* Light gray for odd rows */
}

.table-container table tbody:nth-child(even) > .primary-cell {
    background-color: #ffffff; /* White for even rows */
}
.detail-table-container {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center; /* Center the details table horizontally */
    width: 100%; /* Ensures the container takes full available width */
}
.detail-table {
    width: 83%; /* Adjust this width as needed to prevent the table from using the full width */
}
.center-content {
    display: flex;
    justify-content: center; /* Horizontally center the content */
    align-items: center; /* Vertically center the content */
}
.button-blue {
    color: #83b2f7; /* Text color */
    border: none; /* Removes any default border */
    cursor: pointer;
    padding: 8px 16px; /* Adjust padding to your needs */
    border-radius: 4px; /* Optional: for rounded corners */
    transition: background-color 0.3s; /* Smooth transition for background color */
}

.button-blue:hover {
    text-decoration: underline; /* Adds underline on hover */
}

/* If there's more specific styling needed for loading or no-data messages */
.loading-message,
.no-data-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 100%;
    font-size: 1.5rem;
}

/* Center align specific table headers and cells */
.center-text {
    text-align: center;
}

/* Ensure that only designated headers and cells are centered */
.table-container .center-text {
    text-align: center;
    padding-right: 6px; /* Maintain uniform padding if necessary */
    padding-left: 6px;
}
.content-container {
    display: flex;
    justify-content: space-between; /* Aligns children horizontally with space between them */
    align-items: flex-start; /* Aligns children to the top of the container */
    flex-wrap: nowrap;
}

.table-container {
    flex: 1 1 60%;
    max-width: 60%;
}

.image-container {
    flex: 1 1 40%;
    max-width: 40%;
    display: flex;
}

@media (max-width: 1024px) {
    .content-container {
        flex-direction: row;
        justify-content: space-between;
    }
}

@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }
}

/* Existing styles remain, add the following: */
.status-completed {
    padding: 2px 6px; /* Adjust padding as needed */
    background-color: #d1fee9; /* Light green background */
    color: #10b981; /* Green text */
    border: 1px solid #10b981; /* Green border */
    border-radius: 4px; /* Rounded corners */
}

.status-in-progress {
    padding: 2px 6px; /* Adjust padding as needed */
    background-color: #fef3c7; /* Light yellow background */
    color: #eab308; /* Yellow text */
    border: 1px solid #eab308; /* Yellow border */
    border-radius: 4px; /* Rounded corners */
}

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
