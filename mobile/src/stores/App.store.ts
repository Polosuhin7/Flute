import {makeAutoObservable} from "mobx";
import {IRootStore} from "./Root.store";
import { IError } from "../types/IError";
import { LocationObject } from "expo-location";

export interface IAppStore {
    rootStore: IRootStore;
    ready: boolean;
    error: IError | null;
    location: LocationObject;
    setLocation(location: LocationObject): void;
    setReady(val: boolean): void;
    setError(error: IError | null): void;
}

class AppStore implements IAppStore {
    rootStore: IRootStore;
    error: IError | null = null;
    ready: boolean = false
    location: any = []

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setError = (error: IError | null): void => {
        this.error = error;
    }

    setLocation = (location: LocationObject): void => {
        this.location = location;
    }

    setReady = (val: boolean): void => {
        this.ready = val;
    }
}

export default AppStore;
