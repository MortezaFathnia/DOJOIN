export class User {
  Clocks: [];
  Name: string;
  Status: number;
  UserId: number;
  Pin: number|null;
  Guid: string|null;
  CellPhone: string;
  HourlyRate: number;
  UserGroupId: number;
  UserPermissions: [];
  DeliveryRate: number;
  CanVoidOrder: boolean;
  Password: string|null;
  ViewOrder: string|null;
  WorkingDayEndUsers: [];
  CanRefundOrder: boolean;
  CanReprintOrder: boolean;
  Description: string|null;
  CanCashoutDriver: boolean;
  CanApplyDiscount: boolean;
  CanOpenCashDrawer: boolean;
  WorkingDayStartingUsers: [];
}
