<template>
    <div>
        <!-- Header Section -->
        <div class="top-bar">
            <div class="houseWithCircleAndSquare">
                <div class="square"></div>
                <div class="houseCircle"></div>
                <div id="house">
                    <h1 id="houseName">Java</h1>
                    <h2 id="houseDescription">Smokey Mountains</h2>
                </div>
            </div>
            <h1 id="viewListing">View Listing</h1>
            <span class="middleButtons">
                <h1>Overview</h1>
                <h1>Bookings</h1>
                <h1 id="workOrders">Work Orders</h1>
            </span>
            <div class="houseWithCircleAndSquare">
                <div class="notificationCircle"></div>
                <div class="userCircle"></div>
                <div class="right-section">
                    <button v-if="!user" @click="signIn">Sign In</button>
                    <div v-else>{{ user.displayName }} &nbsp;</div>
                </div>
            </div>
        </div>
        <!-- Mid Bar for Buttons -->
        <div class="mid-bar">
            <button @click="toggleWriting" class="left-button">
                {{ writing ? 'Go to Home' : 'Create Form' }}
            </button>
            <button v-if="user" @click="signOutUser">Sign Out</button>
        </div>
        <!-- Mid Bar for Inputs -->
        <div class="bottom-bar">
            <input
                type="text"
                placeholder="Search by work order # or category..."
                class="px-9 py-3 border rounded"
            />
            <div class="properties">
                <button id="selectedProperty">Selected Property</button>
                <h1>All Properties</h1>
            </div>
            <input
                type="text"
                placeholder="Created"
                class="px-3 py-3 border rounded"
            />
            <input
                type="text"
                placeholder="Completed"
                class="px-3 py-3 border rounded"
            />
            <input
                type="text"
                placeholder="Work Order Status"
                class="px-3 py-3 border rounded"
            />
        </div>
        <h1 class="clearFiltersButton">
            <span class="circleIndicator"></span>
            Clear all filters
        </h1>
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
import { ref, onMounted, onUnmounted } from 'vue';
import Home from './components/Home.vue';
import Form from './components/Form.vue';
import {
    useAuthentication,
    useSignIn,
    useSignOut,
} from './services/authService.js';

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
    background-color: black;
}
.square {
    width: 30px; /* Circle size */
    height: 30px; /* Circle size */
    background-color: white; /* Circle color */
    margin-right: 30px; /* Space between the circle and the text */
    margin-left: 20px; /* Space between the circle and the text */
}

.houseCircle {
    width: 40px; /* Circle size */
    height: 40px; /* Circle size */
    background-color: burlywood; /* Circle color */
    border-radius: 50%; /* Makes the div a circle */
    margin-right: 10px; /* Space between the circle and the text */
}

.notificationCircle {
    width: 35px; /* Circle size */
    height: 35px; /* Circle size */
    background-color: gray; /* Circle color */
    border-radius: 50%; /* Makes the div a circle */
    margin-right: 20px; /* Space between the circle and the text */
}

.userCircle {
    width: 40px; /* Circle size */
    height: 40px; /* Circle size */
    background-color: blue; /* Circle color */
    border-radius: 50%; /* Makes the div a circle */
    margin-right: 10px; /* Space between the circle and the text */
}

.houseWithCircleAndSquare {
    display: flex;
    align-items: center; /* Aligns the circle and text vertically */
}

#house {
    display: flex;
    flex-direction: column; /* Stack the text vertically */
    justify-content: center; /* Center the text vertically */
}

#houseName {
    color: white;
    font-size: 1rem; /* Adjusted for better visibility */
}

#houseDescription {
    color: gray;
    font-size: 0.85rem; /* Adjusted for better visibility */
}

#viewListing {
    color: white;
    background-color: gray;
    padding: 0 10px 0 10px;
}

.middleButtons {
    color: white;
    display: flex; /* Enables flexbox */
    justify-content: center; /* Center items horizontally */
    align-items: center; /* Align items vertically */
    gap: 20px; /* Adds space between each item */
    padding: 0 15px 0 15px; /* Adds padding to the sides */
}

#workOrders {
    position: relative; /* Required for absolute positioning of pseudo-element */
    background-color: transparent;
    color: #4facfe;
    border: none;
    text-decoration: none; /* Remove default underline if it's a link or styled button */
    font-size: 1rem;
    cursor: pointer;
    padding: 10px 0;
    transition: all 0.3s ease;
}

#workOrders::after {
    content: ''; /* Required for pseudo-elements */
    position: absolute; /* Position relative to the button */
    bottom: 0; /* Align to the bottom of the button */
    left: 0; /* Start from the left edge of the button */
    width: 100%; /* Stretch across the entire width of the button */
    height: 2px; /* Height of the underline */
    background-color: #4facfe; /* Color of the underline */
}

/* Mid bar layout */
.mid-bar {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

/* Mid bar layout */
.bottom-bar {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.properties {
    display: flex;
    gap: 10px;
}

.clearFiltersButton {
    position: relative;
    padding: 0;
    margin-left: 20px;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 16px;
}

.circleIndicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #4facfe;
    transition: background-color 0.3s ease;
}

.left-button {
    /* Additional styling if needed */
}

.right-section {
    color: white;
}

/* Styling for the main content area */
.content {
    margin-top: 20px;
}
</style>
