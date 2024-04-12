<template>
    <div>
        <!-- Top Bar for Buttons -->
        <div class="top-bar">
            <button @click="toggleWriting" class="left-button">
                {{ writing ? "Go to Home" : "Create Form" }}
            </button>
            <div class="right-section">
                <button v-if="!user" @click="signIn">Sign In</button>
                <div v-else>
                    Hello, {{ user.displayName }} &nbsp;
                    <button @click="signOutUser">Sign Out</button>
                </div>
            </div>
        </div>
        <!-- Main Content: Form or Home Component -->
        <div class="content">
            <Form
                v-if="writing"
                :writing="writing"
                @changeView="writing = false"
            />
            <Home v-else />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";
import {
    useAuthentication,
    useSignIn,
    useSignOut,
} from "./services/authService.js";

const writing = ref(false);
const { user, subscribe } = useAuthentication();
const { signIn } = useSignIn();
const { signOutUser } = useSignOut();

const toggleWriting = () => {
    writing.value = !writing.value;
};

let unsubscribe;
onMounted(() => {
    unsubscribe = subscribe();
});

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});
</script>

<style>
/* General button styling */
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

/* Top bar layout */
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.left-button {
    /* Additional styling if needed */
}

.right-section {
    /* Additional styling if needed */
}

/* Styling for the main content area */
.content {
    margin-top: 20px;
}
</style>
