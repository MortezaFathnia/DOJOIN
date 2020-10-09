export class RestaurantOrderTypeModel {
    orderTypeId: number;
    name: string;
    displayValue: string;
    color: string;

    constructor(data) {
        this.orderTypeId = data.OrderTypeId;
        this.name = data.Name;
        this.displayValue = data.DisplayValue;
        this.color = data.Color;
    }
}
