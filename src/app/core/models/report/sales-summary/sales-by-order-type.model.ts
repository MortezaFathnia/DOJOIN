import { TaxDetail } from '../../order/tax-detail';

export class SalesByOrderTypeModel {
    OrderTypeId: number;
    OrderTypeName: string;
    OrdersCount: number;
    SubTotal: number;
    Discount: number;
    DeliveryCharge: number;
    Tax: number;
    TotalPrice: number;
    DeliveryTax: number;
    AppliedCoupon: number;
    Tip: number;
    TaxDetails: TaxDetail[];
    TotalRefund: number;
}
