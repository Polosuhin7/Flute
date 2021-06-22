import { userMock } from './user.mock';
import {aboutMock} from "./about.mock";
import {appMock} from "./app.mock";
import {groupMock} from "./group.mock";
import {authMock} from "./auth.mock";
import {menuMock} from "./menu.mock";
import { roleMock } from './role.mock';
import { workplaceMock } from './workplace.mock';
import { ruleMock } from './rule.mock';

interface ISimulateApi {
    [key: string]: any;
}

export const simulateApi: ISimulateApi = {
    ...aboutMock,
    ...appMock,
    ...groupMock,
    ...authMock,
    ...menuMock,
    ...userMock,
    ...roleMock,
    ...workplaceMock,
    ...ruleMock
};
