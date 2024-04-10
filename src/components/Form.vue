<template>
    <form @submit="submitForm">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />

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
/* Add your custom styles here */
</style>
