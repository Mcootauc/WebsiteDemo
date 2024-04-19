<template>
    <div class="app-container">
        <!-- Header Section -->
        <div class="top-bar">
            <div class="house-with-circle-and-square">
                <div id="square"></div>
                <div id="house-circle"></div>
                <div class="house">
                    <h1 id="house-name">Java</h1>
                    <h2 id="house-description">Smokey Mountains</h2>
                </div>
            </div>
            <h1 id="view-listing">View Listing</h1>
            <span class="middle-buttons">
                <h1>Overview</h1>
                <h1>Bookings</h1>
                <h1 id="work-orders">Work Orders</h1>
            </span>
            <div class="house-with-circle-and-square">
                <div id="notification-circle"></div>
                <div id="user-circle"></div>
                <div class="right-section">
                    <button v-if="!user" @click="signIn">Sign In</button>
                    <div v-else>{{ user.displayName }} &nbsp;</div>
                </div>
            </div>
        </div>
        <!-- Mid Bar for Buttons -->
        <div class="bar-background border-b dark:border-gray-700">
            <div class="mid-bar">
                <button @click="toggleWriting" id="left-button">
                    {{ writing ? 'Go to Home' : 'Create Form' }}
                </button>
                <button id="right-button" v-if="user" @click="signOutUser">
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
                    <div class="selected-and-all">
                        <button id="selected-property">
                            Selected Property
                        </button>
                        <h1 id="all-properties">All Properties</h1>
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
            <h1 class="clear-filters-button">
                <span id="circle-indicator"></span>
                Clear all filters
            </h1>
        </div>
        <!-- Main Content: Form or Home Component -->
        <div v-if="user" class="signed-in">
            <Form
                v-if="writing"
                :writing="writing"
                @changeView="writing = false"
            ></Form>
            <Home v-else />
        </div>
        <div v-else class="signed-out">
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

const writing = ref(false); // ref to toggle between Home and Form components
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
.app-container {
    height: 100vh;
    min-width: 800px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: black;
}

.house-with-circle-and-square {
    display: flex;
    align-items: center;
}
#square {
    width: 30px;
    height: 30px;
    background-color: white;
    margin-right: 30px;
    margin-left: 20px;
}
#house-circle {
    width: 40px;
    height: 40px;
    background-color: #be9054;
    border-radius: 50%;
    margin-right: 10px;
}
.house {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#house-name {
    color: white;
    font-size: 1rem;
}
#house-description {
    color: gray;
    font-size: 0.85rem;
}

#view-listing {
    color: white;
    background-color: #1b1e27;
    padding: 0 10px 0 10px;
}

.middle-buttons {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0 15px 0 15px;
}
#work-orders {
    position: relative;
    background-color: transparent;
    color: #4e87c4;
    border: none;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 10px 0;
    transition: all 0.3s ease;
}
#work-orders::after {
    content: ''; /* Required for pseudo-elements */
    position: absolute;
    bottom: 0; /* Align to the bottom of the button */
    left: 0; /* Start from the left edge of the button */
    width: 100%;
    height: 2px;
    background-color: #4facfe;
}

#notification-circle {
    width: 35px;
    height: 35px;
    background-color: #21252c;
    border-radius: 50%;
    margin-right: 20px;
}

#user-circle {
    width: 40px;
    height: 40px;
    background-color: #2c839c;
    border-radius: 50%;
    margin-right: 10px;
}

.right-section {
    color: white;
}

.bar-background {
    background-color: #f9fafc;
    padding-bottom: 20px;
    padding-top: 10px;
}

.mid-bar,
.bottom-bar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 20px;
}
.bottom-bar input {
    width: 100%;
    max-width: 400px;
    padding: 12px;
    margin: 0 auto 10px;
}
#left-button,
#right-button {
    background-color: rgb(197, 151, 90);
    color: black;
    padding: 7px 15px;
    border-radius: 20px;
    cursor: pointer;
}

.properties {
    display: flex;
    gap: 10px;
    cursor: pointer;
}
.selected-and-all {
    display: flex;
    flex-direction: row;
    gap: 20px;
    border: 1px solid #ccd0d0;
    padding: 2px 4px;
    border-radius: 20px;
}
#selected-property {
    background-color: #3082ed;
    padding: 2px 2px;
    color: white;
    border-radius: 20px;
}
#all-properties {
    color: #a9afb1;
}

.clear-filters-button {
    position: relative;
    padding: 0;
    margin-left: 20px;
    border: none;
    color: #a9afb1;
    cursor: pointer;
    font-size: 16px;
}
#circle-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #a9afb1;
    transition: background-color 0.3s ease;
}

.signed-in {
    margin: 0;
    padding: 0;
}
.signed-out {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 100%;
    margin-top: px;
    font-size: 1.5rem;
}

@media (min-width: 800px) {
    .house-with-circle-and-square {
        justify-content: start;
    }
    .bar-background {
        padding: 10px 8px;
    }
}

@media (min-width: 650px) {
    .mid-bar,
    .bottom-bar {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .bottom-bar input {
        width: auto;
        flex-grow: 1;
    }
}
</style>
