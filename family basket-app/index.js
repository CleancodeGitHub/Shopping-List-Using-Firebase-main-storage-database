// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://basket-1596d-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

// Add click event listener to the button
addButtonEl.addEventListener("click", addItemToShoppingList);

// Function to add item to shopping list
function addItemToShoppingList() {
    // Get input value
    let inputValue = inputFieldEl.value.trim();

    if (inputValue !== "") {
        // Push item to Firebase database
        push(shoppingListInDB, inputValue)
            .then(() => {
                // Clear input field
                inputFieldEl.value = "";
                // Add item to the shopping list
                appendItemToList(inputValue);
            })
            .catch(error => {
                console.error("Error adding item to database: ", error);
            });
    } else {
        // Alert user for empty input
        alert("Please enter an item.");
    }
}

// Function to append item to the shopping list
function appendItemToList(item) {
    // Create list item element
    const listItem = document.createElement("li");
    listItem.textContent = item;
    // Append list item to shopping list
    shoppingListEl.appendChild(listItem);
}
