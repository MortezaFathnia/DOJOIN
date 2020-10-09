export class Filter {
  isUserSelectorVisible?: boolean;
  isPaymentMethodSelectorVisible: boolean;
  displayedOrderStatus?: boolean;
  reportName: string;
  onlyWeek?= false;
  onlyCustomDateRange?: boolean;
  isProductFilterVisible?: boolean;
  constructor(data) {
    this.isUserSelectorVisible = data.isUserSelectorVisible;
    this.isPaymentMethodSelectorVisible = data.isPaymentMethodSelectorVisible;
    this.displayedOrderStatus = data.displayedOrderStatus;
    this.reportName = data.reportName;
    this.onlyWeek = data.onlyWeek;
    this.onlyCustomDateRange = data.onlyCustomDateRange;
    this.isProductFilterVisible = data.isProductFilterVisible ? this.isProductFilterVisible : true;
  }
}
