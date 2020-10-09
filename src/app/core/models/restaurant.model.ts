import { RestaurantUser } from './restaurant-user.model';
import { RestaurantOrderType } from './restaurant-order-type.model';
import { WorkingDay } from './wordking-day.model';
import {RestaurantPaymentType} from './restaurant-payment-type.model';


export class Restaurant {
  id: number;
  name: string;
  address: string;
  managerName: string;
  users: RestaurantUser[] = [];
  orderTypes: RestaurantOrderType[] = [];
  paymentTypes: RestaurantPaymentType[] = [];
  currentWorkingDay: WorkingDay;

  constructor(data) {
    this.id = data.RestaurantId;
    this.name = data.Name;
    this.address = data.Address;
    this.managerName = data.ManagerName;
    this.users = data.Users.map(u => new RestaurantUser(u));
    this.orderTypes = data.OrderTypes.map(t => new RestaurantOrderType(t));
    this.paymentTypes = data.PaymentTypes.map(t => new RestaurantPaymentType(t));
    this.currentWorkingDay = new WorkingDay(data.CurrentWorkingDay, false);
  }
}
