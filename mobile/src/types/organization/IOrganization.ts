import { IImage } from './../IImage';
export interface ICoordinate {
    latitude: number;
    longitude: number;
}
export enum ECongestionOfSpace {
    EMPTY = 'empty',
    SOME = 'some',
    LOADED = 'loaded',
    FULLY = 'fully',
}

export interface IOrganizationPrice {
    id: number,
    title: string,
    price: number
}

export interface IOrganizationAddress {
    id: 1;
    country: string;
    city: string;
    street: string;
    building: string;
    description: string;
}

export interface IShedule {
    time_from: string //"00:30:00",
    time_to: string // "02:00:00"
}
export interface IOrganizationShedule {
    id: number;
    monday: IShedule;
    tuesday: IShedule;
    wednesday: IShedule;
    thursday: IShedule;
    friday: IShedule;
    saturday: IShedule;
    sunday: IShedule;
}
export interface IOrganization {
    id: number;
    title: string;
    description: string;
    coordinate: ICoordinate
    images: IImage[];
    congestion_of_space: ECongestionOfSpace;
    average_check: string;
    bar_style: string;
    shedule: IOrganizationShedule;
    address: IOrganizationAddress;
    phone: string;
    veranda: boolean;
    togo: boolean;
}