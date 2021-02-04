<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners" />
		<recommend-view :recommends="recommends" />
		<feature-view />
		<tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>
		<ul>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			</ul>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	
	import TabControl from 'components/content/tabControl/TabControl.vue'
	
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
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl
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
	#home{
		padding-top: 44px;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: white;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.tab-control{
		position: sticky;
		top: 44px;
	}
</style>
