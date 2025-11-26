import axios from 'axios';
import type { ITelemetry } from '../models/TelemetryModel';

export class ApiService {
    // Dynamic URL based on where the browser is running (localhost or LAN IP)
    private static baseUrl = `http://${window.location.hostname}:5000/api/telemetry`;

    //promise is what I was asked in the interview it means it represents a operation that is not done yet
    //we use async/await to represent the promise
    public static async getTelemetry(): Promise<ITelemetry> {
        try {
            const response = await axios.get<ITelemetry>(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }

    public static async sendTelemetry(data: ITelemetry): Promise<void> {
        try {
            await axios.post(this.baseUrl, data);
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }
}