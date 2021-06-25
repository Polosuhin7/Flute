import {observable} from "mobx";

const config = {
    baseUrl: 'http://192.168.0.106:1337',
    isDebug: false,
    GOOGLE_MAPS_APIKEY: 'AIzaSyCCIL6IElRINVk6av4vCNuK4H0k3W'
};

export default observable(config);
