import {
    create
} from "zustand"
import WeatherState, {
    WeatherStateFailed,
    WeatherStateLoading,
    WeatherStateSuccess
} from "./state/WeatherState"
import WeatherRepository from "@/repository/WeatherRepository"
import {
    match
} from "assert";
import {
    fold
} from "fp-ts/lib/Either";
import {
    pipe
} from "fp-ts/lib/function";

const weatherRepository = new WeatherRepository();

type CurrentWeatherStore = {
    currentWeatherState: WeatherState
    fetchCurrentWeather: () => Promise < void >
}


export const useCurrentWeatherStore = create < CurrentWeatherStore > ((set) => ({
    currentWeatherState: new WeatherStateLoading(),
    fetchCurrentWeather: async () => {
        const response = weatherRepository.weatherDetails();
        response.then(((value) => pipe(
            value,
            fold(
                (errorMessage) => set({
                    currentWeatherState: new WeatherStateFailed(errorMessage)
                }),
                (data) => set({
                    currentWeatherState: new WeatherStateSuccess(data)
                }),
            )
        )))
    }
}));