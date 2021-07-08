import {observable} from "mobx";

const config = {
    // baseUrl: 'http://192.168.0.104:1337',
    // baseUrl: 'https://flutes.herokuapp.com',
    baseUrl: 'https://flute-service.herokuapp.com',
    isDebug: false,
    GOOGLE_MAPS_APIKEY: 'AIzaSyCCIL6IElRINVk6av4vCNuK4H0k3W'
};

export default observable(config);
