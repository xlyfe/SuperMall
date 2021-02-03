<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners" />
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import {		getHomeMulitdata	} from 'network/home.js'
	
	export default {
		name: "Home",
		data() {
			return {
				banners:[],
				recommends:[]
			}
		},
		components: {
			NavBar,
			HomeSwiper
		},
		//生命周期函数创建
		created() {
			//请求多个数据
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
