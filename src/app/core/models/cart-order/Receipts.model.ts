import {ReceiptPayments} from './ReceiptPayments';

export class ReceiptsModel {
  Tip: number;
  Guid: string;
  Paid: number;
  Status: number;
  MevRefId: number;
  TaxPrice: number;
  ReceiptId: number;
  TotalPrice: number;
  Notes: string|null;
  DeliveryTax: number;
  CartOrderId: number;
  MevRef: string|null;
  OutStanding: number;
  SubTotalPrice: number;
  DeliveryCharge: number;
  LastModifiedOn: string;
  ViewOrder: string|null;
  RefundUserId: number|null;
  OrderSeatGuid: string|null;
  TotalDiscountsPrice: number;
  ReceiptPayments: ReceiptPayments[];
  PaymentTerminalResponse: string|null;
}
