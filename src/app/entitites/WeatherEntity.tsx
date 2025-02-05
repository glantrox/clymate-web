import { CurrentWeatherModel } from "@/models/CurrentWeatherModel"

export class CurrentWeatherEntity {
    humidityPercentage: string
    cloudPercentage: string
    windPercentage: string
    temprature: string
    locationName: string
    localTime: string
    weatherCondition: string
    conditionIcon: string
    constructor(
    humidityPercentage: string,
    cloudPercentage: string,
    windPercentage: string,
    temprature: string,
    locationName: string,
    localTime: string,
    weatherCondition: string,
    conditionIcon: string
    ) {
        this.humidityPercentage = humidityPercentage
        this.cloudPercentage = cloudPercentage
        this.windPercentage = windPercentage
        this.temprature = temprature
        this.locationName = locationName
        this.localTime = localTime
        this.weatherCondition = weatherCondition
        this.conditionIcon = conditionIcon
    }

    static fromModel(model: CurrentWeatherModel): CurrentWeatherEntity {
        return new CurrentWeatherEntity(
            (model.current.humidity ?? 0).toString(),
            (model.current.cloud ?? 0).toString(),
            (model.current.wind_kph ?? 0).toString(),
            (model.current.temp_c ?? 0).toString(),
            model.location.name,
            model.location.localtime,
            model.current.condition.text,
            model.current.condition.icon,
        );
    }


}