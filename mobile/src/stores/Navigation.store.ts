import { action, computed, makeAutoObservable } from "mobx";
import { ESheetState } from "../types/ESheetState";


export interface INavigationState {
    organizationList: ESheetState;
    organizationItem: ESheetState;
    menu: ESheetState;
}

export interface INavigationStore {
    state: INavigationState;
    setNavigationState(view: keyof INavigationState, state: ESheetState): void;
}

class NavigationStore implements INavigationStore {
    constructor() {
        makeAutoObservable(this);
    }

    _state: INavigationState = {
        organizationList: ESheetState.HIDE,
        organizationItem: ESheetState.CLOSE,
        menu: ESheetState.CLOSE,
    };

    @computed
    get state() {
        if (Object.values(this._state).every((val) => val === ESheetState.HIDE)) {
            return {
                organizationList: ESheetState.HIDE,
                organizationItem: ESheetState.CLOSE,
                menu: ESheetState.CLOSE,
            };
        }
        return  {...this._state};
       }

    @action
    setNavigationState = (view: keyof INavigationState, state: ESheetState) => {
        this._state[view] = state;
    };
}

export default NavigationStore;
