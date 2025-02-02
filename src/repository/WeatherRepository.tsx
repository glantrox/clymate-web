
import { RemoteDataSource } from "@/app/datasource/remote_datasource";
import { FetchError } from "@/models/FetchStatus";
import WeatherModel from "@/models/WeatherModel";
import { Either } from "fp-ts/lib/Either";
import * as O from "fp-ts/Option";

class WeatherRepository {
    static remoteDataSource = new RemoteDataSource();

    // Implementation of Repositoru
    // Return Function as Either<Left, Right>
}

export default WeatherRepository;
