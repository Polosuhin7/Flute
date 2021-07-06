import { useFonts } from 'expo-font';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { observer, Provider } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ru';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { enLocale, ruLocale } from './src/locales';
import { API } from './src/models';
import ApiProvider from './src/providers/ApiProvider';
import { ThemeProvider } from './src/providers/ThemeProvider';
import Main from './src/screens/Main';
import stores from './src/stores/stores';

moment.locale('ru');
i18n.translations = {
    ru: ruLocale,
    en: enLocale,
};
i18n.locale = Localization.locale.substr(0, 2);
i18n.fallbacks = true;

const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

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
                const position: any = await getCurrentLocation();
                setLocation(position);
            } catch (error) {
                setError(error);
            } finally {
                setReady(true);
            }
        })();
    }, []);

    if (!ready && !loaded) {
        return (
            <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 150}}>
                <Image style={{width: 120, height: 50}} source={require('./assets/icon.png')} />
                <ActivityIndicator style={{paddingTop: 50}} size='large' color='#ff3f80' />
            </View>
        );
    }
    const barStyle = app.theme === 'dark' ? 'light-content' : 'dark-content';
    return (
        <AppearanceProvider>
            <ApiProvider api={API}>
                <Provider {...stores}>
                    <ThemeProvider theme={app.theme}>
                        <StatusBar barStyle={barStyle} />
                        <Main />
                    </ThemeProvider>
                </Provider>
            </ApiProvider>
        </AppearanceProvider>
    );
}
export default observer(App);
