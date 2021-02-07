<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<tab-control ref="TabControlA" :titles="['小米', '三星', '创维', '索尼', 'TCL']" @tabClick="tabControlClick" class="tab-control"
		 v-show="isTabFixed" />
		<better-scroll class="wrapper" ref="bscroll" :probe-type="3" @ptn="positionScroll" :pull-up-load="true" @pullingUp="loadMore">
			<home-swiper :banners="banners" @imageLoad="swiperImageLoad" />
			<recommend-view :recommends="recommends" />
			<feature-view />
			<tab-control ref="TabControlB" :titles="['小米', '三星', '创维', '索尼', 'TCL']" @tabClick="tabControlClick" />
			<goods-list :goods="showGoods" />
		</better-scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 组件的原生事件点击要用.native -->
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'

	import BetterScroll from 'components/common/scroll/Scroll.vue'

	import BackTop from 'components/content/backTop/BackTop.vue'

	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import {
		debounce
	} from 'common/utils.js' //非Default所以要加{}

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
				currentType: 'mi', //当前默认的点击分类
				isShowBackTop: false, //是否显示回到顶部图标
				tabOffsetTop: 0, //tabControl的offsetTop值
				isTabFixed: false, //tabControl是否吸顶
				saveY: 0 //位置信息
			}
		},
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			BetterScroll,
			BackTop
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
		activated() {//活跃时
			this.$refs.bscroll.scrollTo(0,this.saveY,0)
			this.$refs.bscroll.refresh()//最好是刷新一次
		},
		deactivated() {//离开时
			this.saveY=this.$refs.bscroll.getScrollY()
		},
		mounted() {
			//1、定义防抖函数
			const fangdou = debounce(this.$refs.bscroll.refresh, 20) //这里的函数不能再括号(),因为带了括号就是传入的函数的执行完后的返回值了
			//事件总线监听
			this.$bus.on('ItemImageLoad', () => {
				// console.log('ItemImageLoad...')
				// this.$refs.bscroll.scroll.refresh()//刷新页面
				//如果不用防抖函数，这里被调用N多次，有多少图片就调用多少次
				// this.$refs.bscroll.refresh() //直接调用scroll.vue中的自定义的refresh方法
				//使用防抖函数
				fangdou() //执行

			})

			//2、获取tabControl的offsetTop
			//组件 是没有offsetTop属性的，所以没有办法直接获取
			//这样获取的数值不正确，主要是因为图片没有加载完，计算出来的高度不对
			// console.log(this.$refs.TabControl.$el.offsetTop)

		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		//方法,()
		methods: {
			/* 事件监听相关的方法 */

			//tabControl点击事件
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
				this.$refs.TabControlA.currentIndex = index
				this.$refs.TabControlB.currentIndex = index
			},
			//回到顶部的按钮点击
			backClick() {
				this.$refs.bscroll.scrollTo(0, 0)
				// console.log('backClick')
			},
			//滚动位置
			positionScroll(ps) {
				//1、 BackTop是否显示
				//console.log(ps)//显示结果 {x: 0, y: -564.747}
				this.isShowBackTop = ps.y < -1000 //如果ps.y的坐标小于1000显示

				//2、tabControl是否固定吸顶
				this.isTabFixed = ps.y < -this.tabOffsetTop
			},
			//加载更多
			loadMore() {
				// console.log('上拉加载更多...')
				this.getGoodsList(this.currentType)
				this.$refs.bscroll.finishPullUp() //上拉完成
			},
			//Swrapper图片加载
			swiperImageLoad() {
				// console.log(this.$refs.TabControl.$el.offsetTop)
				this.tabOffsetTop = this.$refs.TabControlB.$el.offsetTop
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

<style scoped>
	#home {
		height: 100vh;
		position: relative;
		/*子绝父相*/
	}

	.home-nav {
		background-color: var(--color-tint);
		color: white;
		position: relative;
		z-index: 9;
		/* position: relative;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}

	/* .tab-control {
		position: relative;
			top: 44px; 
		z-index: 8;
	} */

	/*滚动内容高度*/
	.wrapper {
		position: absolute;
		/* 绝对定位 */
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

	.tab-control {
		position: relative;
		z-index: 9;
	}

	/* tabControl吸顶 这种方式没有办法实现，所以不用*/
	/* .fixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
	} */
	/* 滚动也可以用这种方式实现 
	.wrapper{
		height: calc(100%-93px);/* 上边Bar的高度是44，下边tabbar的高度是49，所以加一起一共是93px 
		overflow: hidden;
	}
		*/
</style>
