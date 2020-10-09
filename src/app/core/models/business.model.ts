import { RestaurantModel } from './report/restaurant.model';

export class BusinessModel {
    id: string;
    name: string;
    restaurant: RestaurantModel;
    locationName: string;

    constructor(data) {
        this.id = data.BusinessId;
        this.name = data.BusinessName;
        this.locationName = data.Location ? data.Location : data.BusinessName;
        this.restaurant = new RestaurantModel(data.Restaurant);
    }
}
