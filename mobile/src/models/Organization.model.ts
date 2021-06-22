import { IOrganization } from "../types/organization/IOrganization";
import {CrudModel} from "./Crud.model";

export interface IOrganizationModel {}

export class OrganizationModel extends CrudModel<IOrganization> implements IOrganizationModel {
    constructor() {
        super('/organizations')
    }
}
