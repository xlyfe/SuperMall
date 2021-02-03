<template>
	<nav-bar class="home-nav">
		<div slot="center">购物街</div>
	</nav-bar>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import {
		getHomeMulitdata
	} from 'network/home.js'
	export default {
		name: "Home",
		data() {
			return {
				banners:[],
				recommends:[]
			}
		},
		components: {
			NavBar
		},
		created() {
			getHomeMulitdata().then(res => {
				console.log(res)
				this.banners=res.data.banner.list//Banner数据列表
				this.recommends=res.data.recommend.list//推荐数据列表
			})
		}
	}
</script>

<style>
	.home-nav {
		background-color: var(--color-tint);
		color: white;
	}
</style>
