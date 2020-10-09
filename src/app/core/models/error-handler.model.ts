export class ErrorHandlerModel {
    constructor(private error) {
    }
    private hasErrorBody() {
        return this.error;
    }
    public getStatus() {
        return this.error.status;
    }
    public getMessage() {
        if (this.hasErrorBody()) {
            switch (this.error.error.Status) {
                case 'InvalidCredentials':
                    return 'Username or password is incorrect';
                default:
                    return this.error.error.Status;
            }
        }
        else {
            return this.error.statusText;
        }
    }
    public getShortMessage() {
        if (this.hasErrorBody()) {
            return this.error.error.Status;
        }
        else {
            return this.error.statusText;
        }
    }
}
