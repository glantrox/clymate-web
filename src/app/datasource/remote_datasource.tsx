import FetchStatus, { FetchError, FetchSuccess } from "@/models/FetchStatus";
import axios from "axios";

export class RemoteDataSource {
    async getWeatherDetails(): Promise<FetchStatus> {
        try {
            // Get the user's current location
            const position = await this.getCurrentLocation();
            const { latitude, longitude } = position.coords;
          
            // Make the API request using the 'q' parameter
            const response = await axios.get(`https://api.example.com/weather`, {
                params: {
                    q: latitude + " " + longitude
                }
            });

            if (response.status !== 200) {
                return new FetchError(response.statusText, response.status);
            }

            const responseJson = WeatherModel.fromJSON(response.data);
            return new FetchSuccess(response.status, responseJson);
        } catch (error) {
            return new FetchError("Function Exception 'getWeatherDetails' : " + error);
        }
    }

    private getCurrentLocation(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }
}