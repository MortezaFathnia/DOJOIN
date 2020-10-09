import { MenuSectionModel } from './menu-section.model';

export class SalesByMenuSectionModel {
    MenuId: number;
    MenuName: string;
    Quantity: number;
    TotalPrice: number;
    MenuSections: MenuSectionModel[];
}
