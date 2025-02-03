
import { RemoteDataSource } from "@/app/datasource/remote_datasource";
import { FetchError, FetchSuccess } from "@/models/FetchStatus";
import WeatherModel from "@/models/WeatherModel";
import { Either, right, left } from "fp-ts/lib/Either";
import * as O from "fp-ts/Option";

class WeatherRepository {
    static RDS = new RemoteDataSource();

    // Implementation of Repository
    // Return Function as Promise<Either<Left, Right>>

    // Get Weather Details
    async weatherDetails(): Promise<Either<string, any>> {
        const response = await WeatherRepository.RDS.getWeatherDetails();
        if(response instanceof FetchError) {
            return left(response.message);
        } else if (response instanceof FetchSuccess) {
            return right(response.data);
        }        
        return left('Unknown Error Occured');
    }
}

export default WeatherRepository;
