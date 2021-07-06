import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import * as Location from 'expo-location';
import {observer, Provider} from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ru';
import React, {useEffect} from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {API} from './src/models';
import ApiProvider from './src/providers/ApiProvider';
import {ThemeProvider} from './src/providers/ThemeProvider';
import stores from './src/stores/stores';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {ruLocale, enLocale} from './src/locales';
import Button from './src/components/buttons/Button';
import {Platform, StatusBar} from 'react-native';
import Organizations from './src/views/organization/Organizations';

moment.locale('ru');
i18n.translations = {
    ru: ruLocale,
    en: enLocale,
};
i18n.locale = Localization.locale.substr(0,2);
i18n.fallbacks = true;

const getCurrentLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
})

const {app, organization} = stores;
function App() {
    const {ready, setLocation, setReady, setError} = app;
    const [loaded] = useFonts({
        Gilroy: require('./assets/fonts/Gilroy-Regular.ttf'),
        GilroyLight: require('./assets/fonts/Gilroy-Light.ttf'),
        GilroyMedium: require('./assets/fonts/Gilroy-Medium.ttf'),
        GilroySemibold: require('./assets/fonts/Gilroy-Semibold.ttf'),
    });

    useEffect(() => {
        (async () => {
            try {
                await organization.fetchData();
            } catch (error) {
                console.log('failed fetch');
            }
            try {
                const position: any = await getCurrentLocation()
                console.log(position)
                setLocation(position);
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
    const barStyle = app.theme === 'dark' ? 'light-content' : 'dark-content';
    return (
        <AppearanceProvider>
            <ApiProvider api={API}>
                <Provider {...stores}>
                    <ThemeProvider theme={app.theme}>
                        <StatusBar barStyle={barStyle} />
                        <Organizations />
                    </ThemeProvider>
                </Provider>
            </ApiProvider>
        </AppearanceProvider>
    );
}
export default observer(App);
