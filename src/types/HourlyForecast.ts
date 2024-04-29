enum UnitCode {
    WmoUnitDegC = "wmoUnit:degC",
    WmoUnitM = "wmoUnit:m",
    WmoUnitPercent = "wmoUnit:percent",
}
enum ShortForecast {
    ChanceShowersAndThunderstorms = "Chance Showers And Thunderstorms",
    Clear = "Clear",
    MostlyClear = "Mostly Clear",
    MostlyCloudy = "Mostly Cloudy",
    MostlySunny = "Mostly Sunny",
    PartlyCloudy = "Partly Cloudy",
    PartlySunny = "Partly Sunny",
    ShowersAndThunderstorms = "Showers And Thunderstorms",
    ShowersAndThunderstormsLikely = "Showers And Thunderstorms Likely",
    SlightChanceShowersAndThunderstorms = "Slight Chance Showers And Thunderstorms",
    Sunny = "Sunny",
}
enum TemperatureUnit {
    F = "F",
}
enum WindDirection {
    Nnw = "NNW",
    Nw = "NW",
    S = "S",
    SE = "SE",
    SSE = "SSE",
    Ssw = "SSW",
    Sw = "SW",
    W = "W",
    Wnw = "WNW",
    Wsw = "WSW",
}
enum WindSpeed {
    The0Mph = "0 mph",
    The5Mph = "5 mph",
    The10Mph = "10 mph",
    The15Mph = "15 mph",
    The20Mph = "20 mph",
}

interface Elevation {
    readonly unitCode: UnitCode;
    readonly value: number;
}
export interface HourlyForecastPeriod {
    readonly number: number;
    readonly name: string;
    readonly startTime: string;
    readonly endTime: string;
    readonly isDaytime: boolean;
    readonly temperature: number;
    readonly temperatureUnit: TemperatureUnit;
    readonly temperatureTrend: null;
    readonly probabilityOfPrecipitation: Elevation;
    readonly dewpoint: Elevation;
    readonly relativeHumidity: Elevation;
    readonly windSpeed: WindSpeed;
    readonly windDirection: WindDirection;
    readonly icon: string;
    readonly shortForecast: ShortForecast;
    readonly detailedForecast: string;
}
export interface HourlyForecast {
    readonly updated: string;
    readonly units: string;
    readonly forecastGenerator: string;
    readonly generatedAt: string;
    readonly updateTime: string;
    readonly validTimes: string;
    readonly elevation: Elevation;
    readonly periods: HourlyForecastPeriod[];
}
// export interface HourlyForecast {
//     readonly properties: Properties;
// }