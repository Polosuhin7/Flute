import { action, computed, makeAutoObservable, toJS } from "mobx";
import { ESheetState } from "../types/ESheetState";
import { debounce } from "../utils/debounce";

export interface INavigationState {
    organizationList: ESheetState;
    organizationItem: ESheetState;
    menu: ESheetState;
}
const initialState = {
    organizationList: ESheetState.HIDE,
    organizationItem: ESheetState.CLOSE,
    menu: ESheetState.CLOSE,
};
export interface INavigationStore {
    state: INavigationState;
    navigate(view: keyof INavigationState, state?: ESheetState): void;
    goBack(): void;
    closeAll():void
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

    history: INavigationState[] = [];

    @computed
    get state() {
        if (Object.values(this._state).every((val) => val === ESheetState.HIDE)) {
            return initialState;
        }
        return { ...this._state };
    }

    @action
    closeAll = () => {
        this._state = initialState;
    }

    @action
    goBack = debounce(() => {
        this._state = this.history.pop() || initialState;
    }, 1000)

    @action
    navigate = (view:keyof INavigationState, state = ESheetState.OPEN) => {
        // if(this._state[view] !== state){
            this.history.push({...this._state});
            if(view === 'organizationItem') {
                this._state['organizationList'] = ESheetState.CLOSE;
            }
            this._state[view] = state;
        // }
    }
}

export default NavigationStore;
