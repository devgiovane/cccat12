<script setup lang="ts">
import {inject, ref} from "vue";
import DriverGateway from "../infra/gateway/DriverGateway.ts";
import Driver, {DriverBuilder} from "../domain/entity/Driver.ts";

const error = ref("");
const driver = ref<Driver>();
const driverBuilder = ref(new DriverBuilder());
const driverGateway = inject("driverGateway") as DriverGateway;

async function createDriver() {
	try {
		driver.value = driverBuilder.value.build();
		const driverId = await driverGateway.create(driver.value);
		driver.value?.setDriverId(driverId);
		error.value = "";
	} catch (e: any) {
		error.value = e.message;
	}
}
</script>

<template>
	<section>
		<input class="driver-name" v-model="driverBuilder.name" placeholder="Name"/>
		<input class="driver-email" v-model="driverBuilder.email" placeholder="E-mail"/>
		<input class="driver-document" v-model="driverBuilder.document" placeholder="Document"/>
		<input class="driver-carPlate" v-model="driverBuilder.carPlate" placeholder="Car plate"/>
		<button class="create-driver" @click="createDriver()">
			Create Driver
		</button>
		<div class="error">{{ error }}</div>
		<div v-if="driver">
			<div class="driver-id">{{ driver.getDriverId() }}</div>
		</div>
	</section>
</template>

<style scoped>

</style>
