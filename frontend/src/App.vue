<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from "./components/Navbar.vue";
import "./style.css";
export default {
	components: {
		Navbar,
	},
};
</script>

<template>
	<Navbar />
	<RouterView />
</template>

<style scoped></style>
