import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvailableThemes } from './../themes/index';
import {computed, makeAutoObservable} from "mobx";
import {IRootStore} from "./Root.store";
import { IError } from "../types/IError";
import { LocationObject } from "expo-location";
import { Appearance } from 'react-native-appearance';

export interface IAppStore {
    rootStore: IRootStore;
    ready: boolean;
    error: IError | null;
    location: LocationObject;
    theme: AvailableThemes;
    setLocation(location: LocationObject): void;
    setReady(val: boolean): void;
    setError(error: IError | null): void;
}

class AppStore implements IAppStore {
    rootStore: IRootStore;
    error: IError | null = null;
    ready: boolean = false
    location: any = [];

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.setAppTheme()
    }
    private _theme: AvailableThemes = 'dark';
    @computed
    get theme() {
        return this._theme;
    }
    private setAppTheme = async () => {
        const userTheme = await AsyncStorage.getItem('app-theme');
        if(userTheme) {
            this._theme = userTheme as AvailableThemes;
        } else {
            this._theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
        }
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
