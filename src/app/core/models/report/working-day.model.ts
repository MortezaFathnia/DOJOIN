export class WorkingDayModel {
    id: number;
    startingTime: Date;
    endTime: Date;

    constructor(data, isOnline) {
        if (!data) { return; }

        if (isOnline) {
            this.id = data.Id;
            this.startingTime = data.Start;
            this.endTime = data.End;
        } else {
            this.id = data.WorkingDayId;
            this.startingTime = data.StartingTime;
            this.endTime = data.EndTime;
        }
    }
}
