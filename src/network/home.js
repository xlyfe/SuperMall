import {
	requesthm
} from './request.js'
import {
	request
} from "./network";

/* 
 请求首页基本数据
 轮播图数据
 推荐数据*/
export function getHomeMulitdata() {
	return request({
		// url:'/api/public/v1/home/swiperdata'
		url: '/home/multidata'
	})
}

/* 
 请求首页列表数据*/
export function getHomeGoods(type, page) {
	return requesthm({
		url: '/api/public/v1/goods/search',
		params: {
			cid: type,
			pagenum: page
		}

	})
}
