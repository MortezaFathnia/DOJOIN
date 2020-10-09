export class UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  companyId: string;
  roles: string[];
  features: string[];
  rememberMe: boolean;
  businessIds: string;
  userType: string;
  lastModifiedOn: Date;

  constructor(data) {
    this.userId = data.User.XRefCode;
    this.firstName = data.User.FirstName;
    this.lastName = data.User.LastName;
    this.address = data.User.Address;
    this.phone = data.User.Phone;
    this.companyId = data.User.CompanyId;
    this.rememberMe = data.User.rememberMe;
    this.email = data.User.Email;
  }
}


