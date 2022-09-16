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
			page: 1,
		};
	},
	methods: {
		prevPage() {
			if (this.page <= 1) return;
			this.page--;
		},

		nextPage() {
			if (this.page >= 3) return;
			this.page++;
		},

		fetchProds() {
			this.loading = true;
			const API = `${PROD_API}/api/v1/products?page=${this.page}`;
			axios
				.get(API)
				.then((data) => {
					if (data.data.products) this.products = data.data.products;
					else throw new Error("Something went wrong");
				})
				.catch((err) => console.log(err))
				.finally(() => {
					this.loading = false;
				});
		},
	},

	watch: {
		page() {
			this.fetchProds();
		},
	},

	created() {
		this.fetchProds();
	},

	components: { LoadingScreen, SingleComponent },
};
</script>

<template>
	<div id="home_box">
		<h1>View Products</h1>
		<div class="pagination">
			<button @click="prevPage">Prev</button>
			<p>Page {{ page }} of 3</p>
			<button @click="nextPage">Next</button>
		</div>

		<div class="grid" v-if="!loading">
			<SingleComponent
				v-for="elem in products"
				:name="elem.name"
				:price="elem.price"
				:featured="elem.featured"
				:company="elem.company"
				:createdAt="elem.createdAt"
				:key="elem._id"
			/>
		</div>
		<LoadingScreen v-else />
	</div>
</template>

<style scoped lang="scss">
@import "../styles/home.scss";
</style>
