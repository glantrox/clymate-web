

class WeatherState {}

export class WeatherStateLoading extends WeatherState {    }

export class WeatherStateSuccess extends WeatherState {
    data:CurrentWeatherEntity
    constructor(data: CurrentWeatherEntity) {
        super()
        this.data = data
    }
}
export class WeatherStateFailed extends WeatherState {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

export default WeatherState
