
//
// import { item_db } from "../db/db.js";
// import ItemModel from "../model/ItemModel.js";
//
// function loadItems() {
//     $('#item-tbody').empty();
//     item_db.forEach((item, index) => {
//         $('#item-tbody').append(`
//             <tr data-index="${index}">
//                 <td>${item.code}</td>
//                 <td>${item.itemName}</td>
//                 <td>${item.price}</td>
//                 <td>${item.quantity}</td>
//             </tr>
//         `);
//     });
// }
//
// function clearForm() {
//     $('#exampleInputCode, #exampleInputItemName, #exampleInputItemPrice, #exampleInputItemQuantity').val('');
//     $('.text-danger').text('');
// }
//
// function validateInputs() {
//     let isValid = true;
//
//     const code = $('#exampleInputCode').val().trim();
//     const name = $('#exampleInputItemName').val().trim();
//     const price = $('#exampleInputItemPrice').val().trim();
//     const quantity = $('#exampleInputItemQuantity').val().trim();
//
//     if (!/^I\d{3}$/.test(code)) {
//         $('#codeError').text('Code must follow format I001');
//         isValid = false;
//     } else {
//         $('#codeError').text('');
//     }
//
//     if (name.length < 1) {
//         $('#nameError').text('Name must be at least 1 character');
//         isValid = false;
//     } else if (!/^[A-Za-z\s]+$/.test(name)) {
//         $('#nameError').text('Name cannot contain numbers or special characters');
//         isValid = false;
//     } else {
//         $('#nameError').text('');
//     }
//
//
//     if (!/^\d+(\.\d{1,2})?$/.test(price)) {
//         $('#priceError').text('Price must be a valid number (e.g., 12.99)');
//         isValid = false;
//     } else {
//         $('#priceError').text('');
//     }
//
//
//     if (isNaN(quantity) || Number(quantity) < 0) {
//         $('#quantityError').text('Quantity must be 0 or more');
//         isValid = false;
//     } else {
//         $('#quantityError').text('');
//     }
//
//     return isValid;
// }
//
// // Save
// $('#item_save').on('click', function () {
//     if (!validateInputs()) return;
//
//     const code = $('#exampleInputCode').val().trim();
//     const name = $('#exampleInputItemName').val().trim();
//     const price = $('#exampleInputItemPrice').val().trim();
//     const quantity = $('#exampleInputItemQuantity').val().trim();
//
//     const newItem = new ItemModel(code, name, price, quantity);
//     item_db.push(newItem);
//     loadItems();
//     clearForm();
//
//     Swal.fire("Success", "Item Added!", "success");
// });
//
// // Row Click
// let selectedIndex = -1;
// $("#item-tbody").on('click', 'tr', function () {
//     selectedIndex = $(this).data('index');
//     const item = item_db[selectedIndex];
//     $('#exampleInputCode').val(item.code);
//     $('#exampleInputItemName').val(item.itemName);
//     $('#exampleInputItemPrice').val(item.price);
//     $('#exampleInputItemQuantity').val(item.quantity);
// });
//
// // Update
// $('#item_update').on('click', function () {
//     if (selectedIndex < 0 || !validateInputs()) return;
//
//     const code = $('#exampleInputCode').val().trim();
//     const name = $('#exampleInputItemName').val().trim();
//     const price = $('#exampleInputItemPrice').val().trim();
//     const quantity = $('#exampleInputItemQuantity').val().trim();
//
//     item_db[selectedIndex] = new ItemModel(code, name, price, quantity);
//     loadItems();
//     clearForm();
//
//     Swal.fire("Success", "Item Updated!", "success");
// });
//
// // Delete
// $('#item_delete').on('click', function () {
//     if (selectedIndex < 0) return;
//
//     item_db.splice(selectedIndex, 1);
//     loadItems();
//     clearForm();
//     selectedIndex = -1;
//
//     // Swal.fire("Deleted", "Item Deleted", "success");
//
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "Do you want to delete this item?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'Cancel'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             item_db.splice(selectedItemIndex, 1);
//             loadItems();
//             clearForm();
//
//             Swal.fire({
//                 title: 'Deleted!',
//                 text: 'Item has been deleted.',
//                 icon: 'success'
//             });
//             // Swal.fire("Deleted", "Item Deleted", "success");
//
//         }
//     });
// });
//
//
// // Real-time validation
// $('#exampleInputCode, #exampleInputItemName, #exampleInputItemPrice, #exampleInputItemQuantity').on('input', validateInputs);
//
// // Initial load
// loadItems();
//
// $('#item_reset').on('click', function () {
//     clearForm();
// });
//
//


