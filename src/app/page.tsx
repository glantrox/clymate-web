import { useCurrentWeatherStore } from "@/store/currentWeatherStore";
import { WeatherStateLoading } from "@/store/state/WeatherState";
import Image from "next/image";
import { get } from "node:https";
import { useEffect } from "react";



export default function Home() {
  const { currentWeatherState, fetchCurrentWeather } = useCurrentWeatherStore();

  useEffect(() => {
    fetchCurrentWeather()
  }, [fetchCurrentWeather]);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="content-wrapper flex flex-row gap-2">
          {/* LEFT SIDE */}
          <div className="left-side flex flex-col items-end gap-2">
            <div
              className="card-weather items-center flex flex-col light:bg-gray-200 dark:bg-gray-600 px-20 py-2 ph rounded-md border border-gray-500">
              <p className="font-consolas text-[14px] font-bold">Mostly Cloudy</p>
              <img className="w-[130px] h-[130px]" src="/images/weather_example.png" alt="" />
            </div>
            {
            currentWeatherState instanceof WeatherStateLoading ? ( <h1>Loading</h1> ) : ( 
            <div
              className="wratherWrapper">
              <h1 className="font-bold text-[70px] leading-[95%] text-right">34 CELSIUS</h1>
              <div className="info-wrapper flex flex-col font-consolas text-right text-[14px]">
                <p>Humidity: 12%</p>
                <p>Cloudy: 12%</p>
                <p>Wind: 5/kmh</p>
                <p>Time: 12:00:00</p>
              </div>
            </div> )
            }

          </div>
          {/* RIGHT SIDE */}
          <div className="right-side flex flex-col items-start gap-2 mb-20">
            <h1 className="font-bold text-[70px] leading-[95%]">EAST<br />JAKARTA</h1>
            <p className="font-consolas text-left text-[14px]">12, January 2024</p>
            <div className="card-forecast  light:bg-gray-200 dark:bg-gray-600 p-2 rounded-md border border-gray-500">
              <p className="font-consolas text-[14px] font-bold">5-DAYS FORECAST -----------------</p>
              <ul className="flex flex-row justify-around space-x-12 text-right font-consolas text-[14px]">
                <li className="font-bold">Cloudy</li>
                <li className="font-extralight">20°</li>
                <li className="font-extralight">10th January</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    );
}
