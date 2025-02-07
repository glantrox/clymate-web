
import { RemoteDataSource } from "@/app/datasource/remote_datasource";
import ListOfForecastEntity from "@/app/entitites/ListOfForecastEntity";
import { CurrentWeatherEntity } from "@/app/entitites/WeatherEntity";
import { CurrentWeatherModel } from "@/models/CurrentWeatherModel";
import { FetchError, FetchSuccess } from "@/models/FetchStatus";
import { ForecastModel } from "@/models/ListOfForecastModel";
import { Either, right, left } from "fp-ts/lib/Either";
import * as O from "fp-ts/Option";

class WeatherRepository {
    static RDS = new RemoteDataSource();

    // Implementation of Repository
    // Return Function as Promise<Either<Left, Right>>

    // Get Weather Details
    async weatherDetails(): Promise<Either<string, CurrentWeatherEntity>> {
        const response = await WeatherRepository.RDS.getWeatherDetails();
        if(response instanceof FetchError) {
            return left(response.message);
        } else if (response instanceof FetchSuccess) {
            return right(CurrentWeatherEntity.fromModel(response.data as CurrentWeatherModel));
        }        
        return left('Unknown Error Occured');
    }

    // Get Forecast
    async getForecast(): Promise<Either<string, ListOfForecastEntity>> {
        const response = await WeatherRepository.RDS.getForecast()
        if(response instanceof FetchError) {
            return left(response.message)
        } else if(response instanceof FetchSuccess) {
            return right(ListOfForecastEntity.fromModel(response.data as ForecastModel))
        }
        return left('Unknown Error Occured');
    }

}

export default WeatherRepository;
