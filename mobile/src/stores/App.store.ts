import {makeAutoObservable} from "mobx";
import {IRootStore} from "./Root.store";
import { IError } from "../types/IError";

export interface IAppStore {
    rootStore: IRootStore;
    version: string;
    ready: boolean;
    error: IError | null;
    connection: boolean;

    setReady(val: boolean): void;
    setError(error: IError | null): void;
    setVersion(version: string): void;
    setConnection(state: boolean): void;
}

class AppStore implements IAppStore {
    rootStore: IRootStore;
    error: IError | null = null;
    ready: boolean = false
    version: string = "";
    connection: boolean = true;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setError = (error: IError | null): void => {
        this.error = error;
    }

    setReady = (val: boolean): void => {
        this.ready = val;
    }

    setVersion = (version: string): void => {
        this.version = version;
    }

    setConnection = (state: boolean) => {
        this.connection = state;
    }
}

export default AppStore;
