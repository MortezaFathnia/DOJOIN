export class TokenModel {
    token: string;
    expiryDate: Date;

    constructor(token: string, expiryDate: string) {
        this.token = token;
        this.expiryDate = new Date(expiryDate);
    }

    isValid(): boolean {
        return this.token && this.expiryDate > new Date();
    }
}
