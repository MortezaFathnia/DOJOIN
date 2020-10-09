export class RestaurantPaymentTypeModel {
    paymentTypeId: number;
    name: string;
    description: string;
    color: string;
    constructor(data) {
        this.paymentTypeId = data.PaymentTypeId;
        this.name = data.Name;
        this.description = data.Description;
        this.color = data.Color;
    }
}
