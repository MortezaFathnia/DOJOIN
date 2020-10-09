
export enum ProductType {
  POS = 1,
  KIOSK = 2,
  ONLINE_ORDERING = 3,
  Tablet = 4,
  ALL = 5
}

export enum PaidAt {
  ONLINE = 1,
  KIOSK = 2,
  STORE = 3
}

export enum OrderStatus {
  All = 0,
  Training = 1,
  VoidedItems = 2,
  Void = 4
}

export enum ToastType {
  success = 1,
  error = 2,
  warning = 3
}

export enum StatusMode {
  InProgress = 1,
  CheckedOut = 2,
  Rejected = -1,
  Voided = 4
}
