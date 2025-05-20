// import { populateCustomerDropdown, handleCustomerSelection, addTempCustomer } from "./controller/OrderController.js";
//
// document.addEventListener("DOMContentLoaded", () => {
//     // Setup dropdown and selection handling
//     populateCustomerDropdown();
//     handleCustomerSelection();
//
//     // Hook up Save Customer button
//     document.getElementById("saveCustomerBtn").addEventListener("click", () => {
//         const id = document.getElementById("customerId").value;
//         const name = document.getElementById("customerNameInput").value;
//         const address = document.getElementById("customerAddressInput").value;
//         const contact = document.getElementById("customerContactInput").value;
//
//         if (id && name && address && contact) {
//             addTempCustomer(id, name, address, contact);
//
//             // Optional: clear the form after save
//             document.getElementById("customerId").value = "";
//             document.getElementById("customerNameInput").value = "";
//             document.getElementById("customerAddressInput").value = "";
//             document.getElementById("customerContactInput").value = "";
//         } else {
//             alert("Please fill in all customer fields.");
//         }
//     });
// });


// main.js
import { populateCustomerDropdown, handleCustomerSelection } from "./controller/OrderController.js";

document.addEventListener("DOMContentLoaded", () => {
    populateCustomerDropdown();    // To fill the dropdown
    handleCustomerSelection();     // To enable auto-fill
});
