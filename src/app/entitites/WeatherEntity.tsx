class CurrentWeatherEntity {
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

    static fromModel(model: CurrentWeatherModel):CurrentWeatherEntity {
        return new CurrentWeatherEntity(
            '${model.current.humidity | 0,}',
            '${model.current.cloud.toString | 0}',
            '${model.current.wind_kph.toString | 0}',
            '${model.current.temp_c | 0}'
        )
    }


}