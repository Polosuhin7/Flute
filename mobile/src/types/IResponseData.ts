import {IResponse} from "./IResponse";

export interface IResponseData<T> extends IResponse {
    data: T;
}
