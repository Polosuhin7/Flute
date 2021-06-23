import { LocationObject } from "expo-location";
import { getDistance } from "geolib";
import { ICoordinate } from "../types/organization/IOrganization";
export function getGeoDistance(from: LocationObject, to: ICoordinate) {
    const distance = getDistance(
        { longitude: from.coords.longitude, latitude: from.coords.latitude },
        { longitude: to.longitude, latitude: to.latitude }
    );
    return (distance / 1000).toFixed(2);
}
