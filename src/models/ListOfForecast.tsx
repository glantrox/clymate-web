class Forecast {
    weatherStatus: string;
    temprature: number;    
    date: Date;
    constructor(weatherStatus: string, temprature: number, date: Date ){
        this.weatherStatus = weatherStatus;
        this.temprature = temprature;
        this.date = date;
    }
}

class ListOfForecast {
    data: Array<Forecast>
    constructor(data: Array<Forecast>) {
        this.data = data;
    }
}

export default ListOfForecast