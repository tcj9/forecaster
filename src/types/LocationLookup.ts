type Place = {
    readonly placeName: string;
    readonly longitude: string;
    readonly state: string;
    readonly stateAbbreviation: string;
    readonly latitude: string;
}
export type LocationLookup = {
    readonly postCode: string;
    readonly country: string;
    readonly countryAbbreviation: string;
    readonly places: Place[];
}