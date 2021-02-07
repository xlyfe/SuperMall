<template>
	<div ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script scoped>
	import BScroll from 'better-scroll'
	export default {

		name: 'Scroll',
		props: {
			probeType: {
				type: Number,
				default: 0 //是数组或对象时，default必须是一个函数
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		methods: {
			//滚动到指定的位置，X坐标，Y坐标，时间默认500ms
			scrollTo(x, y, time = 500) {
				this.scroll.scrollTo(x, y, time)
			},
			//完成上拉加载
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp() //&&是逻辑与，第一个值 是真才会去判断执行下一个值
				// console.log('加载完成++++')
			},
			//刷新 页面
			refresh() {
				//&&是逻辑与，第一个值 是真才会去判断执行下一个值
				//this.scroll是判断是否scroll为空
				// console.log('刷新被调用')
				this.scroll && this.scroll.refresh()
			},
			//获取滚动位置坐标
			getScrollY() {
				return  this.scroll ? this.scroll.y : 0//如果scroll没有值 则返回0
			}
		},
		mounted() {
			//1、初始化better-scroll
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			// console.log(this.scroll)
			//2、监听滚动事件
			//只有当probType=2或者3时和监听
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position) => {
					// console.log(position)
					this.$emit('ptn', position) //返回值 
				})
			}

			//3、监听上拉事件
			if (this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					// console.log('到底了')
					this.$emit('pullingUp') //回调
				})
			}
		}
	}
</script>

<style>

</style>
