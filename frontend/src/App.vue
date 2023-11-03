<script setup lang="ts">

</script>

<template>
	<header class="h-14 bg-white shadow flex justify-center items-center">
		<nav>
			<router-link class="hover:text-blue-700" to="/driver">Driver</router-link> |
			<router-link class="hover:text-blue-700" to="/passenger">Passenger</router-link> |
			<router-link class="hover:text-blue-700" to="/ride">Ride</router-link>
		</nav>
	</header>
	<main class="p-4 flex justify-center">
		<router-view/>
	</main>
</template>

<style scoped>

</style>
