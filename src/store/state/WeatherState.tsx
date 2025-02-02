import WeatherModel from "@/models/WeatherModel";

class WeatherState {}

export class WeatherStateLoading extends WeatherState {    }

export class WeatherStateSuccess extends WeatherState {
    data: WeatherModel
    constructor(data: WeatherModel) {
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
