<template>
	<swiper>
		<swiper-item v-for="item in banners" :key="item.index">
			<a :href="item.link">
				<img :src="item.image" @load="imageLoad">
			</a>

		</swiper-item>
	</swiper>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from 'components/common/swiper'
	export default {
		name: 'HomeSwiper',
		props: {
			banners: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: true
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			//图片加载完后，把结果发送给父组件
			imageLoad() {
				if (this.isLoad) {
					this.$emit('imageLoad')
					this.isLoad = false//只发送一次后，设置为false
				}
			}
		}
	}
</script>

<style>
</style>
