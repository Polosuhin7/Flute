import { AxiosRequestConfig } from "axios";
import config from "../config";
import { simulateApi } from "../models/simulate";
import { IFilter } from "../types/IFilter";
import axiosInstance from "./axios";


export interface IFetchParams extends AxiosRequestConfig {
    filter?: IFilter[];
}

export function fetchData<T>(params: IFetchParams = { url: "", method: "GET", filter: [] }): Promise<T> {
    return config.isDebug ? fetchSimulateData<T>(params) : fetchAxiosData<T>(params);
}

export function fetchSimulateData<T>({ url }: IFetchParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        if (url && simulateApi[url]) {
            setTimeout(() => resolve(simulateApi[url]), 1000);
        } else {
            reject({
                error: 404,
                url,
            });
        }
    });
}

export function fetchAxiosData<T>(params: IFetchParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        axiosInstance(params)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(reject);
    });
}
