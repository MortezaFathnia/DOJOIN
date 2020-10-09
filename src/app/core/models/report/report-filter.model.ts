import { RestaurantPaymentTypeModel } from './restaurant-payment-type.model';
import { ProductType } from '../helpers.model';

export class ReportFilterModel {
  reportDefinition: string;
  companyId: string;
  restaurantIds: number[] = [];
  userIds: number[] = [];
  from: string;
  to: string;
  dateType: any = 0;
  productTypes: ProductType[] = [];
  paymentMethods: RestaurantPaymentTypeModel[] = [];
  orderId: number;
  status = [];
  isTraining = false;
  hasVoidedItem = false;
  onlyCustomDateRange?: boolean;
  productFilterVisible?: boolean;

  constructor(data = undefined) {
    if (data) {
      this.reportDefinition = data.reportDefinition;
      this.companyId = data.companyId;
      this.restaurantIds = data.restaurantIds;
      this.from = data.from;
      this.to = data.to;
      this.dateType = data.dateType ? data.dateType : 0;
      this.productTypes = data.productTypes;
      this.onlyCustomDateRange = data.costumDateRange;
      this.productFilterVisible = data.productFilterVisible;

      if (data.orderId) {
        this.orderId = data.orderId;
      }
      if (data.status) {
        this.status = data.status;
      }
      if (data.userIds) {
        this.userIds = data.userIds;
      }
      if (data.paymentMethods) {
        this.paymentMethods = data.paymentMethods;
      }
    }
  }

  private convertDate(input: string): string {
    if (input && input.toString().toLowerCase().endsWith('z')) {
      input = input.substring(0, input.length - 5);
    }

    return input;
  }

  getQueryParams() {
    const params = [
      `companyId=${this.companyId}`,
      this.orderId ? `orderId=${this.orderId}` : '',
      this.isTraining ? `isTraining=${this.isTraining}` : '',
      this.hasVoidedItem ? `hasVoidedItem=${this.hasVoidedItem}` : '',
      this.from ? `from=${this.convertDate(this.from)}` : '',
      this.to ? `to=${this.convertDate(this.to)}` : ''
    ];

    let restaurantId = [];

    this.productTypes.forEach(b => params.push(`productType=${b}`));

    if (this.status) {
      this.status.forEach(a => params.push(`status=${a}`));
    }

    this.restaurantIds.forEach(b => restaurantId.push(`${b}`));

    params.push(`restaurantIds=${restaurantId.join(';')}`);

    if (this.needUserFilter()) {
      this.userIds.forEach(b => params.push('userId=' + b));
    }

    return `?${params.filter(Boolean).join('&')}`;
  }

  needUserFilter() {
    switch (this.reportDefinition) {
      case 'TipsReport':
      case 'PayinPayoutReport':
      case 'EmployeeHoursReport':
      case 'LogCashDrawerReport':
        return true;
      default:
        return false;
    }
  }

  needProductFilter() {
    switch (this.reportDefinition) {
      case 'EmployeeHoursReport':
      case 'LogCashDrawerReport':
        return false;
      default:
        return true;
    }
  }
}
