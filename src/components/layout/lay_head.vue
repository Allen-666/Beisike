<template>
    <div>
       <span class="cart" 
       style="position:fixed;
       bottom:35px;
       left:65%;
       width:18px;
       height:18px;
       background:#f2495e;
       display:block;
       border-radius:50%;
       text-align: center;
      line-height:18px;
      font-size: 12px;
      color: #fff;
      z-index:50;" v-if="!($route.path=='/show')">{{$store.state.cartList.length}}</span>
        <mt-tabbar v-model="selected" :fixed="true">
        <mt-tab-item v-for="(item,index) in routePath" :key="index" :id="item.key" @click.native="toPath(index)" v-if="!($route.path=='/show')">
            <!-- <img slot="icon" src="../assets/100x100.png"> -->
            <p style="margin:5px 0;"><i :class="item.ico"></i></p>
            {{item.name}}
        </mt-tab-item> 
        </mt-tabbar>
        
    </div>
</template>

<script>
export default {
  name: "HelloWord",
  data() {
    return {
      selected: "",
      routePath: [
        { name: "首页", path: "/index",key:"index",ico:['fa', 'fa-home', 'fa-lg']},
        { name: "分类", path: "/class",key:"class",ico:['fa', 'fa-bars', 'fa-lg']},
        { name: "购物车", path: "/cart",key:"cart",ico:['fa', 'fa-cart-plus', 'fa-lg']},
        { name: "我的", path: "/user",key:"user",ico:['fa', 'fa-user-circle-o', 'fa-lg']},
      ]
    };
  },
  methods: {
    toPath(index) {    
      this.$router.push({
        path: this.routePath[index].path,
      });
    }
  }
};
</script>
<style>

</style>
