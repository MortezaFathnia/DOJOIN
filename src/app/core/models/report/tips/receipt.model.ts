import {Tip} from './tip.model';

export class Receipt {
  OrderTypeId: number;
  OrderTypeName: string;
  Tips: Tip[];
  TotalTip: number;
  TotalAmount: number;
}
