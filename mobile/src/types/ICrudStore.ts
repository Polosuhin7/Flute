import {IDataStore} from "./IDataStore";
import {ICriteria} from "./ICriteria";
import {ICrudModel} from "./ICrudModel";

export interface ICrudStore<T> extends IDataStore<T> {
    model: ICrudModel<T>;
    read(criteria?: ICriteria): void;
    create(data: T): void;
    update(data: T): void;
    destroy(data: T): void;
}
