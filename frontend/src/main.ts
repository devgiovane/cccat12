import './style.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router.ts';
import AxiosAdapter from "./infra/http/AxiosAdapter.ts";
import RideGatewayHttp from "./infra/gateway/RideGatewayHttp.ts";
import DriverGatewayHttp from "./infra/gateway/DriverGatewayHttp.ts";
import PassengerGatewayHttp from "./infra/gateway/PassengerGatewayHttp.ts";
import GeoLocationNavigatorAdapter from "./infra/geolocation/GeoLocationNavigatorAdapter.ts";

const app = createApp(App);
const httpClient = new AxiosAdapter();
app.use(router);
app.provide("rideGateway", new RideGatewayHttp(httpClient));
app.provide("driverGateway", new DriverGatewayHttp(httpClient));
app.provide("passengerGateway", new PassengerGatewayHttp(httpClient));
app.provide("geoLocation", new GeoLocationNavigatorAdapter());
app.mount('#app')
