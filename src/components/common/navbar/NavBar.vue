<template>
	<div class="nav-bar">
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="center">
			<slot name="center"></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NavBar'
	}
</script>

<style scoped="scoped">
	.nav-bar {
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		box-shadow: 0 1px 1px rgba(100,100,100,0.9);/*X偏移量, Y偏移量 , 阴影大小, rgba值（红，绿，蓝，透明度） */
	}

	.left, .right {
		width: 60px;

	}

	.center {
		/* 占据全行 */
		flex: 1;
		

	}
</style>
