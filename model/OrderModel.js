export class OrderModel {
    constructor(orderId, date, id, name, address, contactNumber) {
        this.orderId = orderId;
        this.date = date;
        this.customerId = id;
        this.customerName = name;
        this.address = address;
        this.contactNumber = contactNumber;
    }
}
