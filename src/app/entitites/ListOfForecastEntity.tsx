import { ForecastModel } from "@/models/ListOfForecastModel";

class ForecastEntity {
    weatherStatus: string;
    temprature: number;    
    date: string;

    constructor(weatherStatus: string, temprature: number, date: string) {
        this.weatherStatus = weatherStatus;
        this.temprature = temprature;
        this.date = date;
    }
}

class ListOfForecastEntity {
    data: Array<ForecastEntity>;

    constructor(data: Array<ForecastEntity>) {
        this.data = data;
    }
    
    static fromModel(model: ForecastModel) {
        const arrayData: Array<ForecastEntity> = [];
        
        for (let index = 0; index < model.forecast.forecastday.length; index++) {
            const element = model.forecast.forecastday[index];

            // Create a new ForecastEntity instance for each forecast day
            const forecastEntity = new ForecastEntity(
                element.day.condition.text, // weatherStatus
                element.day.avgtemp_c,      // temprature
                element.date                 // date
            );

            // Push the new instance into the array
            arrayData.push(forecastEntity);
        }

        return new ListOfForecastEntity(arrayData);
    }
}

export default ListOfForecastEntity;