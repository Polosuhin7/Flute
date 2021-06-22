import { IResponse } from "../types/IResponse";
import { fetchData } from "../utils/Http";

export interface IAuthModel {
    login(username: string, password: string): Promise<any>;
    logout(): Promise<any>;
    ping(): Promise<IResponse>;
    information(): Promise<any>;
}

export class AuthModel implements IAuthModel {
    public async login(username: string, password: string): Promise<IResponse> {
        return await fetchData({
            method: 'POST',
            url: '/api/auth/login',
            params: {username, password}
        })
    }

    // TODO: check
    public async logout(): Promise<any> {
        const logoutResult = await fetchData<IResponse>({
            url: '/api/auth/logoff',
            method: 'get',
        });

        return logoutResult;
    }

    public async ping(): Promise<IResponse> {
        const response = await fetchData<IResponse>({
            url: '/api/auth/information',
            method: "HEAD"
        });
        return response;
    }

    public async information(): Promise<IResponse> {
        const response = await fetchData<IResponse>({
            url: '/api/auth/information',
            method: "HEAD"
        });
        return response;
    }
}
