<template>
    <!-- Loading Section -->
    <div v-if="isLoading" class="loading-message">
        <span>Loading...</span>
    </div>
    <!-- Table Section -->
    <div v-else-if="workOrders.length > 0" class="content-container">
        <div class="table-container">
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead class="border-b dark:border-gray-700">
                    <tr>
                        <td scope="col" class="center-text-title px-6 py-5">
                            Work Order #
                        </td>
                        <td scope="col" class="center-text-title px-6 py-5">
                            Category
                        </td>
                        <td scope="col" class="center-text-title px-6 py-5">
                            Status
                        </td>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in workOrders" :key="item.id">
                    <tr class="primary-cell border-b dark:border-gray-700">
                        <th class="center-text px-6 py-4">
                            {{ item.workOrder }}
                        </th>
                        <th class="center-text px-6 py-4">
                            {{ item.category }}
                        </th>
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
                                <span :class="{ 'rotate-up': item.showDetails }"
                                    ><i class="bi bi-chevron-down"></i
                                ></span>
                            </button>
                        </td>
                    </tr>
                    <!-- Transition and extra details -->
                    <transition name="fade">
                        <tr v-if="item.showDetails" class="border-b">
                            <td colspan="4">
                                <div class="detail-table-container">
                                    <table
                                        class="detail-table text-sm text-left text-gray-500 dark:text-gray-400"
                                    >
                                        <tbody>
                                            <tr>
                                                <th scope="col" class="px-6">
                                                    Date Created
                                                </th>
                                                <th scope="col" class="px-6">
                                                    Price
                                                </th>
                                                <th scope="col" class="px-6">
                                                    Contact
                                                </th>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td class="px-6">
                                                    {{ item.dateCreated }}
                                                </td>
                                                <td class="px-6">
                                                    ${{ item.price }}
                                                </td>
                                                <td class="px-6">
                                                    123-456-7890
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="px-6">
                                                    Sub Category
                                                </th>
                                                <th scope="col" class="px-6">
                                                    Location
                                                </th>
                                                <th scope="col" class="px-6">
                                                    Labor Time
                                                </th>
                                            </tr>
                                            <tr>
                                                <td class="px-6">
                                                    {{ item.subCategory }}
                                                </td>
                                                <td class="px-6">
                                                    {{ item.location }}
                                                </td>
                                                <td class="px-6">
                                                    {{ item.laborHours }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colspan="3" class="px-6">
                                                    Description
                                                </th>
                                            </tr>
                                            <tr>
                                                <td colspan="3" class="px-6">
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
        <!-- Image Section -->
        <div>
            <img
                src="https://st.hzcdn.com/simgs/pictures/exteriors/high-park-currant-interior-design-img~f71130a6024f3947_4-3756-1-6f7b4f3.jpg"
                alt="Home Image"
                style="max-width: 100%; height: auto"
            />
        </div>
    </div>
    <!-- No Work Orders Section -->
    <div v-else class="no-data-message">
        <h1>No workorders created!</h1>
    </div>
</template>

<script setup>
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import 'flowbite';
import { ref, onMounted } from 'vue';
import { fetchWorkOrders } from '../services/workOrderService';

const workOrders = ref([]); // State to store work orders
const isLoading = ref(true); // State to track loading status

onMounted(async () => {
    try {
        workOrders.value = await fetchWorkOrders();
    } finally {
        isLoading.value = false;
    }
});

function toggleDetails(index) {
    workOrders.value[index].showDetails = !workOrders.value[index].showDetails;
}
</script>

<style scoped>
.button-blue {
    color: #83b2f7;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;
}
.button-blue span {
    display: inline-block; /* Allows transformation */
    transition: transform 0.5s ease;
}
.rotate-up {
    transform: rotate(180deg);
}

.loading-message,
.no-data-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 100%;
    font-size: 1.5rem;
}

.center-text,
.center-text-title {
    text-align: center;
}
.center-text-title {
    font-size: large;
}

.table-container table tbody:nth-child(odd) > .primary-cell {
    background-color: #f9fafc; /* Light gray for odd rows */
}

.table-container table tbody:nth-child(even) > .primary-cell {
    background-color: #ffffff; /* White for even rows */
}
.detail-table-container {
    padding-left: 40px;
    margin: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.detail-table {
    width: 91%;
}
.detail-table th {
    padding-top: 15px;
}
.detail-table td {
    padding-bottom: 15px;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.table-container .center-text {
    text-align: center;
}
.table-container {
    flex: 1 1 60%;
    max-width: 60%;
}

.content-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
}

.image-container {
    flex: 1 1 40%;
    max-width: 40%;
    display: flex;
}

.status-completed,
.status-in-progress {
    padding: 3px 10px;
    border-radius: 4px;
    font-weight: bold;
}
.status-completed {
    background-color: #d1fee9;
    color: #10b981;
    border: 1px solid #10b981;
}
.status-in-progress {
    background-color: #fef3c7;
    color: #eab308;
    border: 1px solid #eab308;
}

/* Styling for detail rows */
.detail-row {
    background-color: #f3f3f3;
    color: #333;
}
.detail-cell {
    padding-left: 2rem;
    border-top: 1px solid #ccc; /* Top border for separation */
}

/* Active transition states */
.fade-enter-from {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
}
.fade-enter-active {
    transition: all 1s ease;
}
.fade-leave-from {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
.fade-leave-active {
    transition: all 0.7s ease;
}

.rotate-enter-from {
    opacity: 0;
}
.rotate-enter-to {
    opacity: 1;
}
.rotate-enter-active {
    transition: all 1s ease;
}
.rotate-leave-from {
    opacity: 1;
}
.rotate-leave-to {
    opacity: 0;
}
.rotate-leave-active {
    transition: all 0.7s ease;
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
</style>
