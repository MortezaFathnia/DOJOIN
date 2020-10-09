import { MenuItemModel } from './menu-item.model';

export class MenuSectionModel {
    MenuSectionId: number;
    MenuSectionName: string;
    Quantity: number;
    TotalPrice: number;
    FamilyQuantityPercent: number;
    MenuItems: MenuItemModel[];
}
