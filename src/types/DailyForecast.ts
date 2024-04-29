type UnitCode = "wmoUnit:m" | "wmoUnit:degC" | "wmoUnit:percent";
type TemperatureUnit = "F";
interface Elevation {
    readonly unitCode: UnitCode;
    readonly value: number | null;
}
export interface DailyForecastPeriod {
    readonly number: number;
    readonly name: string;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly isDaytime: boolean;
    readonly temperature: number;
    readonly temperatureUnit: TemperatureUnit;
    readonly temperatureTrend: null | string;
    readonly probabilityOfPrecipitation: Elevation;
    readonly dewpoint: Elevation;
    readonly relativeHumidity: Elevation;
    readonly windSpeed: string;
    readonly windDirection: string;
    readonly icon: string;
    readonly shortForecast: string;
    readonly detailedForecast: string;
}
export interface DailyForecast {
    readonly updated: string;
    readonly units: string;
    readonly forecastGenerator: string;
    readonly generatedAt: Date;
    readonly updateTime: Date;
    readonly validTimes: string;
    readonly periods: DailyForecastPeriod[];
}
// export default interface DailyForecast {
//     readonly properties: Properties;
// }