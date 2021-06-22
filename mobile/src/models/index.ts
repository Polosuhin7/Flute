import { OrganizationModel, IOrganizationModel } from './Organization.model';
import {AuthModel, IAuthModel} from "./Auth.model";



export const API = {
    auth: new AuthModel(),
    organization: new OrganizationModel()
}

export type IApi = {
    auth: IAuthModel;
    organization: IOrganizationModel
}