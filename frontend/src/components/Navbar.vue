<script>
export default {
	data: () => {
		return {
			login_arr: ["Home", "Cart"],
			current_select: {
				Home: true,
				Cart: false,
			},
		};
	},
	methods: {
		handleCurrentSelect(value) {
			if (value === "Home") {
				this.current_select["Home"] = true;
				this.current_select["Cart"] = false;
			} else {
				this.current_select["Home"] = false;
				this.current_select["Cart"] = true;
			}
		},
	},
	watch: {
		current_select(new_val) {
			console.log(`Current selected tab:`, new_val);
		},
	},
};
</script>

<template>
	<div id="navbar">
		<h2 class="logo">Fake Product Store</h2>
		<ul class="horizontal-list">
			<li
				@click="handleCurrentSelect(item)"
				v-for="item in login_arr"
				:key="item"
				:class="{ underline: current_select[item] }"
			>
				<router-link
					style="text-decoration: none; color: black"
					class="nav-link"
					:to="item === 'Home' ? '/' : item"
					>{{ item }}</router-link
				>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
