import axios from 'axios' //引入axios
//不再导出default,因为后期可能还会有别的实例，所以按实例导出
//如果后期axios不再维护，我们可以更换其它框架，只需要引入新的框架，然后再用promise封装一下就好了
//使用另外一个接口，由于老师的接口收费，所以改用另外一个免费接口
export function request(config, success, failure) {
	//4、最终实现

	//4.1、创建axios的实例
	const instance = axios.create({
		baseURL: 'https://api-hmugo-web.itheima.net',
		timeout: 5000
	})

	//4.2 axios拦截器
	//axios.interceptors// 全局拦截
	// instance.interceptors.request;//拦截请求
	// instance.interceptors.response;//拦截响应

//拦截请求
	instance.interceptors.request.use(config => {
			// console.log(config)
			return config //拦截完后，一定要返回，要不然后边的程序拿不到config这个数据
		},
		err => {
			// console.log(err)
		})
//响应拦截
	instance.interceptors.response.use(res => {
		// console.log(res)
		return res.data
	}, err => {
		console.log(err)
	})
	//4.3、直接返回 发送真正的网络请求结果
	return instance(config)


	// export function request(config, success, failure) {
	// 	//3、实现用promise
	// 	return new Promise((resolve,reject)=>{
	// 		//3.1、创建axios的实例
	// 		const instance = axios.create({
	// 			baseURL: 'https://api-hmugo-web.itheima.net',
	// 			timeout: 5000
	// 		})
	// 		//3.2、使用三个参数的方法   发送真正的网络请求
	// 		instance(config)
	// 			.then(res => {
	// 				resolve(res) //成功回调函数
	// 			})
	// 			.catch(err => {
	// 				reject(err) //失败回调函数
	// 			})
	// 	})



	// //1、创建axios的实例
	// const instance = axios.create({
	// 	baseURL: 'https://api-hmugo-web.itheima.net',
	// 	timeout: 5000
	// })



	// //1、使用三个参数的方法   发送真正的网络请求
	// instance(config)
	// 	.then(res => {
	// 		// console.log(res);
	// 		success(res) //成功回调函数
	// 	})
	// 	.catch(err => {
	// 		failure(err) //失败回调函数
	// 	})

	// //2、使用一个参数的方法   发送真正的网络请求
	// instance(config.baseConfig)
	// .then(res=>{
	// 	config.success(res)//成功回调函数
	// })
	// .catch(err=>{
	// 	config.failure(err)//失败回调函数
	// })
}




