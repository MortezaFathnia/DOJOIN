export class OnlineOrdersReportModel {
    OrderId: number;
    Subtotal: number;
    Total: number;
    Tax: number;
    Type: number;
    PaymentMethod: string;
    Discount: number;
    DeliveryCharge: number;
    Address: string;
    CustomerName: string;
    Quantity: number;
    CreateOn: Date;
}
