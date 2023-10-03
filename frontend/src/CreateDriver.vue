<script setup lang="ts">
	import { inject, ref } from "vue";
	import DriverGateway from "./infra/gateway/DriverGateway.ts";

	const name = ref("");
	const email = ref("");
	const document = ref("");
	const carPlate = ref("");
	const driverId = ref("");

	const driverGateway = inject("driverGateway") as DriverGateway;

	async function createDriver() {
		const input = {
			name: name.value,
			email: email.value,
			document: document.value,
			carPlate: carPlate.value
		}
		const output = await driverGateway.save(input);
		driverId.value = output.driverId;
	}
</script>

<template>
	<section>
		<input class="driver-name" v-model="name" placeholder="Name"/>
		<input class="driver-email" v-model="email" placeholder="E-mail" />
		<input class="driver-document" v-model="document" placeholder="Document"/>
		<input class="driver-carPlate" v-model="carPlate" placeholder="Car plate"/>
		<button class="create-driver" @click="createDriver()">
			Create Driver
		</button>
		<div class="driver-id">{{ driverId }}</div>
	</section>
</template>

<style scoped>

</style>
