import {ICriteria} from "./ICriteria";

export interface IData<T> extends ICriteria {
    content: T[];
}
