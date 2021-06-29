import { API } from '../models';
import { makeAutoObservable, runInAction } from "mobx";
import { IError } from "../types/IError";
import { IStore } from "../types/IStore";
import { ErrorCode } from "../utils/Constant";


export interface IAuthStore extends IStore {
    isAuth: boolean;
    login(username: string, password: string): void;
    logout(): void;
    information(): void;
    ping(): void;
}

class AuthStore implements IAuthStore {
    error: IError | null = null;
    loading: boolean = false;
    isAuth: boolean = false;
    model = API.auth;

    constructor() {
        makeAutoObservable(this);
    }

    setError = (e: IError | null): void => {
        this.error = e;
    }

    login = async (username: string, password: string) => {
        runInAction(() => {
            this.loading = true;
            this.error = null
        })
        try {
            const {success, error, message = ""} = await this.model.login(username, password);
            if(!success) {
                const err: IError = {
                    code: error,
                    name: `${error}`,
                    message,
                };
                throw err;
            }
            runInAction(() => {
                this.loading = false;
                this.isAuth = true;
            });

            await this.information();
        } catch (e) {
            console.error('Auth.Store::onLogin::e', e)

            switch (parseInt(e.name)) {
                case ErrorCode.ACCESS_DENIED: {
                    e.message = e.message || "Доступ запрещен";
                    break;
                }
                case ErrorCode.ALREADY_LOGGEDIN: {
                    e.message = "Такой пользователь уже авторизован";
                    break;
                }
                case ErrorCode.NOT_FOUND: {
                    e.message = "Неверный логин или пароль";
                    break;
                }
                case ErrorCode.NOT_ACTIVE: {
                    e.message = "Пользователь не активен";
                    break;
                }
            }

            runInAction(() => {
                this.loading = false;
                this.isAuth = false;
                this.setError(e);
            })
        }
    }

    logout = async () => {
        try {
            await this.model.logout();
            runInAction(() => {
                this.isAuth = false;
            })
        } catch (e) {
            console.log('AuthModel::logout::e')
        }
    }

    information = async () => {
        runInAction(() => {
            this.loading = true;
            this.error = null
        })
        try {
            const {success, error, message} = await this.model.information();
            if(!success) {
                throw {
                    code: error,
                    name: error,
                    message: message,
                }
            }
            runInAction(() => {
                this.loading = false;
                this.isAuth = true;
            })
            // Start ping
            await this.startPing();
        } catch (e) {
            console.log('AuthStore::information::e')
            runInAction(() => {
                this.loading = false;
                this.isAuth = false;
                this.setError(e);
            })
        }
    }

    ping = async () => {
        try {
            const res = await this.model.ping();
        } catch (e) {
            runInAction(() => {
                this.isAuth = false;
            })
        }
    }

    private pingTimer: number = 20;
    private startPing = async () => {
        if(!this.isAuth) {
            return;
        }

        try {
            await this.ping();
        } catch (e) {
            runInAction(() => {
                this.isAuth = false;
            })
        }

        setTimeout(this.startPing, this.pingTimer * 1000);
    }
}

export default AuthStore;
