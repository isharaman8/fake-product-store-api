<script>
import axios from "axios";
import { PROD_API } from "../constants/api";
export default {
	data: () => {
		return {
			loading: false,
		};
	},
	created() {
		this.loading = true;
		const API = `${PROD_API}/api/v1/products`;
		axios
			.get(API)
			.then((data) => console.log(data.data))
			.finally(() => {
				this.loading = false;
			});
	},
};
</script>

<template v-if="loading">
	<div id="home_box">
		<h1>Home Route</h1>
	</div>
</template>

<style lang="scss">
@import "../styles/home.scss";
</style>
