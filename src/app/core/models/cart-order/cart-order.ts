import { User } from './User';
import { OrderType } from './OrderType';
import { OrderSeats } from './OrderSeats';
import { OrderDetails } from './order-details';
import { ReceiptsModel } from './Receipts.model';
import { TaxDetails } from './TaxDetails';

export class CartOrder {

  User?: User | {};
  Rdf: number;
  Tip: number;
  TotalPrice: number;
  Notes: string | null;
  DeliveryTax: number;
  CartOrderId: number;
  OrderTypeId: number;
  TotalRefund: number;
  SerialNumber: number;
  RestaurantId: number;
  OrderType: OrderType;
  AppliedCoupon: number;
  SubmittedTime: string;
  CustomerAddressDetail: string;
  CustomerAddressPostalCode: string;
  CustomerName: string;
  CustomerTel: string;
  SubTotalPrice: number;
  DeliveryCharge: number;
  VoidNotes: string | null;
  TaxDetails: TaxDetails[] | null;
  OrderSeats: OrderSeats[] | null;
  LocalSerialNumber: string;
  Receipts: ReceiptsModel[] | null;
  ScheduledTime: string | null;
  TotalDiscountsPrice: number;
  OnlineOrderCode: number | null;
  PreparationNote: string | null;
  SpecialInstruction: string | null;
  OrderDetails: OrderDetails[] | null;
  BusinessId: string | null;
  ProductType: number;
  PaidAt: number;
  PaymentMethods: string | null;

  constructor(model: CartOrder) {
    this.CartOrderId = model.CartOrderId;
    this.Notes = model.Notes;
  }
}
