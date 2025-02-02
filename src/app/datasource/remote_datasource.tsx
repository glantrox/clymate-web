import FetchStatus, { FetchError, FetchSuccess } from "@/models/FetchStatus";
import WeatherModel from "@/models/WeatherModel";
import axios from "axios";

export class RemoteDataSource {
    async getWeatherDetails(): Promise<FetchStatus> {
        try {
          const response = await axios.get("https://api.example.com/weather");
          if(response.status != 200) {
            return new FetchError(
                response.statusText,
                response.status
            )
          }
          const responseJson = WeatherModel.fromJson(response);
          return new FetchSuccess(response.status, responseJson)
        } catch (error) {
            return new FetchError("Function Exception 'getWeatherDetails' : " + error)
        }
      }
}