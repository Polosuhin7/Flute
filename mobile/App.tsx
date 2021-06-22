import { observer, Provider } from "mobx-react";
import React from "react";
import { StatusBar } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import App from "./src/App";
import { API } from "./src/models";
import ApiProvider from "./src/providers/ApiProvider";
import stores from "./src/stores/stores";
function Container() {
    return (
        <AppearanceProvider>
            <ApiProvider api={API}>
                <Provider {...stores}>
                    <StatusBar />
                    <App />
                </Provider>
            </ApiProvider>
        </AppearanceProvider>
    );
}
export default observer(Container);
