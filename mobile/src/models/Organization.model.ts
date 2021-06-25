import { IOrganization } from "../types/organization/IOrganization";
import { CrudModel } from "./Crud.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IOrganizationModel {
    getFavorites(): Promise<IOrganization[]>;
    toggleFavorite(organizaion: IOrganization): Promise<IOrganization[]>;
}

export class OrganizationModel extends CrudModel<IOrganization> implements IOrganizationModel {
    constructor() {
        super("/organizations");
    }

    private async setFavorites(organizations: IOrganization[]): Promise<IOrganization[]> {
        await AsyncStorage.setItem("favoriteOrganizations", JSON.stringify(organizations));
        return organizations;
    }
    async getFavorites(): Promise<IOrganization[]> {
        const organizations: IOrganization[] = await AsyncStorage.getItem("favoriteOrganizations").then((r) => JSON.parse(r || "[]"));
        return organizations;
    }
    async toggleFavorite(organizaion: IOrganization): Promise<IOrganization[]> {
        const organizations = await this.getFavorites();
        const targetIndex = organizations.findIndex(({ id }) => id === organizaion.id);
        if (targetIndex !== -1) {
            organizations.splice(targetIndex, 1);
        } else {
            organizations.push(organizaion);
        }
        
        return await this.setFavorites(organizations);
    }
}
