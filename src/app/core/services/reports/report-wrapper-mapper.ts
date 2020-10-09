import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../utils.service';
import { ReportFilterModel } from '../../models/report/report-filter.model';


@Injectable({ providedIn: 'root' })
export class ReportWrapperMapper {
  report = [];
  reportFilter: ReportFilterModel;

  constructor(
    private snackBar: MatSnackBar,
    private util: UtilsService) {
  }


  convertToTable(report: any, reportType: string): any {
    let output = [];
    switch (reportType) {
      case 'Orders Report':
        this.report = [];
        this.report[0] = report.map((item) => {
          const row = {};
          row['Reference'] = item.OrderId;
          row['Location'] = item.Location;
          row['Order Type'] = item.Type;
          row['Date Time'] = this.util.dateTimeFormat(item.CreateOn);
          row['Customer Info'] = item.CustomerName + (item.Address ? ", " + item.Address : "");
          row['Payment Methods'] = item.PaymentMethods;
          if (item.VoidNotes || item.VoidUserName) {
            row['Void User Name'] = item.VoidUserName;
            row['Void Notes'] = item.VoidNotes;
          }
          // row['Subtotal'] = item.Subtotal;
          row['Tax'] = item.Tax;
          row['Total'] = item.Total;
          return row;
        });
        break;
      case 'Log Cash Drawer Report':
        this.report = [];
        this.report[0] = report.map((item) => {
          const row = {};
          row['User Name'] = item.UserName;
          row['User Group'] = item.UserGroupName;
          row['Create Time'] = this.util.dateTimeFormat(item.CreateTime);
          row['Notes'] = item.Notes;
          row['Description'] = item.Description;
          return row;
        });
        break;
      case 'Employee Hours Report':
        this.report = [];
        this.report[0] = report.map((item) => {
          const row = {};
          row['User Name'] = item.UserName;
          row['Clock In'] = item.ClockInTime ? this.util.dateTimeFormat(item.ClockInTime) : ' now ';
          row['Clock Out'] = item.ClockOutTime ? this.util.dateTimeFormat(item.ClockOutTime) : ' now ';
          row['Total Hours'] = item.ClockOutTime ? this.util.diffTime(item.ClockOutTime, item.ClockInTime) : ' -- ';
          return row;
        });
        break;
      case 'Orders Count Report':
        this.report = [];
        this.report[0] = report.map((item) => {
          const row = {};
          row['From'] = this.util.timeFormat(item.from);
          row['To'] = this.util.timeFormat(item.to);
          row['Count'] = item.totalCount;
          return row;
        });
        break;
      case 'Sales By Menu Sections Report':
        this.report = [];
        for (let r = 0; r < report.length; r++) {
          report[r].MenuSections.forEach((menuSection, i) => {
            menuSection.MenuItems.forEach((menuItem, j) => {
              const row = {};
              row['Menu Name'] = report[r].MenuName;
              row['Menu Section Name'] = menuSection.MenuSectionName;
              row['Menu Item Name'] = menuItem.MenuItemName;
              row['Quantity'] = menuItem.Quantity;
              row['Total Price'] = menuItem.TotalPrice;
              row['Section Price Percent'] = (menuItem.SectionPricePercent * 100).toFixed(2);
              row['Menu Price Percent'] = (menuItem.FamilyPricePercent * 100).toFixed(2);
              output.push(row);
            });
          });
        }
        this.report[0] = output;
        break;
      case 'Tips Report':
        this.report = [];
        for (let r = 0; r < report.length; r++) {
          report[r].Receipts.forEach((receipts, i) => {
            receipts.Tips.forEach((tip, j) => {
              const row = {};
              row['UserName'] = report[r].UserName;
              row['Order Type Name'] = receipts.OrderTypeName;
              row['Payment Type'] = tip.PaymentType;
              row['Tip'] = tip.Tip;
              row['Amount'] = tip.Amount;
              output.push(row);
            });
          });
        }
        this.report[0] = output;
        break;
      case 'Payin Payout Report':
        this.report = [];
        for (let r = 0; r < report.length; r++) {
          report[r].Pays.forEach((pay, i) => {
            const row = {};
            row['Reference'] = pay.Id;
            row['UserName'] = report[r].UserName;
            row['Date Time'] = this.util.dateTimeFormat(pay.CreatedOn);
            row['Comment'] = pay.Comment;
            row['Payin'] = pay.Payin;
            row['Payout'] = pay.Payout;
            output.push(row);
          });
        }
        this.report[0] = output;
        break;

      case 'Sales Summary Report':
        output = report.Recieved;
        this.report = [];
        this.report[0] = output;
        const flag = output.length > 0;
        output = [];
        report.Sales.forEach(sale => {
          const row = {};
          row['Order Type Name'] = sale.OrderTypeName;
          row['Orders Count'] = sale.OrdersCount;
          row['SubTotal'] = sale.SubTotal;
          row['Delivery Charge'] = sale.DeliveryCharge;
          row['Discount'] = sale.Discount;
          row['Tax'] = sale.Tax;
          row['Total Price'] = sale.TotalPrice;
          output.push(row);
        });
        this.report[1] = output;
        break;

      case 'Discount Report':
        this.report = [];

        for (let r = 0; r < report.length; r++) {
          report[r].OrderDetails.forEach((OrderDetail) => {

            if (!OrderDetail.Discounts.length) {
              const row = {};
              row['Cart Order Id'] = report[r].CartOrderId;
              row['Submitted Time'] = this.util.dateTimeFormat(report[r].SubmittedTime);
              row['ITEM '] = OrderDetail.MenuItemName;
              row['DISCOUNT '] = OrderDetail.TotalDiscountsPrice;
              row['TOTAL PRICE'] = OrderDetail.TotalPrice;
              row['DISCOUNT NAME '] = '';
              row['VALUE '] = '';
              output.push(row);
            }

            OrderDetail.Discounts.forEach((Discounts) => {
              const row = {};
              row['Cart Order Id'] = report[r].CartOrderId;
              row['Submitted Time'] = this.util.dateTimeFormat(report[r].SubmittedTime);
              row['ITEM '] = OrderDetail.MenuItemName;
              row['DISCOUNT '] = OrderDetail.TotalDiscountsPrice;
              row['TOTAL PRICE'] = OrderDetail.TotalPrice;
              row['DISCOUNT NAME '] = Discounts.Name;
              row['VALUE '] = Discounts.Value;
              output.push(row);
            });
          });
        }
        this.report[0] = output;

        break;
      case 'Modifires Report':
        this.report = [];
        report.forEach((report, i) => {
          const row = {};
          row['Hierarchy Text'] = report.hierarchyText;
          row['Quantity'] = report.quantity;
          row['Total Price'] = report.totalPrice;
          output.push(row);
        });
        this.report[0] = output;
        break;
      default:
        return;
    }
    return this.report;
  }
}
