import NavigationStore, { INavigationStore } from './Navigation.store';
import OrganizationStore, { IOrganizationStore } from './Organization.store';
import AppStore, {IAppStore} from "./App.store";
import AuthStore, {IAuthStore} from "./Auth.store";
import {API} from '../models';

export interface IRootStore {
    app: IAppStore;
    auth: IAuthStore;
    organization: IOrganizationStore;
    navigation: INavigationStore
}

class RootStore implements IRootStore {
    public app: IAppStore = new AppStore(this);
    public auth: IAuthStore = new AuthStore();
    public organization: IOrganizationStore = new OrganizationStore();
    public navigation: INavigationStore = new NavigationStore();
    
}

export default RootStore;
