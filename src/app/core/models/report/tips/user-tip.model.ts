import {Receipt} from './receipt.model';
import {Tip} from './tip.model';

export class UserTip {
  UserId: number;
  UserName: string;
  totalTips: Tip[];
  Receipts: Receipt[];
}

