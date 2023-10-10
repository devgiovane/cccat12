<script setup lang="ts">
import {inject, ref} from "vue";
import PassengerGateway from "../infra/gateway/PassengerGateway.ts";
import Passenger, {PassengerBuilder} from "../domain/entity/Passenger.ts";

const error = ref("");
const passenger = ref<Passenger>();
const passengerBuilder = ref(new PassengerBuilder());
const passengerGateway = inject("passengerGateway") as PassengerGateway;

async function createPassenger() {
	try {
		passenger.value = passengerBuilder.value.build();
		const passengerId = await passengerGateway.create(passenger.value);
		passenger.value?.setPassengerId(passengerId);
		error.value = "";
	} catch (e: any) {
		error.value = e.message;
	}
}
</script>

<template>
	<section>
		<input class="passenger-name" v-model="passengerBuilder.name" placeholder="Name"/>
		<input class="passenger-email" v-model="passengerBuilder.email" placeholder="E-mail"/>
		<input class="passenger-document" v-model="passengerBuilder.document" placeholder="Document"/>
		<button class="create-passenger" @click="createPassenger()">
			Create Passenger
		</button>
		<div class="error">{{ error }}</div>
		<div v-if="passenger">
			<div class="passenger-id">{{ passenger.getPassengerId() }}</div>
		</div>
	</section>
</template>

<style scoped>

</style>
