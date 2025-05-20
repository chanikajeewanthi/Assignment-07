// import {customer_db, home_db, item_db} from "../db/db.js";
// import CustomerModel from "../model/CustomerModel.js";
//
// let selectedCustomerIndex = -1;
//
// function loadCustomers() {
//     $('#customer-tbody').empty();
//     customer_db.map((item, index) => {
//         let name = item.name;
//         let address = item.address;
//         let contactNumber = item.contactNumber;
//
//         let data = `<tr>
//                             <td>${index + 1}</td>
//                             <td>${name}</td>
//                             <td>${address}</td>
//                             <td>${contactNumber}</td>
//                         </tr>`
//
//         $('#customer-tbody').append(data);
//     })
// }
//
//
//
// $('#customer_save').on('click', function(){
//     let id = "1"
//     let name = $('#exampleInputName').val();
//     let address = $('#exampleInputCustomerAddress').val();
//     let contactNumber = $('#exampleInputContactNumber').val();
//     console.log(name,address,contactNumber)
//
//     if(name === '' || address === '' || contactNumber === '') {
//
//         Swal.fire({
//             title: 'Error!',
//             text: 'Invalid Inputs',
//             icon: 'error',
//             confirmButtonText: 'Ok'
//         })
//     } else {
//
//         let customer_data = new CustomerModel(id, name, address, contactNumber);
//
//         customer_db.push(customer_data);
//
//         console.log(customer_db);
//
//         loadCustomers();
//
//         $("#exampleInputName").val('');
//         $("#exampleInputCustomerAddress").val('');
//         $("#exampleInputContactNumber").val('');
//
//         Swal.fire({
//             title: "Added Successfully!",
//             icon: "success",
//             draggable: true
//         });
//     }
// });
//
// $("#customer-tbody").on('click', 'tr', function(){
//     selectedCustomerIndex = $(this).index();
//     console.log(selectedCustomerIndex);
//     let obj = customer_db[selectedCustomerIndex];
//     console.log(obj);
//
//     let name = obj.name;
//     let address = obj.address;
//     let contactNumber = obj.contactNumber;
//
//     $("#exampleInputName").val(name);
//     $("#exampleInputCustomerAddress").val(address);
//     $("#exampleInputContactNumber").val(contactNumber);
// });
//
//
// $('#customer_update').on('click', function () {
//     if (selectedCustomerIndex === -1) {
//         Swal.fire({
//             title: 'Error!',
//             text: 'No customer selected!',
//             icon: 'error',
//             confirmButtonText: 'Ok'
//         });
//         return;
//     }
//
//     let name = $('#exampleInputName').val();
//     let address = $('#exampleInputCustomerAddress').val();
//     let contactNumber = $('#exampleInputContactNumber').val();
//
//     if (name === '' || address === '' || contactNumber === '') {
//         Swal.fire({
//             title: 'Error!',
//             text: 'Invalid Inputs',
//             icon: 'error',
//             confirmButtonText: 'Ok'
//         });
//         return;
//     }
//
//     let existingCustomer = customer_db[selectedCustomerIndex];
//     let updatedCustomer = new CustomerModel(existingCustomer.id, name, address, contactNumber);
//
//     customer_db[selectedCustomerIndex] = updatedCustomer;
//
//
//     loadCustomers();
//     clearForm();
//
//     Swal.fire({
//         title: "Updated Successfully!",
//         icon: "success"
//     });
// });
//
// function clearForm() {
//     $('#exampleInputName').val('');
//     $('#exampleInputCustomerAddress').val('');
//     $('#exampleInputContactNumber').val('');
//     selectedCustomerIndex = -1;
// }
//
// // Delete Item
//
// $('#customer_delete').on('click', function () {
//     if (selectedCustomerIndex === -1) {
//         Swal.fire({
//             title: 'Error!',
//             text: 'No customer selected to delete!',
//             icon: 'error',
//             confirmButtonText: 'Ok'
//         });
//         return;
//     }
//
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "Do you want to delete this customer?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'Cancel'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             customer_db.splice(selectedCustomerIndex, 1);
//             loadCustomers();
//             clearForm();
//
//             Swal.fire({
//                 title: 'Deleted!',
//                 text: 'Customer has been deleted.',
//                 icon: 'success'
//             });
//         }
//     });
// });
//
// // Reset item
//
// $('#customer_reset').on('click', function () {
//     clearForm();
// });
//
//


