import {observable} from "mobx";
import {BASE_URL} from '@env'

const config = {
    // baseUrl: 'http://172.20.10.4:1337',
    baseUrl: BASE_URL || 'https://flute-service.herokuapp.com',
    isDebug: false,
    GOOGLE_MAPS_APIKEY: 'AIzaSyCCIL6IElRINVk6av4vCNuK4H0k3W'
};

export default observable(config);
