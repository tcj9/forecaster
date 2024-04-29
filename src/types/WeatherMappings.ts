//   const weatherMappings = Convert.toWeatherMappings(json);

type Geometry = {
    readonly type: string;
    readonly coordinates: number[];
}
type DistanceClass = {
    readonly unitCode: string;
    readonly value: number;
}
type RelativeLocationProperties = {
    readonly city: string;
    readonly state: string;
    readonly distance: DistanceClass;
    readonly bearing: DistanceClass;
}
type RelativeLocation = {
    readonly type: string;
    readonly geometry: Geometry;
    readonly properties: RelativeLocationProperties;
}
type WeatherMappingsProperties = {
    readonly id: string;
    readonly type: string;
    readonly cwa: string;
    readonly forecastOffice: string;
    readonly gridID: string;
    readonly gridX: number;
    readonly gridY: number;
    readonly forecast: string;
    readonly forecastHourly: string;
    readonly forecastGridData: string;
    readonly observationStations: string;
    readonly relativeLocation: RelativeLocation;
    readonly forecastZone: string;
    readonly county: string;
    readonly fireWeatherZone: string;
    readonly timeZone: string;
    readonly radarStation: string;
}
export default interface WeatherMappings {
    readonly id: string;
    readonly properties: WeatherMappingsProperties;
}