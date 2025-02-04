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

export class CurrentWeatherModel {
    location: LocationModel;
    current: Current;

    constructor(location: LocationModel, current: Current) {
        this.location = location;
        this.current = current;
    }

    static fromJSON(json: any): CurrentWeatherModel {
        const location: LocationModel = {
            name: json.location?.name ?? 'Unknown',
            region: json.location?.region ?? 'Unknown',
            country: json.location?.country ?? 'Unknown',
            lat: json.location?.lat ?? 0,
            lon: json.location?.lon ?? 0,
            tz_id: json.location?.tz_id ?? 'Unknown',
            localtime_epoch: json.location?.localtime_epoch ?? 0,
            localtime: json.location?.localtime ?? 'Unknown',
        };

        const airQuality: AirQuality = {
            co: json.current?.air_quality?.co ?? 0,
            no2: json.current?.air_quality?.no2 ?? 0,
            o3: json.current?.air_quality?.o3 ?? 0,
            so2: json.current?.air_quality?.so2 ?? 0,
            pm2_5: json.current?.air_quality?.pm2_5 ?? 0,
            pm10: json.current?.air_quality?.pm10 ?? 0,
            us_epa_index: json.current?.air_quality?.['us-epa-index'] ?? 0,
            gb_defra_index: json.current?.air_quality?.['gb-defra-index'] ?? 0,
        };

        const condition: Condition = {
            text: json.current?.condition?.text ?? 'Unknown',
            icon: json.current?.condition?.icon ?? 'Unknown',
            code: json.current?.condition?.code ?? 0,
        };

        const current: Current = {
            last_updated_epoch: json.current?.last_updated_epoch ?? 0,
            last_updated: json.current?.last_updated ?? 'Unknown',
            temp_c: json.current?.temp_c ?? 0,
            temp_f: json.current?.temp_f ?? 0,
            is_day: json.current?.is_day ?? 0,
            condition: condition,
            wind_mph: json.current?.wind_mph ?? 0,
            wind_kph: json.current?.wind_kph ?? 0,
            wind_degree: json.current?.wind_degree ?? 0,
            wind_dir: json.current?.wind_dir ?? 'Unknown',
            pressure_mb: json.current?.pressure_mb ?? 0,
            pressure_in: json.current?.pressure_in ?? 0,
            precip_mm: json.current?.precip_mm ?? 0,
            precip_in: json.current?.precip_in ?? 0,
            humidity: json.current?.humidity ?? 0,
            cloud: json.current?.cloud ?? 0,
            feelslike_c: json.current?.feelslike_c ?? 0,
            feelslike_f: json.current?.feelslike_f ?? 0,
            windchill_c: json.current?.windchill_c ?? 0,
            windchill_f: json.current?.windchill_f ?? 0,
            heatindex_c: json.current?.heatindex_c ?? 0,
            heatindex_f: json.current?.heatindex_f ?? 0,
            dewpoint_c: json.current?.dewpoint_c ?? 0,
            dewpoint_f: json.current?.dewpoint_f ?? 0,
            vis_km: json.current?.vis_km ?? 0,
            vis_miles: json.current?.vis_miles ?? 0,
            uv: json.current?.uv ?? 0,
            gust_mph: json.current?.gust_mph ?? 0,
            gust_kph: json.current?.gust_kph ?? 0,
            air_quality: airQuality,
        };

        return new CurrentWeatherModel(location, current);
    }
}