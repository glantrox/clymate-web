class WeatherModel {
    humidityLevel: number;
    cloudLevel: number;
    windSpeed: number;
    temprature: number;


    constructor(humidityLevel: number, cloudLevel: number, windSpeed: number, temprature: number) {
        {
            this.humidityLevel = humidityLevel;
            this.cloudLevel = cloudLevel;
            this.windSpeed = windSpeed;
            this.temprature = temprature;
        }
    }

    static fromJson(json: any) {
        return new WeatherModel(json.humidity, json.cloudLevel, json.windSpeed, json.tempRature);
    }

}


export default WeatherModel;
