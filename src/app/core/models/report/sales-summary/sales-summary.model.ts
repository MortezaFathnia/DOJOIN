import { SalesByPaymentTypeModel } from './sales-by-payment-type.model';
import { SalesByOrderTypeModel } from './sales-by-order-type.model';


export class SalesSummary {
    Recieved: SalesByPaymentTypeModel[];
    Sales: SalesByOrderTypeModel[];

    constructor(model: SalesSummary) {
        this.Recieved = model.Recieved;
        this.Sales = model.Sales;

    }
}