import { customer_db } from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";
// After saving customer registration
import { addTempCustomer } from "./OrderController.js";


let selectedCustomerIndex = -1;

// Load customers
function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.forEach((item, index) => {
        $('#customer-tbody').append(`
            <tr data-index="${index}">
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.contactNumber}</td>
            </tr>
        `);
    });
}

// Clear form
function clearCustomerForm() {
    $('#exampleInputName, #exampleInputCustomerAddress, #exampleInputContactNumber').val('');
    $('.text-danger').text('');
    selectedCustomerIndex = -1;
}

// Validation function
function validateCustomerInputs() {
    let isValid = true;

    const name = $('#exampleInputName').val().trim();
    const address = $('#exampleInputCustomerAddress').val().trim();
    const contact = $('#exampleInputContactNumber').val().trim();

    if (name.length < 1) {
        $('#nameError').text('Name is required.');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        $('#nameError').text('Name can only contain letters and spaces.');
        isValid = false;
    } else {
        $('#customerNameError').text('');
    }

    if (address.length < 3) {
        $('#addressError').text('Address must be at least 3 characters.');
        isValid = false;
    } else {
        $('#addressError').text('');
    }

    if (!/^\d{10}$/.test(contact)) {
        $('#contactError').text('Contact number must be exactly 10 digits.');
        isValid = false;
    } else {
        $('#contactError').text('');
    }

    return isValid;
}

// Real-time validation
$('#exampleInputName, #exampleInputCustomerAddress, #exampleInputContactNumber').on('input', validateCustomerInputs);

// Save
$('#customer_save').on('click', function () {
    if (!validateCustomerInputs()) return;

    const id = "C" + (customer_db.length + 1).toString().padStart(3, '0');
    const name = $('#exampleInputName').val().trim();
    const address = $('#exampleInputCustomerAddress').val().trim();
    const contact = $('#exampleInputContactNumber').val().trim();

    const newCustomer = new CustomerModel(id, name, address, contact);
    customer_db.push(newCustomer);
    loadCustomers();
    clearCustomerForm();

    Swal.fire("Success", "Customer Added!", "success");
});

// Row click
$("#customer-tbody").on('click', 'tr', function () {
    selectedCustomerIndex = $(this).data('index');
    const customer = customer_db[selectedCustomerIndex];
    $('#exampleInputName').val(customer.name);
    $('#exampleInputCustomerAddress').val(customer.address);
    $('#exampleInputContactNumber').val(customer.contactNumber);
});

// Update
$('#customer_update').on('click', function () {
    if (selectedCustomerIndex < 0 || !validateCustomerInputs()) return;

    const existingCustomer = customer_db[selectedCustomerIndex];
    const name = $('#exampleInputName').val().trim();
    const address = $('#exampleInputCustomerAddress').val().trim();
    const contact = $('#exampleInputContactNumber').val().trim();

    customer_db[selectedCustomerIndex] = new CustomerModel(existingCustomer.id, name, address, contact);
    loadCustomers();
    clearCustomerForm();

    Swal.fire("Success", "Customer Updated!", "success");
});

// Delete
$('#customer_delete').on('click', function () {
    if (selectedCustomerIndex < 0) {
        Swal.fire("Error", "No customer selected to delete!", "error");
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            customer_db.splice(selectedCustomerIndex, 1);
            loadCustomers();
            clearCustomerForm();

            Swal.fire("Deleted!", "Customer has been deleted.", "success");
        }
    });
});

// Reset
$('#customer_reset').on('click', function () {
    clearCustomerForm();
});

loadCustomers();



