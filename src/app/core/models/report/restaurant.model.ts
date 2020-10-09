import { RestaurantUserModel } from './restaurant-user.model';
import { RestaurantOrderTypeModel } from './restaurant-order-type.model';
import { RestaurantPaymentTypeModel } from './restaurant-payment-type.model';
import { WorkingDayModel } from './working-day.model';

export class RestaurantModel {
    id: number;
    name: string;
    address: string;
    managerName: string;
    users: RestaurantUserModel[] = [];
    orderTypes: RestaurantOrderTypeModel[] = [];
    paymentTypes: RestaurantPaymentTypeModel[] = [];
    currentWorkingDay: WorkingDayModel;

    constructor(data) {
        this.id = data.RestaurantId;
        this.name = data.Name;
        this.address = data.Address;
        this.managerName = data.ManagerName;
        this.users = data.Users.map(u => new RestaurantUserModel(u));
        this.orderTypes = data.OrderTypes.map(t => new RestaurantOrderTypeModel(t));
        this.paymentTypes = data.PaymentTypes.map(t => new RestaurantPaymentTypeModel(t));
        this.currentWorkingDay = new WorkingDayModel(data.CurrentWorkingDay, false);
    }
}
