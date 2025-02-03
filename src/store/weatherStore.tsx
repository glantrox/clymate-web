import WeatherModel from "@/models/WeatherModel"
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

type WeatherStore = {
    currentWeatherState: WeatherState
    fetch: () => Promise < void >
}


export const useWeatherStore = create < WeatherStore > ((set) => ({
    currentWeatherState: new WeatherStateLoading(),
    fetch: async () => {
        const response = weatherRepository.weatherDetails();
        response.then(((value) => pipe(
            value,
            fold(
                (errorMessage) => set((state) => ({
                    currentWeatherState: new WeatherStateFailed(errorMessage)
                })),
                (data) => set((state) => ({
                    currentWeatherState: new WeatherStateSuccess(data)
                })),
            )
        )))
    }
}));