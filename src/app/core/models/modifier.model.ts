export class modifier {
        hierarchyText: string;
        quantity: number;
        totalPrice: number;
        constructor(data) {
                this.hierarchyText = data.HierarchyText;
                this.quantity = data.Quantity;
                this.totalPrice = data.TotalPrice;
        }
}