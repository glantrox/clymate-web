interface AirQuality {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    us_epa_index: number;
    gb_defra_index: number;
}

interface Condition {
    text: string;
    icon: string;
    code: number;
}

interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: AirQuality;
}

interface LocationModel {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

class CurrentWeatherModel {
    location: LocationModel;
    current: Current;

    constructor(location: LocationModel, current: Current) {
        this.location = location;
        this.current = current;
    }

    static fromJSON(json: any): CurrentWeatherModel {
        const location: LocationModel = {
            name: json.location.name,
            region: json.location.region,
            country: json.location.country,
            lat: json.location.lat,
            lon: json.location.lon,
            tz_id: json.location.tz_id,
            localtime_epoch: json.location.localtime_epoch,
            localtime: json.location.localtime,
        };

        const airQuality: AirQuality = {
            co: json.current.air_quality.co,
            no2: json.current.air_quality.no2,
            o3: json.current.air_quality.o3,
            so2: json.current.air_quality.so2,
            pm2_5: json.current.air_quality.pm2_5,
            pm10: json.current.air_quality.pm10,
            us_epa_index: json.current.air_quality['us-epa-index'],
            gb_defra_index: json.current.air_quality['gb-defra-index'],
        };

        const condition: Condition = {
            text: json.current.condition.text,
            icon: json.current.condition.icon,
            code: json.current.condition.code,
        };

        const current: Current = {
            last_updated_epoch: json.current.last_updated_epoch,
            last_updated: json.current.last_updated,
            temp_c: json.current.temp_c,
            temp_f: json.current.temp_f,
            is_day: json.current.is_day,
            condition: condition,
            wind_mph: json.current.wind_mph,
            wind_kph: json.current.wind_kph,
            wind_degree: json.current.wind_degree,
            wind_dir: json.current.wind_dir,
            pressure_mb: json.current.pressure_mb,
            pressure_in: json.current.pressure_in,
            precip_mm: json.current.precip_mm,
            precip_in: json.current.precip_in,
            humidity: json.current.humidity,
            cloud: json.current.cloud,
            feelslike_c: json.current.feelslike_c,
            feelslike_f: json.current.feelslike_f,
            windchill_c: json.current.windchill_c,
            windchill_f: json.current.windchill_f,
            heatindex_c: json.current.heatindex_c,
            heatindex_f: json.current.heatindex_f,
            dewpoint_c: json.current.dewpoint_c,
            dewpoint_f: json.current.dewpoint_f,
            vis_km: json.current.vis_km,
            vis_miles: json.current.vis_miles,
            uv: json.current.uv,
            gust_mph: json.current.gust_mph,
            gust_kph: json.current.gust_kph,
            air_quality: airQuality,
        };

        return new CurrentWeatherModel(location, current);
    }
}