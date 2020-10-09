import {OrderDetails} from './order-details';

export class OrderSeats {

  Guid: string;
  Status: number;
  SeatId: number;
  AvatarId: number;
  GenderId: number;
  Name: string|null;
  TotalPrice: number;
  OrderSeatId: number;
  CartOrderId: number;
  DiningTable: string|null;
  Description: string|null;
  DiningTableId: number|null;
  OrderDetails: OrderDetails[];
}

