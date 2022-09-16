<script>
import axios from "axios";
import { PROD_API } from "../constants/api";
import LoadingScreen from "../components/LoadingScreen.vue";
import SingleComponent from "../components/Home/SingleComponent.vue";
export default {
	data: () => {
		return {
			loading: false,
			products: [],
		};
	},
	created() {
		this.loading = true;
		const API = `${PROD_API}/api/v1/products`;
		axios
			.get(API)
			.then((data) => {
				console.log(data.data);
				if (data.data.products) this.products = data.data.products;
				else throw new Error("Something went wrong");
			})
			.catch((err) => console.log(err))
			.finally(() => {
				this.loading = false;
			});
	},
	components: { LoadingScreen, SingleComponent },
};
</script>

<template>
	<div id="home_box" v-if="!loading">
		<h1>View Products</h1>
		<div class="grid">
			<SingleComponent
				name="Modern Bookshelf"
				price="31"
				:featured="true"
				company="Caressa"
			/>
		</div>
	</div>
	<LoadingScreen v-else />
</template>

<style lang="scss">
@import "../styles/home.scss";
</style>
