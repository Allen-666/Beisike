<template>
  <div id="mesg">
      <div class="pic">
        <img src="https://avatars0.githubusercontent.com/u/22588905?v=4&s=120" alt="">
        <p class="nickName">{{userInfo.name}}</p>
      </div>
      <ul class="tab">
        <li v-for="(item,index) in tabList" :key="index" @click="one(index)" :class="{active:selNum==index}" >{{item}}</li>
      </ul>
  </div>
</template>

<script>
import Store from "storejs";
export default {
  data() {
    return {
      selNum:0,
      loginNum: 0,
      uname: "",
      upwd: "",
      userInfo: {},
      tabList:["所有订单","待收货","已收货","快递信息"]
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      if (!Store.get("userInfo")) {
        this.loginNum = 0;
      } else {
        this.userInfo = Store.get("userInfo");
        this.$router.push({
          path: "/edit"
        });
      }
    },
    one(index){
      this.selNum=index;
    }

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#mesg {
  .pic {
    width: 100%;
    height: 200px;

    background: #ddd;
    overflow: hidden;
    img {
      display: block;
      margin: 20px auto;
      border-radius: 50%;
    }
    .nickName {
      line-height: 40px;
      font-size: 18px;
      text-align: center;
      font-weight: 900;
    }
  }
  .tab {
    width: 100%;
    margin-top: 5px;
    li {
      width: 25%;
      float: left;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background: #ddd;
    }
    .active{
      background: #e8f0fe;
    }
  }
}
</style>