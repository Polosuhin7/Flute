import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOrganization } from "../types/organization/IOrganization";
import { isTodayOpen } from "../utils/orgnizationSheduleHelper";
import { CrudModel } from "./Crud.model";

export interface IOrganizationModel {
    getFilteredData(filter?: string): Promise<IOrganization[]>
    getFavorites(): Promise<IOrganization[]>;
    toggleFavorite(organizaion: IOrganization): Promise<IOrganization[]>;
}

export class OrganizationModel extends CrudModel<IOrganization> implements IOrganizationModel {
    constructor() {
        super("/organizations");
    }
    
    async getFilteredData(filter?: string): Promise<IOrganization[]> {
        
        if(!filter) {
            return await this.getList();
        }
        if(filter === 'favorite') {
            return await this.getFavorites();
        }

        if(filter === 'open-now') {
            const organizations = await this.getList();
            return organizations.filter(organization => isTodayOpen(organization.shedule));
        }

        return await this.getList();;

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
