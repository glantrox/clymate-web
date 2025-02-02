import WeatherModel from "@/models/WeatherModel"
import { create } from "zustand"
import WeatherState, { WeatherStateLoading } from "./state/WeatherState"

enum stateType {Loading, Success, Error}

type WeatherStore = {
    currentWeatherState: WeatherState
    fetch: () => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    currentWeatherState: new WeatherStateLoading(),
    fetch: () => {
        // Implementation: Fetch From Repository
    }
}));