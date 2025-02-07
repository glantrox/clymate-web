import { ForecastModel } from "@/models/ListOfForecastModel";

class ForecastEntity {
    weatherStatus: string;
    temprature: number;    
    date: string;
    constructor(weatherStatus: string, temprature: number, date: string ){
        this.weatherStatus = weatherStatus;
        this.temprature = temprature;
        this.date = date;
    }

    
}

class ListOfForecastEntity {
    data: Array<ForecastEntity>
    constructor(data: Array<ForecastEntity>) {
        this.data = data;
    }
    
    static fromModel(model: ForecastModel) {
        const arrayData: Array<ForecastEntity> = []
        for (let index = 0; index < model.forecast.forecastday.length; index++) {
            const element = model.forecast.forecastday[index];    
            arrayData[index].date = element.date
            arrayData[index].temprature = element.day.avgtemp_c
            arrayData[index].weatherStatus = element.day.condition.text            
        }
        return new ListOfForecastEntity(arrayData)
    }

}

export default ListOfForecastEntity