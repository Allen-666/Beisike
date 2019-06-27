import request from "./http"
import params from "./params"
import mock from "@/mock/mock"
var url1="/json1811.ashx";
class Apls{
	//首页轮播接口
	GetBannerList(data){
		return request({
			method:"get",
			url:url1,
			params:data
		})
	}
	//首页商品接口
	GetIndexCakeList(data){
		return request({
			method:"get",
			url:url1,
			params:data
		})
	}
	NewIndexController(data){
		return request({
			method:"get",
			url:url1,
			params:data
		})
	}
	//imgClass
	GetNSCakeByName(data){
		return request({
			method:"get",
			url:url1,
			params:{
				Name: data.Name,
				c: 'NsCakeCenter',
				m: 'GetNSCakeByName',
				v: params.v
			}		
		})
	}
	//JZ
	GetjzCakeInfo(data){
		return request({
			method:"get",
			url:url1,
			params:{
				City: '上海',
				ProName: data.ProName,
				c: 'IndexCenter',
				m: 'GetjzCakeInfo',
				v: params.v
			}		
		})
	}
	//RP
	GetRuPCakeByName(data){
		return request({
			method:"get",
			url:url1,
			params:{
				Name: data.Name,
				c: 'NsCakeCenter',
				m: 'GetRuPCakeByName',
				v: params.v
			}		
		})
	}
	//详情
	GetCakeByName(data){
		return request({
			method:"get",
			url:url1,
			params:{
				City: '上海',
				ProName: data.ProName,
				c: 'Product',
				m:'GetCakeByName',
				v: params.v
			}		
		})
	}
	//分类
	GetJdListNew(data){
		return request({
			method:"get",
			url:url1,
			params:{
				c: 'NsCakeCenter',
				m:'GetJdListNew',
				v: params.v
			}		
		})
	}
	login(data){
		return mock.post("/login",{
		  data
		})
	  }
	
	  edit(data){
		return mock.post("/test",{
		  data
		})
	  }
}
export default new Apls();