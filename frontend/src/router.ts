import { createRouter, createWebHistory } from 'vue-router';
import CreateDriver from '~@/view/CreateDriver.vue';
import CreatePassenger from '~@/view/CreatePassenger.vue';
import PassengerRide from '~@/view/PassengerRide.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/driver',
			component: CreateDriver
		},
		{
			path: '/passenger',
			component: CreatePassenger
		},
		{
			path: '/passenger/ride',
			component: PassengerRide
		}
	]
})
