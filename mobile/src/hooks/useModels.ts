import React from 'react';
import { IApi, API } from '../models';
import {ApiContext} from "../providers/ApiProvider";

export function useModels(): IApi {
    return React.useContext(ApiContext) as typeof API;
}
