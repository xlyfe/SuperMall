<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<home-swiper :banners="banners" />
		<recommend-view :recommends="recommends" />
		<feature-view />
		<tab-control class="tab-control" :titles="['小米', '三星', '创维', '索尼', 'TCL']" @tabClick="tabControlClick" />
		<goods-list :goods="showGoods" />

	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'

	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import {
		getHomeMulitdata,
		getHomeGoods
	} from 'network/home.js'

	export default {
		name: "Home",
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'mi': { //12
						cid: 12,
						page: 0,
						list: []
					},
					'samsung': { //
						cid: 15,
						page: 0,
						list: []
					},
					'skyworth': { //
						cid: 9,
						page: 0,
						list: []
					},
					'sony': { //
						cid: 17,
						page: 0,
						list: []
					},
					'tcl': { //
						cid: 10,
						page: 0,
						list: []
					}
				},
				currentType: 'mi' //当前默认的点击分类
			}
		},
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList
		},
		//生命周期函数创建
		created() {
			//请求多个数据
			this.getHomeBaseData()
			//请求商品列表
			this.getGoodsList('mi') //小米
			this.getGoodsList('samsung') //三星
			this.getGoodsList('skyworth') //创维
			this.getGoodsList('sony') //索尼
			this.getGoodsList('tcl') //TCL

		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		//方法
		methods: {
			/* 事件监听相关的方法 */
			tabControlClick(index) {
				switch (index) {
					case 0:
						this.currentType = "mi"
						break
					case 1:
						this.currentType = "samsung"
						break
					case 2:
						this.currentType = "skyworth"
						break
					case 3:
						this.currentType = "sony"
						break
					case 4:
						this.currentType = "tcl"
						break
				}

			},


			/* 网络请求相关的方法 */
			//请求基本数据
			getHomeBaseData() {
				getHomeMulitdata().then(res => {
					// console.log(res)
					this.banners = res.data.banner.list //Banner数据列表
					this.recommends = res.data.recommend.list //推荐数据列表
				})
			},
			//请求商品列表数据，cid是分类的id
			getGoodsList(type) {
				// console.log(this.goods[type])
				const page = this.goods[type].page + 1
				getHomeGoods(this.goods[type].cid, page).then(res => {
					this.goods[type].list.push(...res.message.goods) ///三个点...表示把后边的数组解析出来，变成每一个独立的数据循环遍历出来
					this.goods[type].page += 1
				})
			}
		}
	}
</script>

<style>
	#home {
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

	.tab-control {
		position: sticky;
		top: 44px;
		z-index: 8;
	}
</style>
