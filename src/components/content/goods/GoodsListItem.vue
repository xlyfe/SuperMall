<template>
	<div class="goods-item">
		<a href="">
			<img :src="goodsItem.goods_small_logo" @load="imageLoad">
			<div class="goods-info">
				<p>{{goodsItem.goods_name}}</p>
				<span class="price">￥{{goodsItem.goods_price}}</span>
				<span class="collect">库存：{{goodsItem.goods_number}}</span>
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		name:'GoodsListItem',
		props:{
			goodsItem:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			imageLoad(){
				// console.log('imageLoad。。。')
				//1、要先在main.js中创建$Bus实例：Vue.prototype.$Bus=new Vue()
				//事件总线$Bus回传，然后在Home中接收并处理。放在Created中监听
				
				this.$bus.emit('ItemImageLoad')
			}
		}
	}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
