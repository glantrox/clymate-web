import { CurrentWeatherModel } from "@/models/CurrentWeatherModel"

export class CurrentWeatherEntity {
    humidityPercentage: string
    cloudPercentage: string
    windPercentage: string
    temprature: string
    constructor(
    humidityPercentage: string,
    cloudPercentage: string,
    windPercentage: string,
    temprature: string,
    ) {
        this.humidityPercentage = humidityPercentage
        this.cloudPercentage = cloudPercentage
        this.windPercentage = windPercentage
        this.temprature = temprature
    }

    static fromModel(model: CurrentWeatherModel): CurrentWeatherEntity {
        return new CurrentWeatherEntity(
            (model.current.humidity ?? 0).toString(),
            (model.current.cloud ?? 0).toString(),
            (model.current.wind_kph ?? 0).toString(),
            (model.current.temp_c ?? 0).toString()
        );
    }


}