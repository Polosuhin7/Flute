import React from "react";
import {API, IApi} from "../models";
export const ApiContext = React.createContext({} as IApi);

const ApiProvider: React.FC<any> = ({children, api}) => {
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export default ApiProvider;
