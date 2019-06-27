import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/index";
import Store from "storejs";
Vue.use(Vuex);
//定义属性
const state={
	cartList:[],
	isLogin:false,
	count:0,
}
//定义同步方法
const mutations={
	vuexInit(state){
		state.cartList=Store.get("cartList")||[];
		// console.log(Store.get("cartList"));
		// isLogin
	},
	changeBool(state,data){
		state.cartList.forEach(item=>{
			if(item.id==data){
				item.bool=!item.bool
			  }
		})
	},
	add(state,data){
		let bool=true;
		if(state.cartList.length!=0){
			state.cartList.forEach((item)=>{
				if(item.id==data.id){
					item.num++;
					bool=false;
				}
			})
		}
		if(bool){
			data.num=data.num||1;
			state.cartList.push(data);
		}
		Store.set("cartList",state.cartList)
	}
}
//定义 computed(属性计算)
const getters={
	count(state){
		return state.num*state.price;
	}
}

//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={
	syFn(context){
		// context.state  可以取 state 属性
		// context.commit  //可以调用 mutations 同步方法 属性
		// context.dispatch //可以调用 actions 异步方法 属性
	},
	test(context,data){
		// console.log(data)
	}	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})