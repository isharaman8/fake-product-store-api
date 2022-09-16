<script>
export default {
	props: {
		name: null,
		company: null,
		featured: false,
		price: 0,
		createdAt: null,
	},
};
</script>

<template>
	<div class="single-component">
		<h2>{{ name }}</h2>
		<!-- <p><span class="bold">Product Name</span>: {{ name }}</p> -->
		<p><span class="bold">Company Name</span>: {{ company }}</p>
		<p><span class="bold">Price</span>: {{ price }}</p>
		<p><span class="bold">In Features</span>: {{ featured ? "Yes" : "No" }}</p>
		<p class="timestamps">
			<span class="bold">Created At</span>
			{{ new Date(createdAt).toDateString() }}
		</p>
	</div>
</template>

<style lang="scss">
@import "../../styles/singlecomponent.scss";
</style>
