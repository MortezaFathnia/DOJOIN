import { Payment } from "./payment";
import { TaxDetail } from "./tax-detail";

export class Order {
  Tax: number;
  Tip: number;
  Type: string;
  Total: number;
  Address: string;
  Coupon: number;
  OrderId: number;
  Discount: number;
  CreateOn: string;
  Subtotal: number;
  Location: string;
  training: boolean;
  VoidNotes?: string;
  Payments: Payment[];
  DeliveryTax: number;
  TotalRefund: number;
  CustomerTel: string;
  VoidUserName: string;
  CustomerName: string;
  AppliedCoupon: number;
  PaymentMethods: string;
  DeliveryCharge: number;
  TaxDetails: TaxDetail[];
}
