
import { create } from "zustand";
import ForecastWeatherState, { FWSFailed, FWSLoading, FWSSuccess } from "./state/ForecastWeathterState";
import WeatherRepository from "@/repository/WeatherRepository";
import {
    fold
} from "fp-ts/lib/Either";
import {
    pipe
} from "fp-ts/lib/function";


type ForecastWeatherStore = { 
    forecastWeatherState: ForecastWeatherState;
    fetchForecast: () => Promise<void>
}

const weatherRepository = new WeatherRepository();
export const useForecastWeatherStore = create<ForecastWeatherStore>((set) => ({
    forecastWeatherState: new FWSLoading(),
    fetchForecast: async () => {
        const response = weatherRepository.getForecast()
         response.then(((value) => setTimeout(() => {
                    pipe(
                        value,
                        fold(
                            (errorMessage) => set({
                                forecastWeatherState: new FWSFailed(errorMessage)
                            }),
                            (data) => set({
                                forecastWeatherState: new FWSSuccess(data)
                            }),
                        )
                    )
        }, 1500)))
    }
}));