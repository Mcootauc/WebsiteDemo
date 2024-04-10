<template>
    <div>
        <!-- Button to toggle between form and home -->
        <button @click="toggleWriting">
            {{ writing ? "Go to Home" : "Create Form" }}
        </button>

        <!-- Conditionally render Form or Home component -->
        <Form v-if="writing" />
        <Home v-else />
    </div>
</template>

<script>
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";

export default {
    components: {
        Form,
        Home,
    },
    data() {
        return {
            writing: false,
        };
    },
    methods: {
        toggleWriting() {
            this.writing = !this.writing;
        },
    },
};
</script>

<style>
/* Add your styles here */
button {
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

button:hover {
    background-image: linear-gradient(to right, #00f2fe 0%, #4facfe 100%);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

button:focus {
    outline: none;
}
</style>
