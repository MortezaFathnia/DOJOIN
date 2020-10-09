import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ReportFilterModel } from '../../models/report/report-filter.model';

import { ConfigService } from './config.service';
import { CompanyService } from './company.service';
import { Refund } from '../../models/report/refund.model';
import { ProductType, OrderStatus } from '../../models/helpers.model';

@Injectable({ providedIn: 'root' })
export class ReportingService {
  companyId: string;
  clientNamespace: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    public companyService: CompanyService
  ) { }

  updateFilter(
    reportFilter: ReportFilterModel,
    {
      dateType = undefined,
      productTypes = undefined,
      status = undefined,
      paymentMethods = undefined,
      from = undefined,
      to = '',
      restaurantIds = undefined,
      userIds = undefined
    }
  ): boolean {
    let changed = false;

    reportFilter.companyId = this.getCompanyId();

    if (restaurantIds) {
      reportFilter.restaurantIds = restaurantIds;
      changed = true;
    }
    if (userIds) {
      reportFilter.userIds = userIds;
      changed = true;
    }

    if ((dateType || dateType === 0) && reportFilter.dateType !== dateType) {
      reportFilter.dateType = dateType;
      changed = true;
    }

    if (from && reportFilter.from !== from) {
      reportFilter.from = from;
      changed = true;
    }
    if (productTypes) {
      reportFilter.productTypes = productTypes;
      changed = true;
    }

    if (status) {
      reportFilter.status = status;
      changed = true;
    }

    if (paymentMethods) {
      reportFilter.paymentMethods = paymentMethods;
      changed = true;
    }

    if (to !== '' && reportFilter.to !== to) {
      reportFilter.to = to;
      changed = true;
    }

    return changed;
  }

  SetReportDefinition(reportFilter: ReportFilterModel, reportName: string) {
    reportFilter.reportDefinition = `${reportName}`;
    reportFilter.status = ['0'];
  }

  SetReportStatus(reportFilter: ReportFilterModel, status: OrderStatus) {
    reportFilter.isTraining = false;
    reportFilter.hasVoidedItem = false;

    switch (status) {
      case OrderStatus.Training:
        reportFilter.status = [];
        reportFilter.isTraining = true;
        break;

      case OrderStatus.VoidedItems:
        reportFilter.status = [];
        reportFilter.hasVoidedItem = true;
        break;

      case OrderStatus.Void:
        reportFilter.status = [];
        reportFilter.status.push(OrderStatus.Void.toString());
        break;
    }
  }

  getProductTypeFromUrl(url: string) {
    let urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 2];
  }

  getProductTypeName(productType) {
    switch (productType) {
      case ProductType.POS:
        return 'POS';
      case ProductType.ONLINE_ORDERING:
        return 'Online';
      case ProductType.KIOSK:
        return 'Kiosk';
    }
  }

  async getReport(reportFilter: ReportFilterModel): Promise<any> {
    if (reportFilter.reportDefinition !== 'OrdersReport' && reportFilter.reportDefinition !== 'OrderDetailsReport') {
      reportFilter.status = [];
    }

    let data: any = [];

    if (!reportFilter.restaurantIds.length) {
      this.updateFilter(reportFilter, {
        restaurantIds: this.companyService.company.businesses.map(business => { return business.restaurant.id; })
      });
    }

    reportFilter.companyId = this.getCompanyId();
    const url = this.configService.getReportingServicesUrl(`reports/${reportFilter.reportDefinition}`);

    try {
      data = await this.http.get<any>(`${url}${reportFilter.getQueryParams()}`).toPromise();
    } catch (error) {
      console.log(error);
    }

    return data;
  }

  private getCompanyId() {
    if (this.companyId) {
      return this.companyId;
    }

    let cachedCompany = this.configService.getCacheItem('Company');
    if (cachedCompany) {
      this.companyId = cachedCompany.id;
      return cachedCompany.id;
    }
  }

  private filterReportLocal(reportFilter: ReportFilterModel, data: any) {
    switch (reportFilter.reportDefinition) {
      case 'OrdersReport':
        if (reportFilter.paymentMethods.length > 0) {
          const allowedPaymentMethods = reportFilter.paymentMethods;
          for (let i = 0; i < data.length; i++) {
            if (
              !data[i].Payments.find(x =>
                allowedPaymentMethods.includes(x.PaymentTypeId)
              )
            ) {
              data.splice(i, 1);
              i--;
            }
          }
        }
        break;
    }
    return data;
  }

  async refundOrder(model: Refund): Promise<void> {
    if (!this.clientNamespace) {
      this.clientNamespace = this.configService.getCacheItem('Company').clientNameSpace;
    }

    model.clientNamespace = this.clientNamespace;

    const url = this.configService.getOnlineOrderingServiceUrl('transactions/Refund');
    return await this.http.post<any>(url, model).toPromise();
  }
}
