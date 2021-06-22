import {IError} from "./IError";

export interface IStore {
    loading: boolean;
    error: IError | null;
    setError(e: IError | null): void;
}
