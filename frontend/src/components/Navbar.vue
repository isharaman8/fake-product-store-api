<script>
export default {
	data: () => {
		return {
			login_arr: ["Home", "Cart"],
		};
	},
};
</script>

<template>
	<div id="navbar">
		<h2 class="logo">Fake Product Store</h2>
		<ul class="horizontal-list">
			<li v-for="item in login_arr" :key="item">
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
