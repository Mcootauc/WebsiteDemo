<template>
    <form @submit="submitForm">
        <label for="category">Category:</label>
        <select id="category" v-model="category" required>
            <option disabled value="">Please select one</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
        </select>

        <label for="status">Status:</label>
        <select id="status" v-model="status" required>
            <option disabled value="">Please select one</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>

        <label for="price">Price ($):</label>
        <input
            type="number"
            id="price"
            v-model.number="price"
            min="0.01"
            step="0.01"
            required
            placeholder="e.g., $5000"
        />

        <label for="subCategory">Sub Category:</label>
        <select id="subCategory" v-model="subCategory" required>
            <option disabled value="">Please select one</option>
            <option
                v-for="option in availableSubCategories"
                :key="option"
                :value="option"
            >
                {{ option }}
            </option>
        </select>

        <label for="location">Location:</label>
        <input
            type="text"
            id="location"
            v-model="location"
            required
            placeholder="e.g., Yard, Kitchen"
        />

        <label for="laborHours">Labor Hours:</label>
        <input
            type="text"
            id="laborHours"
            v-model="laborHours"
            required
            placeholder="e.g., 10 hours"
        />

        <label for="description">Description:</label>
        <input
            type="text"
            id="description"
            v-model="description"
            @input="checkLength"
            maxlength="100"
            required
            placeholder="e.g., Mow the lawn, Install a new light fixture"
        />
        <div id="character-length">{{ description.length }}/100 characters</div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import {
    createWorkOrder,
    fetchLatestWorkOrderId,
} from '../services/workOrderService.js';

const emits = defineEmits(['changeView']);

const workOrder = ref('');
const category = ref('');
const status = ref('');
const price = ref('');
const subCategory = ref('');
const location = ref('');
const laborHours = ref('');
const description = ref('');

const subCategoryOptions = {
    Outdoors: ['Lawn', 'Exterior Cleaning', 'Gardening', 'Other'],
    Kitchen: ['Appliance Installation', 'Cabinetry', 'Plumbing', 'Other'],
    Plumbing: ['Leak Repairs', 'Installation', 'Maintenance', 'Other'],
    Electronics: ['Repair', 'Setup', 'Maintenance', 'Other'],
    Other: ['Other'],
};

// Computed property to get the subcategories based on the selected category
const availableSubCategories = computed(() => {
    return subCategoryOptions[category.value] || [];
});

// Initialize the form with the next available work order ID
const initializeForm = async () => {
    const latestId = await fetchLatestWorkOrderId();
    workOrder.value = (parseInt(latestId, 10) + 1).toString().padStart(6, '0'); // Ensure it's a 6-digit number
};

onMounted(() => {
    initializeForm();
});

const submitForm = async (event) => {
    event.preventDefault();

    // Validation for price to be greater than zero
    if (parseFloat(price.value) <= 0) {
        console.error('Price must be greater than zero');
        return;
    }

    const formData = {
        workOrder: workOrder.value,
        category: category.value,
        status: status.value,
        price: price.value,
        subCategory: subCategory.value,
        location: location.value,
        laborHours: laborHours.value,
        description: description.value,
    };

    try {
        await createWorkOrder(formData);
        console.log('Work Order created successfully!');
        emits('changeView'); // Change the view to Home component
    } catch (error) {
        console.error('Failed to create work order', error);
    }
};
</script>

<style scoped>
form {
    background-color: #d1d0d0;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 8px;
    margin-top: 15px;
    color: #333;
    font-size: 16px;
}

input[type='text'] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#character-length {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}
button:hover {
    background-color: #45a049;
}
</style>
