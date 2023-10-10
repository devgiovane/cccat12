<script setup lang="ts">

</script>

<template>
	<nav>
		<router-link to="/driver">Create Driver</router-link> |
		<router-link to="/passenger">Create Passenger</router-link> |
		<router-link to="/passenger/ride">Passenger Ride</router-link>
	</nav>
	<main>
		<router-view/>
	</main>
</template>

<style scoped>

</style>
