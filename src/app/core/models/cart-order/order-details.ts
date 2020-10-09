import {Discounts} from './discounts';

export class OrderDetails {

  Status: number;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
  Notes: string|null;
  MenuItemName: string;
  OrderDetailId: number;
  Discounts: Discounts[];
  OrderAnswerHierarchies: [];
  TotalDiscountsPrice: number;

  constructor( model: OrderDetails) {
      this.Discounts = model.Discounts;
  }
}
