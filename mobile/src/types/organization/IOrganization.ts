export interface ICoordinate {
    latitude: number;
    longitude: number;
}

export interface IOrganization {
    id: number;
    title: string;
    coordinate: ICoordinate
}