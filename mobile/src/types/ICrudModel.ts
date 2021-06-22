import { ICriteria } from "./ICriteria";

export interface ICrudModel<T> {
    getList(params?: ICriteria): Promise<T[]>;
    getOne(id: number): Promise<T>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: number): Promise<T>;
}
