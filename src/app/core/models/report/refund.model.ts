export class Refund {
  orderId: number;
  businessId: string;
  clientNamespace: string;
  refundNote: string;

  constructor(model) {
    this.orderId = model.orderId;
    this.businessId = model.businessId;
    this.clientNamespace = model.clientNamespace;
    this.refundNote = model.refundNote;
  }
}
