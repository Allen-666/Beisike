import { Tabbar, TabItem } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';

export default (Vue)=>{
	// console.log(Vue);
	// 定义全局组件

	
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.prototype.$eventHub=new Vue();

	Vue.component("test",{
		template:"<h1>hello Vue</h1>"
	})
	
}
