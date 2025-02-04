import FetchStatus, { FetchError, FetchSuccess } from "@/models/FetchStatus";
import axios from "axios";


const apiUrl = process.env.BASE_URL_WEATHER_API || ' ';
const apiKey = process.env.WEATHER_API_KEY || ' ';
export class RemoteDataSource {


    async getWeatherDetails(): Promise<FetchStatus> {
        try {
            
            const position = await this.getCurrentLocation();
            const { latitude, longitude } = position.coords;
          
            const response = await axios.get(apiUrl + '/current.json', {
                params: {
                    key: apiKey,
                    q: latitude + " " + longitude
                }
            });

            if (response.status !== 200) {
                return new FetchError(response.statusText, response.status);
            }

            const data = CurrentWeatherModel.fromJSON(response.data);
            return new FetchSuccess(response.status, data);
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