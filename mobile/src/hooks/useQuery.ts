import { useEffect, useState } from "react";
import { IApi } from "../models";
import { ICrudModel } from "../types/ICrudModel";
import { IResponseData } from "../types/IResponseData";
import { useModels } from "./useModels";


interface IUseQueryProps<T> {
    model: keyof IApi;
    action: keyof ICrudModel<T>;
    payload?: any;
    silent?: boolean;
    callback?(data: any): void;
}

let isActive = true;
export function useQuery<T>({ model, action, payload, callback, silent = false }: IUseQueryProps<T>) {
    const modelData = (useModels() as any)[model];
    // check model
    if (!modelData) {
        throw `Model "${model}" is not defined`;
    }
    // check action
    if (!(action in modelData)) {
        throw `No such method "${action}" in model "${model}"`;
    }

    const [data, setData] = useState<IResponseData<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (params?: any) => {
        if(!isActive) {
            return;
        }
        setLoading(() => true);
        setError(() => null);
        try {
            if (!!modelData && typeof modelData[action] !== "function") {
                throw `method ${action} not exist`;
            }

            const response = await modelData[action](params);
            if(!isActive) {
                return;
            }
            setData(() => response);
            callback && callback(response);
        } catch (error) {
            setError(error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isActive = true;
        if (!silent) {
            fetchData(payload);
        }
        return () => {
            isActive = false;
        }
    }, [payload]);

    return {
        data,
        error,
        loading,
        fetchData,
    };
}
