<script>
export default {
	props: {
		name: null,
		company: null,
		featured: false,
		price: 0,
	},
};
</script>

<template>
	<div class="single-component">
		<p>Product Name: {{ name }}</p>
		<p>Company Name: {{ company }}</p>
		<p>Price: {{ price }}</p>
		<p>Featured: {{ featured ? "Yes" : "No" }}</p>
	</div>
</template>

<style></style>
