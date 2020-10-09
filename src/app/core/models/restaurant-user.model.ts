export class RestaurantUser {
  userId: number;
  name: string;
  phone: string;

  constructor(data){
    this.userId = data.UserId;
    this.name = data.Name;
    this.phone = data.CellPhone;
  }
}


