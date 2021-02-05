<template>
	<div class="tab-control">
		<div class="tab-control-item" v-for="(item,index) in titles " :class="{active:index===currentIndex}" @click="itemClick(index)"
		 :key="index">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		props: {
			titles: {
				type: Array,
				default () {
					return ['流行', '新款', '精选']
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit('tabClick', index)//向父组件传递点击值
			}
		}
	}
</script>

<style>
	.tab-control {
		display: flex;
		text-align: center;
		height: 44px;
		line-height: 44px;
		background-color: #fff;
		box-shadow: 0 1px 1px rgba(100,100,100,.2);
	}

	.tab-control-item {
		flex: 1;
	}

	.tab-control-item span {
		padding: 5px;
	}

	.active {
		color: var(--color-high-text);
	}

	.tab-control-item.active span {
		border-bottom: 2px solid var(--color-high-text);
	}
</style>
