// import {request} from './request.js'
import {request} from "./network";

export function getHomeMulitdata(){
	return request({
		// url:'/api/public/v1/home/swiperdata'
		url: '/home/multidata'
	})
}