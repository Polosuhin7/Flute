import { ICriteria } from "../types/ICriteria";
import { ICrudModel } from "../types/ICrudModel";
import { fetchData } from "../utils/Http";
import { makeCriteria } from "../utils/makeCriteria";

export class CrudModel<T> implements ICrudModel<T> {
    constructor(public url: string) {}

    async getList(params?: ICriteria): Promise<T[]> {
        return await fetchData<T[]>({
            url: `${this.url}`,
            params: makeCriteria(params),
        });
    }

    async getOne(id: number): Promise<T> {
        return await fetchData<T>({
            url: `${this.url}/${id}`,
        });
    }

    async create(item: T): Promise<T> {
        return await fetchData<T>({
            url: `${this.url}/new`,
            method: "post",
            data: item,
        });
    }

    async delete(id: number): Promise<T> {
        return await fetchData<T>({
            url: `${this.url}/remove`,
            params: { id },
        });
    }

    async update(item: T): Promise<T> {
        return await fetchData<T>({
            url: `${this.url}/edit`,
            method: "post",
            data: item,
        });
    }
}
