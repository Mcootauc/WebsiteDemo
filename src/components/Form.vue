<template>
    <form @submit="submitForm">
        <label for="workOrder#">Work Order #:</label>
        <input
            type="text"
            id="workOrder#"
            v-model="workOrder"
            required
            placeholder="e.g, 1187345"
        />

        <label for="category">Category:</label>
        <input
            type="text"
            id="category"
            v-model="category"
            required
            placeholder="e.g., Electrical, Plumbing"
        />

        <label for="status">Status:</label>
        <input
            type="text"
            id="status"
            v-model="status"
            required
            placeholder="e.g., In Progress, Completed"
        />

        <label for="dates">Dates:</label>
        <input
            type="text"
            id="dates"
            v-model="dates"
            required
            placeholder="e.g., 2024-04-01 - 2024-04-10"
        />

        <label for="price">Price:</label>
        <input
            type="text"
            id="price"
            v-model="price"
            required
            placeholder="e.g., $5000"
        />

        <label for="subCategory">Sub Category:</label>
        <input
            type="text"
            id="subCategory"
            v-model="subCategory"
            required
            placeholder="e.g., Cut Grass, Install Light Fixture"
        />

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
            required
            placeholder="e.g., Mow the lawn, Install a new light fixture"
        />

        <button type="submit">Submit</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
        };
    },
    methods: {
        submitForm() {
            // Handle form submission logic here
            // You can access the form data using this.name and this.email
        },
    },
};
</script>

<style scoped>
/* General form styling */
form {
    background-color: #f7f7f7; /* light grey background */
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style for labels */
label {
    display: block;
    margin-bottom: 8px;
    margin-top: 20px;
    color: #333;
    font-size: 16px;
}

/* Style for input fields */
input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px; /* space below each input */
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Styling the submit button */
button {
    background-color: #4caf50; /* green background */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049; /* darker green on hover */
}
</style>
