import { BusinessModel } from './business.model';

export class CompanyModel {
    id: string;
    name: string;
    clientNameSpace: string;
    portalDashboardStartingTime: string;
    businesses: BusinessModel[] = [];

    constructor(data) {
        this.id = data.CompanyId;
        this.portalDashboardStartingTime = data.PortalDashboardStartingTime ? data.PortalDashboardStartingTime : "04:00";
        this.name = data.CompanyName;
        this.clientNameSpace = data.ClientNameSpace;
        this.businesses = data.Businesses.map(b => new BusinessModel(b));
    }
}
