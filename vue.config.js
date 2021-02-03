module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				// '@':'src',//这个别名是默认配置的，不需要再配置
				'views': '@/views',
				'components': '@/components',
				'network': '@/network',
				'common': '@/common',
				'assets': '@/assets',
				// 'router':'@/router',//只在main.js中引入一次，所以不需要设置
				// 'store':'@/store',//在所有文件中都可以通过this.$store拿到这个对象，不需要别名
			}
		}
	}
}
