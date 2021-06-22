import {IStore} from "./IStore";
import {ICriteria} from "./ICriteria";

export interface IDataStore<T> extends IStore {
    data: T[];
    criteria: ICriteria;
}
