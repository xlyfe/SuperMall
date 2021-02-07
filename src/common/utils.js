//防抖函数(要执行的函数，延迟时间ms)
 export function debounce(fn, delay) {
 	let timer = null;
 	return function(...args) {
 		if (timer) clearTimeout(timer) //清除以前的计时器
 		timer = setTimeout(() => {
 			//延迟过后执行传入进来的函数fn
 			fn.apply(this, args)
 		}, delay)
 	}

 }
