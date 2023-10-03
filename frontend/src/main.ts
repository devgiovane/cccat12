import './style.css';

import { createApp } from 'vue';

import App from './App.vue';
import PassengerGatewayHttp from "./infra/gateway/PassengerGatewayHttp.ts";
import DriverGatewayHttp from "./infra/gateway/DriverGatewayHttp.ts";
import AxiosAdapter from "./infra/http/AxiosAdapter.ts";

const app = createApp(App);
const httpClient = new AxiosAdapter();
app.provide("passengerGateway", new PassengerGatewayHttp(httpClient));
app.provide("driverGateway", new DriverGatewayHttp(httpClient));
app.mount('#app')
