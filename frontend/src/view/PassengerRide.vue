<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import RideGateway from "../infra/gateway/RideGateway.ts";
import GeoLocation from "../infra/geolocation/GeoLocation.ts";
import Ride, { RideBuilder } from "../domain/entity/Ride.ts";

const ride = ref<Ride>();
const rideBuilder = ref(new RideBuilder());
const rideGateway = inject("rideGateway") as RideGateway;
const geoLocation = inject("geoLocation") as GeoLocation

async function calculateRide() {
	try {
		ride.value = rideBuilder.value.build();
		ride.value?.setPrice(await rideGateway.calculate(ride.value));
	} catch (e: any) {

	}
}

async function requestRide() {
	try {
		ride.value?.setRideId(await rideGateway.request(ride.value));
	} catch (e: any) {

	}
}

onMounted(async () => {
	const coord = await geoLocation.getCoord();
	rideBuilder.value.fromLat = coord.getLat();
	rideBuilder.value.fromLong = coord.getLong();
});
</script>

<template>
	<section>
		<input class="ride-passenger-id" type="text" v-model="rideBuilder.passengerId">
		<input class="ride-from-lat" type="text" v-model="rideBuilder.fromLat"/>
		<input class="ride-from-long" type="text" v-model="rideBuilder.fromLong"/>
		<input class="ride-to-lat" type="text" v-model="rideBuilder.toLat"/>
		<input class="ride-to-long" type="text" v-model="rideBuilder.toLong"/>
		<button class="calculate-ride-button" @click="calculateRide">Calculate ride</button>
		<div v-if="ride">
			<div class="ride-price">{{ ride.getPrice() }}</div>
			<div class="ride-id">{{ ride.getRideId() }}</div>
			<button class="request-ride-button" @click="requestRide">Request ride</button>
		</div>
	</section>
</template>

<style scoped>

</style>
