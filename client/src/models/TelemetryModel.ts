export interface ITelemetry {
    altitude: number;
    his: number;
    adi: number;
}

// Class representation using Class fro the constructor
export class TelemetryModel implements ITelemetry {
    altitude: number;
    his: number;
    adi: number;

    constructor(data?: ITelemetry) {
        this.altitude = data?.altitude || 0;
        this.his = data?.his || 0;
        this.adi = data?.adi || 0;
    }
}