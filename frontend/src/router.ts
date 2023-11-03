import { createRouter, createWebHistory } from 'vue-router';

import Welcome from '~@/view/Welcome.vue';
import CreateDriver from '~@/view/CreateDriver.vue';
import CreatePassenger from '~@/view/CreatePassenger.vue';
import PassengerRide from '~@/view/PassengerRide.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Welcome
		},
		{
			path: '/driver',
			component: CreateDriver
		},
		{
			path: '/passenger',
			component: CreatePassenger
		},
		{
			path: '/ride',
			component: PassengerRide
		}
	]
})
