import ListOfForecastEntity from "@/app/entitites/ListOfForecastEntity"
import { CurrentWeatherEntity } from "@/app/entitites/WeatherEntity"


class ForecastWeatherState {}

export class FWSLoading extends ForecastWeatherState {    }

export class FWSSuccess extends ForecastWeatherState {
    data:ListOfForecastEntity
    constructor(data: ListOfForecastEntity) {
        super()
        this.data = data
    }
}
export class FWSFailed extends ForecastWeatherState {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

export default ForecastWeatherState
