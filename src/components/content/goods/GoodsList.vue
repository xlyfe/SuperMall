<template>
	<div class="goods-list">
	<goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key='index' class="item"/>
		
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default{
		name:'GoodsList',
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;/* 包裹布局,以里边的item的实际宽度来 */
    padding: 5px;
    justify-content: space-around;/* item之间的间距均等分布局 */
  }

  .goods-list .item {
    width: 48%;
  }
</style>
