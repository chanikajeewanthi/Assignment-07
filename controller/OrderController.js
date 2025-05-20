// import { customer_db } from "../db/db.js";
// import { item_db } from "../db/db.js";
// import OrderModel from "../model/OrderModel.js";
//
// let selectedOrderItems = [];
// let currentOrder = null;
//
// // Load customers dropdown
// function loadCustomerDropdown() {
//     $('#customerSelect').empty().append('<option value="">Select Customer</option>');
//     customer_db.forEach(customer => {
//         $('#customerSelect').append(`<option value="${customer.id}">${customer.id}</option>`);
//     });
// }
//
// // Autofill customer details on selection
// $('#customerSelect').on('change', function () {
//     const customerId = $(this).val();
//     const customer = customer_db.find(c => c.id === customerId);
//
//     if (customer) {
//         $('#customerName').val(customer.name);
//         $('#customerAddress').val(customer.address);
//         $('#customerContact').val(customer.contactNumber);
//     } else {
//         $('#customerName, #customerAddress, #customerContact').val('');
//     }
// });
//
// // Load items dropdown
// function loadItemDropdown() {
//     $('#itemSelect').empty().append('<option value="">Select Item</option>');
//     item_db.forEach(item => {
//         $('#itemSelect').append(`<option value="${item.code}">${item.code}</option>`);
//     });
// }
//
// // Autofill item details on selection
// $('#itemSelect').on('change', function () {
//     const itemCode = $(this).val();
//     const item = item_db.find(i => i.code === itemCode);
//
//     if (item) {
//         $('#itemCode').val(item.code);
//         $('#itemName').val(item.itemName);
//         $('#itemPrice').val(item.price);
//         $('#itemQOH').val(item.quantity);
//     } else {
//         $('#itemCode, #itemName, #itemPrice, #itemQOH').val('');
//     }
// });
//
// // Add item to order
// $('#addItemBtn').on('click', function () {
//     const itemCode = $('#itemCode').val();
//     const qty = parseInt($('#orderQty').val());
//
//     if (!itemCode) {
//         alert('Please select an item');
//         return;
//     }
//
//     if (!qty || qty <= 0) {
//         alert('Please enter a valid quantity');
//         return;
//     }
//
//     const item = item_db.find(i => i.code === itemCode);
//
//     if (!item) {
//         alert('Item not found');
//         return;
//     }
//
//     if (qty > item.quantity) {
//         alert('Insufficient quantity on hand');
//         return;
//     }
//
//     // Check if item already added
//     const existingItem = selectedOrderItems.find(i => i.code === itemCode);
//     if (existingItem) {
//         existingItem.orderQty += qty;
//         existingItem.totalPrice = existingItem.orderQty * existingItem.price;
//     } else {
//         selectedOrderItems.push({
//             code: item.code,
//             name: item.itemName,
//             price: Number(item.price),
//             orderQty: qty,
//             totalPrice: qty * item.price,
//         });
//     }
//
//     renderOrderItems();
//     clearItemForm();
// });
//
// // Render order items table
// function renderOrderItems() {
//     $('#orderItemsTbody').empty();
//     let subTotal = 0;
//     selectedOrderItems.forEach((item, index) => {
//         $('#orderItemsTbody').append(`
//             <tr data-index="${index}">
//                 <td>${item.code}</td>
//                 <td>${item.name}</td>
//                 <td>${item.price.toFixed(2)}</td>
//                 <td>${item.orderQty}</td>
//                 <td>${item.totalPrice.toFixed(2)}</td>
//                 <td><button class="removeItemBtn btn btn-danger btn-sm">Remove</button></td>
//             </tr>
//         `);
//         subTotal += item.totalPrice;
//     });
//     $('#subTotal').text(`Rs ${subTotal.toFixed(2)}`);
// }
//
// // Remove item from order
// $('#orderItemsTbody').on('click', '.removeItemBtn', function () {
//     const index = $(this).closest('tr').data('index');
//     selectedOrderItems.splice(index, 1);
//     renderOrderItems();
// });
//
// // Clear item input form
// function clearItemForm() {
//     $('#itemSelect, #itemCode, #itemName, #itemPrice, #itemQOH, #orderQty').val('');
// }
//
// // Create new order on button click
// $('#createOrderBtn').on('click', function () {
//     const orderId = $('#orderId').val().trim();
//     const orderDate = $('#orderDate').val();
//     const customerId = $('#customerSelect').val();
//     const customer = customer_db.find(c => c.id === customerId);
//
//     if (!orderId || !orderDate || !customer || selectedOrderItems.length === 0) {
//         alert('Please fill all order details and add at least one item');
//         return;
//     }
//
//     const order = new OrderModel(
//         orderId,
//         orderDate,
//         customer.id,
//         customer.name,
//         customer.address,
//         customer.contactNumber,
//         selectedOrderItems
//     );
//
//     // Here you can handle saving the order to your db or localstorage
//     console.log('Order created:', order);
//
//     alert('Order created successfully!');
//     clearOrderForm();
// });
//
// // Clear all order form inputs
// function clearOrderForm() {
//     $('#orderId, #orderDate, #customerSelect, #customerName, #customerAddress, #customerContact').val('');
//     selectedOrderItems = [];
//     renderOrderItems();
//     clearItemForm();
// }
//
// // Initial load
// loadCustomerDropdown();
// loadItemDropdown();
// renderOrderItems();
// This array will hold temporary customers added during this session

// controller/OrderController.js



//
// let tempCustomers = [];
//
// export function addTempCustomer(customer) {
//     tempCustomers.push(customer);
//     populateCustomerDropdown();
// }
//
// export function getAllTempCustomers() {
//     return [...tempCustomers];
// }
//
// export function populateCustomerDropdown() {
//     const dropdown = document.getElementById("customerSelect");
//     if (!dropdown) return;
//
//     dropdown.innerHTML = '<option value="">-- Select Customer ID --</option>';
//     tempCustomers.forEach(customer => {
//         const option = document.createElement("option");
//         option.value = customer.id;
//         option.textContent = customer.id;
//         dropdown.appendChild(option);
//     });
// }
//
// export function handleCustomerSelection() {
//     const dropdown = document.getElementById("customerSelect");
//     if (!dropdown) return;
//
//     dropdown.addEventListener("change", () => {
//         const selectedId = dropdown.value;
//         const customer = tempCustomers.find(c => c.id === selectedId);
//
//         document.getElementById("exampleInputCustomerName").value = customer?.name || "";
//         document.getElementById("exampleInputAddress").value = customer?.address || "";
//         document.getElementById("exampleInputPhone").value = customer?.contactNumber || "";
//     });
// }



let tempCustomers = [];

export function addTempCustomer(customer) {
    tempCustomers.push(customer);
    populateCustomerDropdown();
}

export function getAllTempCustomers() {
    return [...tempCustomers];
}

export function populateCustomerDropdown() {
    const dropdown = document.getElementById("customerSelect");
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">-- Select Customer ID --</option>';
    tempCustomers.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        dropdown.appendChild(option);
    });
}

export function handleCustomerSelection() {
    const dropdown = document.getElementById("customerSelect");
    if (!dropdown) return;

    dropdown.addEventListener("change", () => {
        const selectedId = dropdown.value;
        const customer = tempCustomers.find(c => c.id === selectedId);

        document.getElementById("exampleInputCustomerName").value = customer?.name || "";
        document.getElementById("exampleInputAddress").value = customer?.address || "";
        document.getElementById("exampleInputPhone").value = customer?.contactNumber || "";
    });
}

// ✅ Attach event listener immediately on load
handleCustomerSelection();
