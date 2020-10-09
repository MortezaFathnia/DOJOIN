import { Injectable, EventEmitter } from "@angular/core";
import { CompanyModel } from "../../models/company.model";
import { ConfigService } from "./config.service";
import { RestaurantPaymentTypeModel } from "../../models/report/restaurant-payment-type.model";
import { RestaurantOrderTypeModel } from "../../models/report/restaurant-order-type.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  companyId: string;
  company: CompanyModel;
  paymentTypesMapById;
  orderTypesMapById;
  orderTypesMapByName;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.company = this.configService.getCacheItem("Company");
    this.companyId = this.company ? this.company.id : undefined;
  }

  getCompanyInfo(companyId) {
    this.companyId = companyId;
    const url = this.configService.getReportingServicesUrl(
      `reports/CompanyInfoReport`
    );
    return this.http.get<any>(`${url}?companyId=${companyId}`);
  }

  updateCompany(data) {
    this.company = new CompanyModel(data);
    this.configService.clientNameSpace = this.company.clientNameSpace;

    this.configService.setCacheItem("Company", this.company);
  }

  getPaymentTypes(): RestaurantPaymentTypeModel[] {
    this.checkPaymentTypes();
    return this.paymentTypesMapById;
  }

  getPaymentType(key): RestaurantPaymentTypeModel {
    this.checkPaymentTypes();
    let paymentType: RestaurantPaymentTypeModel;
    paymentType = this.paymentTypesMapById[key];
    if (!paymentType) {
      paymentType = new RestaurantPaymentTypeModel({
        PaymentTypeId: 0,
        Name: "NA",
        Description: "",
        Color: "#000"
      });
    }
    return paymentType;
  }

  getOrderTypeColor(key): string {
    return this.getOrderType(key)
      .color.toLowerCase()
      .replace("#ff", "#");
  }

  getOrderType(key): RestaurantOrderTypeModel {
    this.checkOrderTypes();
    let orderType: RestaurantOrderTypeModel;
    if (isNaN(key)) {
      orderType = this.orderTypesMapByName[key];
    } else {
      orderType = this.orderTypesMapById[key];
    }
    if (!orderType) {
      orderType = new RestaurantOrderTypeModel({
        OrderTypeId: 0,
        Name: "",
        DisplayValue: "",
        Color: "#000"
      });
    }
    return orderType;
  }

  private checkOrderTypes() {
    if (!this.orderTypesMapById && !this.orderTypesMapByName) {
      if (this.company) {
        this.orderTypesMapById = [];
        this.orderTypesMapByName = [];
        for (const business of this.company.businesses) {
          for (const orderType of business.restaurant.orderTypes) {
            this.orderTypesMapById[orderType.orderTypeId] = orderType;
            this.orderTypesMapByName[orderType.name] = orderType;
          }
        }
      }
    }
  }

  private checkPaymentTypes() {
    if (!this.paymentTypesMapById) {
      if (this.company) {
        this.paymentTypesMapById = [];
        for (const business of this.company.businesses) {
          for (const paymentType of business.restaurant.paymentTypes) {
            this.paymentTypesMapById[paymentType.paymentTypeId] = paymentType;
          }
        }
      }
    }
  }
}
