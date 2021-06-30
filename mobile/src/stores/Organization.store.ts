import { IOrganization } from './../types/organization/IOrganization';
import {action, computed, makeAutoObservable, observable, runInAction, toJS} from "mobx";
import {IRootStore} from "./Root.store";
import { IError } from "../types/IError";
import { API } from "../models";
import { OrganizationFilterType } from '../types/organization/OrganizationFilterType';


export interface IOrganizationStore {
    error: IError | null;
    list: IOrganization[];
    data: IOrganization[];
    loading: boolean;
    activeOrganization: IOrganization | null;
    isLiked: boolean;
    filter: OrganizationFilterType;
    toogleFileter(filter: OrganizationFilterType): void;
    setActiveOrganization(organization: IOrganization): void
    toggleLike(): void
    fetchData(): void
}

class OrganizationStore implements IOrganizationStore {

    private model = API.organization;

    constructor() {
        makeAutoObservable(this);
        this.getFavoriteOrganizations();
    }

    error: IError | null = null;
    data: IOrganization[] = [];
    loading: boolean = false;
    filter: OrganizationFilterType = '';
    activeOrganization: IOrganization | null = null
    favoriteOrganizations: IOrganization[] = []

    

    @computed
    get list() {
        return toJS(this.data)
    }


    @computed
    get isLiked() {
        return !!this.favoriteOrganizations.find(({id}) => id === this.activeOrganization?.id);
    }

    @action
    toogleFileter = (filter: OrganizationFilterType) => {
        this.filter = filter === this.filter ? '' : filter;
        this.fetchData();
    }
    @action
    private getFavoriteOrganizations = async () => {
        try {
            this.loading = true;
            const data = await this.model.getFavorites();
            runInAction(() => {
                this.favoriteOrganizations = data;
            })
        } catch(error) {
            this.error = error;
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }
    @action
    toggleLike = async () => {
        // TODO: КОСТЫЛЬ где у activeOrganization перетерается поле coordinate
        const findedOrganization = this.list.find(({id}) => id === this.activeOrganization?.id)
        // console.log('findedOrganization', findedOrganization)
        if(!findedOrganization) return;
        try {
            this.loading = true;
            const data = await this.model.toggleFavorite(findedOrganization);
            runInAction(() => {
                this.favoriteOrganizations = data;
            })
        } catch(error) {
            console.log('failed toggle like')
            this.error = error;
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    @action
    setError = (error: IError | null): void => {
        this.error = error;
    }

    @action
    setActiveOrganization = (organization: IOrganization) => {
        this.activeOrganization = organization;
    }

    @action
    fetchData = async () => {
        try {
            this.loading = true;
            const data = await this.model.getFilteredData(this.filter);
            runInAction(() => {
                this.data = toJS(data);
                
            })
        } catch(error) {
            this.error = error;
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }
}

export default OrganizationStore;
