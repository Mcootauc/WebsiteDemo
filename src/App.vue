<template>
    <div class="app-container">
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
        <div class="barBackgound border-b dark:border-gray-700">
            <div class="mid-bar">
                <button @click="toggleWriting" class="left-button">
                    {{ writing ? 'Go to Home' : 'Create Form' }}
                </button>
                <button class="right-button" v-if="user" @click="signOutUser">
                    Sign Out
                </button>
            </div>
            <!-- Bottom Bar for Inputs -->
            <div class="bottom-bar">
                <input
                    type="text"
                    placeholder="Search by work order # or category..."
                    class="px-9 py-3 border rounded"
                />
                <div class="properties">
                    <div id="selectedAndAll">
                        <button id="selectedProperty">Selected Property</button>
                        <h1 id="allProperties">All Properties</h1>
                    </div>
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
        </div>
        <!-- Main Content: Form or Home Component -->
        <div v-if="user" class="signedIn">
            <Form
                v-if="writing"
                :writing="writing"
                @changeView="writing = false"
            />
            <Home v-else />
        </div>
        <div v-else class="signedOut">
            <h1>Please sign in to view the content!</h1>
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
.barBackgound {
    background-color: #f9fafc;
    padding-bottom: 20px;
    padding-top: 10px;
}
.left-button {
    background-color: rgb(197, 151, 90);
    color: black;
    padding: 7px 20px;
    border-radius: 20px;
    cursor: pointer;
}
.right-button {
    background-color: rgb(197, 151, 90);
    color: black;
    padding: 7px 20px;
    border-radius: 20px;
    cursor: pointer;
}
#selectedProperty {
    background-color: #3082ed;
    padding: 2px 2px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
}
#allProperties {
    color: #a9afb1;
}
#selectedAndAll {
    display: flex;
    flex-direction: row;
    gap: 20px;
    border: 1px solid #ccd0d0;
    padding: 2px 4px;
    border-radius: 20px;
    cursor: pointer;
}

/* General styles that apply at any size */
.app-container {
    height: 100vh;
    min-width: 320px; /* Ensures the app never gets narrower than 320px */
}

/* Styles specific for screens wider than 320px */
@media (min-width: 321px) {
    .app-container {
        /* Additional styles for larger screens can go here */
    }
}

/* Styles for screens wider than 768px (typical tablet breakpoint) */
@media (min-width: 768px) {
    .app-container {
        /* Styles for larger devices like tablets and desktops */
    }
}

/* General button styling */

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
    background-color: #be9054; /* Circle color */
    border-radius: 50%; /* Makes the div a circle */
    margin-right: 10px; /* Space between the circle and the text */
}

.notificationCircle {
    width: 35px; /* Circle size */
    height: 35px; /* Circle size */
    background-color: #21252c; /* Circle color */
    border-radius: 50%; /* Makes the div a circle */
    margin-right: 20px; /* Space between the circle and the text */
}

.userCircle {
    width: 40px; /* Circle size */
    height: 40px; /* Circle size */
    background-color: #2c839c; /* Circle color */
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
    background-color: #1b1e27;
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
    color: #4e87c4;
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
    color: #a9afb1;
    cursor: pointer;
    font-size: 16px;
}

.circleIndicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #a9afb1;
    transition: background-color 0.3s ease;
}

.left-button {
    /* Additional styling if needed */
}

.right-section {
    color: white;
}

/* Styling for the main content area */
.signedIn {
    margin: 0;
    padding: 0;
}

.signedOut {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 100%;
    margin-top: 20px;
    font-size: 1.5rem;
}
</style>
