import {IFilter} from "./IFilter";
import ISort from "./ISort";

export interface ICriteria {
    filter?: IFilter[];
    sort?: ISort[];
    page?: number;
    start?: number;
    limit?: number;
}
