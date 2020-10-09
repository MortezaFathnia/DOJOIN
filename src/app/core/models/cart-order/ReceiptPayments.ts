export class ReceiptPayments {
  Tip: number;
  Guid: string;
  Amount: number;
  Status: number;
  ReceiptId: number;
  PaymentTypeId: number;
  LastModifiedOn: string;
  ReceiptPaymentId: number;
  CashDrawerId: number|null;
  PaymentTerminalResponse: string|null;
}