import { item_db } from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

function loadItems() {
    $('#item-tbody').empty();
    item_db.forEach((item, index) => {
        $('#item-tbody').append(`
            <tr data-index="${index}">
                <td>${item.code}</td>
                <td>${item.itemName}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
            </tr>
        `);
    });
}

function clearForm() {
    $('#exampleInputCode, #exampleInputItemName, #exampleInputItemPrice, #exampleInputItemQuantity').val('');
    $('.text-danger').text('');
    selectedIndex = -1;
}

function validateInputs() {
    let isValid = true;

    const code = $('#exampleInputCode').val().trim();
    const name = $('#exampleInputItemName').val().trim();
    const price = $('#exampleInputItemPrice').val().trim();
    const quantity = $('#exampleInputItemQuantity').val().trim();

    if (!/^I\d{3}$/.test(code)) {
        $('#codeError').text('Code must follow format I001');
        isValid = false;
    } else {
        $('#codeError').text('');
    }

    if (name.length < 1) {
        $('#nameError').text('Name must be at least 1 character');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        $('#nameError').text('Name cannot contain numbers or special characters');
        isValid = false;
    } else {
        $('#nameError').text('');
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        $('#priceError').text('Price must be a valid number (e.g., 12.99)');
        isValid = false;
    } else {
        $('#priceError').text('');
    }

    if (isNaN(quantity) || Number(quantity) < 0) {
        $('#quantityError').text('Quantity must be 0 or more');
        isValid = false;
    } else {
        $('#quantityError').text('');
    }

    return isValid;
}

// Save with Duplicate Check
$('#item_save').on('click', function () {
    if (!validateInputs()) return;

    const code = $('#exampleInputCode').val().trim();
    const name = $('#exampleInputItemName').val().trim();
    const price = $('#exampleInputItemPrice').val().trim();
    const quantity = $('#exampleInputItemQuantity').val().trim();

    const duplicate = item_db.find(item => item.code === code);
    if (duplicate) {
        Swal.fire("Duplicate", "Item with this code already exists!", "warning");
        return;
    }

    const newItem = new ItemModel(code, name, price, quantity);
    item_db.push(newItem);
    loadItems();
    clearForm();

    Swal.fire("Success", "Item Added!", "success");
});

// Row Click
let selectedIndex = -1;
$("#item-tbody").on('click', 'tr', function () {
    selectedIndex = $(this).data('index');
    const item = item_db[selectedIndex];
    $('#exampleInputCode').val(item.code);
    $('#exampleInputItemName').val(item.itemName);
    $('#exampleInputItemPrice').val(item.price);
    $('#exampleInputItemQuantity').val(item.quantity);
});

// Update
$('#item_update').on('click', function () {
    if (selectedIndex < 0 || !validateInputs()) return;

    const code = $('#exampleInputCode').val().trim();
    const name = $('#exampleInputItemName').val().trim();
    const price = $('#exampleInputItemPrice').val().trim();
    const quantity = $('#exampleInputItemQuantity').val().trim();

    // Prevent changing to an existing code of another item
    const existingIndex = item_db.findIndex(item => item.code === code);
    if (existingIndex !== -1 && existingIndex !== selectedIndex) {
        Swal.fire("Duplicate", "Another item already has this code!", "warning");
        return;
    }

    item_db[selectedIndex] = new ItemModel(code, name, price, quantity);
    loadItems();
    clearForm();

    Swal.fire("Success", "Item Updated!", "success");
});

// Delete
$('#item_delete').on('click', function () {
    if (selectedIndex < 0) return;

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            item_db.splice(selectedIndex, 1);
            loadItems();
            clearForm();

            Swal.fire("Deleted!", "Item has been deleted.", "success");
        }
    });
});

// Real-time validation
$('#exampleInputCode, #exampleInputItemName, #exampleInputItemPrice, #exampleInputItemQuantity').on('input', validateInputs);

// Initial load
loadItems();

// Reset
$('#item_reset').on('click', function () {
    clearForm();
});
