import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { observer, Provider } from "mobx-react";
import moment from "moment";
import "moment/locale/ru";
import React, { useEffect } from "react";
import { AppearanceProvider } from "react-native-appearance";
import { API } from "./src/models";
import ApiProvider from "./src/providers/ApiProvider";
import { ThemeProvider } from "./src/providers/ThemeProvider";
import Main from "./src/screens/Main";
import stores from "./src/stores/stores";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { ruLocale, enLocale } from "./src/locales";
import Button from "./src/components/buttons/Button";

moment.locale("ru");
i18n.translations = {
    en: ruLocale,
    ja: enLocale,
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const { app } = stores;
function App() {
    const { ready, setLocation, setReady, setError } = app;
    const [loaded] = useFonts({
        Gilroy: require("./assets/fonts/Gilroy-Regular.ttf"),
        GilroyLight: require("./assets/fonts/Gilroy-Light.ttf"),
        GilroyMedium: require("./assets/fonts/Gilroy-Medium.ttf"),
        GilroySemibold: require("./assets/fonts/Gilroy-Semibold.ttf"),
    });

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    throw "Permission to access location was denied";
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            } catch (error) {
                setError(error);
            } finally {
                setReady(true);
            }
        })();
    }, []);

    if (!ready || !loaded) {
        return <AppLoading />;
    }
    return (
        <AppearanceProvider>
            <ApiProvider api={API}>
                <Provider {...stores}>
                    <ThemeProvider theme={app.theme}>
                        <Main />
                    </ThemeProvider>
                </Provider>
            </ApiProvider>
        </AppearanceProvider>
    );
}
export default observer(App);
