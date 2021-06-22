import * as Localization from 'expo-localization';
import axios from "axios";
import conf from "../config";
const _locale = Localization.locale.includes('ru') ? 'ru-RU' : 'en';

axios.interceptors.request.use(async (config) => {
    config.baseURL = conf.baseUrl;
    config.timeout = 10000;
    config.params = {...config.params, _locale};
    config.withCredentials = true;
    return config;
});

export default axios;