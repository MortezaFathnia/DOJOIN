import {Addresses} from './Addresses';


export class Customer {

  Addresses: Addresses[];
  CustomerId: number;
  CustomerNotes: string|null;
  Description: string;
  DoB: string;
  Email: string;
  Guid: string;
  MembershipId: null|number;
  Name: string;
  Status: number;
  Tel: string;
}
