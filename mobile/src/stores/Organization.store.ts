import { IOrganization } from './../types/organization/IOrganization';
import {action, computed, makeAutoObservable, observable, runInAction, toJS} from "mobx";
import {IRootStore} from "./Root.store";
import { IError } from "../types/IError";
import { API } from "../models";

export interface IOrganizationStore {
    error: IError | null;
    list: IOrganization[];
    loading: boolean;
    activeOrganization: IOrganization | null;
    setActiveOrganization(organization: IOrganization): void
    fetchData(): void
}

class OrganizationStore implements IOrganizationStore {

    private model = API.organization;

    constructor() {
        makeAutoObservable(this);
    }

    error: IError | null = null;
    data: IOrganization[] = [];
    loading: boolean = false;
    activeOrganization: IOrganization | null = null

    

    @computed
    get list() {
        return toJS(this.data)
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
            const data = await this.model.getList();
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
