import {Pays} from './pays';

export class PayinPayoutModel {
  Pays: Pays[];
  UserId: number;
  UserName: string;
  totalPays: number;
  totalPayIn: number;
  totalPayOut: number;
  totalBalance: number;
}
