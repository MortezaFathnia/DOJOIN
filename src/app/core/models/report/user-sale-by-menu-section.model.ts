import { SalesByMenuSectionModel } from './sales-by-menu-section.model';

export class UserSaleByMenuSectionModel {
    UserId: number;
    Menus: SalesByMenuSectionModel[];


    constructor(UserId: number, Menus: SalesByMenuSectionModel[]) {
        this.UserId = UserId;
        this.Menus = Menus;
    }
}
