"use client"; // Mark this file as a client component
import { useCurrentWeatherStore } from "@/store/currentWeatherStore";
import { useForecastWeatherStore } from "@/store/forecastWeatherStore";
import ForecastWeatherState, { FWSFailed, FWSLoading, FWSSuccess } from "@/store/state/ForecastWeathterState";
import WeatherState, { WeatherStateFailed, WeatherStateLoading, WeatherStateSuccess } from "@/store/state/WeatherState";
import { JSX, useEffect } from "react";


interface CurrentWeatherWidgetProps { weatherState: WeatherState;}
function CurrentDateWidget({ weatherState }: CurrentWeatherWidgetProps): JSX.Element {
  if(weatherState instanceof WeatherStateSuccess) {
    const success = weatherState as WeatherStateSuccess
    return (
      <div className="wrapper  flex flex-col gap-2 items-start">
        <h1 className="font-bold text-[70px] leading-[95%]">{success.data.locationName}</h1>
        <p className="font-consolas text-left text-[14px]">{success.data.localTime}</p>
      </div>
     )
  } else {    
    return ( <h1>  </h1> )
  }
}
function CurrentWeatherWidget({ weatherState }: CurrentWeatherWidgetProps): JSX.Element {
  if(weatherState instanceof WeatherStateLoading) {
    return ( <h1>Loading...</h1> )
  } else if(weatherState instanceof WeatherStateSuccess) {
    const success = weatherState as WeatherStateSuccess
    return (
      <div className="wrapper flex flex-col gap-5 items-end">

        <div
          className="card-weather items-center flex flex-col light:bg-gray-200 dark:bg-gray-600 px-15 py-2 w-[70%] ph rounded-md border border-gray-500">
          <p className="font-consolas text-[14px] font-bold">{success.data.weatherCondition}</p>
          <img className="w-[120px] h-[120px] grayscale" src={success.data.conditionIcon} alt="" />
        </div>
        <div className="wratherWrapper">
          <h1 className="font-bold text-[70px] leading-[95%] text-right">{success.data.temprature}°CELSIUS</h1>
          <div className="info-wrapper flex flex-col font-consolas text-right text-[14px]">
            <p>Humidity: {success.data.humidityPercentage}%</p>
            <p>Cloudy: {success.data.cloudPercentage}%</p>
            <p>Wind: {success.data.windPercentage}km/h</p>
          </div>
        </div>
      </div>
     )
  } else {    
    const failed = weatherState as WeatherStateFailed
    const errorMessage = failed.message
    return ( <h1>{errorMessage} </h1> )
  }
}

interface ForeCastWidgetProps {forecastState: ForecastWeatherState}
function ForecastWeatherWidget({ forecastState }: ForeCastWidgetProps) {
  if (forecastState instanceof FWSLoading) {
    return (<h1>Loading Forecast...</h1>);
  } else if (forecastState instanceof FWSSuccess) {
    const listOfForecast = forecastState.data.data;
    
    // Create an array to hold the list items
    const forecastItems = listOfForecast.map((element, index) => (
      <ul key={index} className="flex flex-row space-x-7 font-consolas text-[14px]">                
        <li className="font-bold self-start text-start">{element.weatherStatus}</li>
        <li className="font-extralight self-center text-center">{element.temprature}°</li>
        <li className="font-extralight self-end text-end">{element.date}</li>
      </ul>
    ));

    // Return the array of forecast items
    return <>{forecastItems}</>;
    
  } else {
    const failed = forecastState as FWSFailed;
    const errorMessage = failed.message;
    return (<h1>Error {errorMessage}</h1>);
  }
}
export default function Home() {
  const { currentWeatherState, fetchCurrentWeather } = useCurrentWeatherStore()
  const { forecastWeatherState, fetchForecast } = useForecastWeatherStore()

  useEffect(() => {
    fetchCurrentWeather()
    fetchForecast()
  }, [fetchCurrentWeather, fetchForecast]);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="content-wrapper flex flex-wrap-reverse gap-4 ">
          {/* LEFT SIDE */}
          <div className="left-side flex flex-col items-end gap-2">
            <CurrentWeatherWidget weatherState={currentWeatherState} />
          </div>
          {/* RIGHT SIDE */}
          <div className="right-side flex flex-col items-start  mb-20 ">
            <CurrentDateWidget weatherState={currentWeatherState} />
            <div className="card-forecast  light:bg-gray-200 dark:bg-gray-600 p-2 rounded-md border border-gray-500">
              <p className="font-consolas text-[14px] font-bold">5-DAYS FORECAST -----------------</p>
              {/* PUT THE FOREACH HERE */}
              <ForecastWeatherWidget forecastState={forecastWeatherState}/>
          </div>
          </div>
        </div>
      </main>
    </div>
    );
}
