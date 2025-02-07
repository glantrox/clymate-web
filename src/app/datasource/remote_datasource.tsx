import FetchStatus, { FetchError, FetchSuccess } from "@/models/FetchStatus";
import { CurrentWeatherModel } from "@/models/CurrentWeatherModel"; 
import axios from "axios";
import { ForecastModel } from "@/models/ListOfForecastModel";


const apiUrl = process.env.BASE_URL_WEATHER_API || ' ';
const apiKey = process.env.WEATHER_API_KEY || ' ';
export class RemoteDataSource {


    async getForecast(): Promise<FetchStatus> {
        try {
            const position = await this.getCurrentLocation();
            const { latitude, longitude } = position.coords;

            const response = await axios.get(apiUrl + '/forecast.json', {
                params: {
                    key: apiKey,
                    q: latitude + " " + longitude,
                    days: 5

                }
            });

            if (response.status !== 200) {
                return new FetchError(response.statusText, response.status);
            }

            const data: ForecastModel = ForecastModel.fromJSON(response.data);            
            return new FetchSuccess(response.status, data as ForecastModel);

        } catch(error) {
            const geoError = error as GeolocationPositionError;
            const message = error instanceof GeolocationPositionError ? geoError.message : error;
            return new FetchError("Function Exception 'getWeatherDetails\n' : " + message );
        }
    }

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

            const data: CurrentWeatherModel = CurrentWeatherModel.fromJSON(response.data);
            
            return new FetchSuccess(response.status, data as CurrentWeatherModel);
        } catch (error) {
            const geoError = error as GeolocationPositionError;
            const message = error instanceof GeolocationPositionError ? geoError.message : error;
            return new FetchError("Function Exception 'getWeatherDetails\n' : " + message );
        }
    }

    private getCurrentLocation(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error("Geolocation is not supported by this browser.").message);
            }
        });
    }
}