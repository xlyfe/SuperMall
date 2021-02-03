<template>
	<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	export default {
		name: "Home",
		components: {
			NavBar
		}
	}
</script>

<style>
	.home-nav{
		background-color: var(--color-tint);
		color: white;
	}
</style>
