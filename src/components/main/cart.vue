<template>
    <div id="car">
        <div class="kong" v-if="this.$store.state.cartList.length==0">购物车是空的哦~</div>
        <div class="gain" v-for="(item,index) in $store.state.cartList" :key="index">
             <img
            v-if="item.bool"
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              class="img1"
              @click="sel(item.id)"
            >
            <img
            v-else
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
              class="img1"
              @click="sel(item.id)"
            >


            <img class="cake" :src="item.url" alt="" @click="toshow(item)">
            <div>
                <p class="cakeName">{{item.Name}}</p>
                <div class="cakeSize">
                  <span class="size">{{item.Size}}</span>
                  <span class="p1">
                    <img class="jian" src="https://res.bestcake.com\m-images\order\reduce-1.png" alt="" @click="del(item,item.num)">
                    <span>{{item.num}}</span>
                    <img class="jia" src="https://res.bestcake.com\m-images\order\add.png" alt=""  @click="add(item,item.num)">
                  </span>
                </div>
                <p class="cakePrice">{{item.CurrentPrice*item.num|setPrice}}</p>
            </div>
            <p class="p2"><span class="span1">优惠方式</span><span class="span2">不参与活动</span></p>
        </div>

        <div class="show">
            <div class="theme">
                <p class="p1">Hot&nbsp;&nbsp;Recommend</p>
                <div class="xian"></div>
                <p class="p2">热销新品推荐</p>
            </div>
            <ul class="newlist">
                <li>
                    <img class="cake" src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt="">
                    <p class="cakeName">伴手礼系列-吉致生巧</p>
                    <p><span class="price">168.00</span><span class="unit">/1盒</span><img class="buy" src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt=""></p>
                </li>
                <li>
                    <img class="cake" src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt="">
                    <p class="cakeName">伴手礼系列-吉致生巧</p>
                    <p><span class="price">68.00</span><span class="unit">/16粒装</span><img class="buy" src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt=""></p>
                </li>
                <li>
                    <img class="cake" src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt="">
                    <p class="cakeName">伴手礼系列-吉致生巧</p>
                    <p><span class="price">88.00</span><span class="unit">/0.8磅</span><img class="buy" src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt=""></p>
                </li>
            </ul>
        </div>
        <div class="count">
             <img class="chose" src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"  @click="allSel"  v-if="bools">
            <img class="chose" src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" @click="allSel" v-else>
            <div class="all">全选</div>
            <div class="none" @click="clear">清空</div>
            <div class="num">
                <p><span>合计:</span><span class="price">{{allPrice}}</span></p>
                <p><span>已优惠:</span><span>0.00</span></p>
            </div>
            <div class="end" @click="isLogin()">结算</div>
        </div>
    </div>
</template>

<script>
import Store from "storejs";
export default {
  data() {
    return {
      num: 1,
      allPrice: 0,
      cartList:[],
      clearList:[],
      bools:true,     
    };
  },
  methods: {
    isLogin(){
       if (!Store.get("userInfo")) {
        this.$router.push({
            path: "/user"
          });
      } else {
        this.userInfo = Store.get("userInfo");
        this.$router.push({
            path: "/edit"
          });
      }
    },
    allSel(){
      this.bools=!this.bools
      this.$store.state.cartList.forEach(item=>{
        if(item.bool!=this.bools){
          item.bool=this.bools
        }
      })
       this.allPrices()
    },
    allSels(){
        this.bools=true
        this.$store.state.cartList.forEach(item=>{
            if(!item.bool){
              this.bools=false
              return
            }
        })

    },
    toshow(item) {
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },
    clear(){
        var clearList=[];
        this.cartList.forEach(item=>{
          if(!item.bool){
            clearList.push(item)
          }
          this.$store.state.cartList=clearList
          this.cartList=clearList
          this.allPrices()
        })
    },
    sel(id) {
      // this.cartList[index].bool = !this.cartList[index].bool;
        this.$store.commit('changeBool',id)
        // console.log(this.$store.state.cartList)
        this.allPrices()
        this.allSels()
    },
    add(item, num) {
      this.$store.state.cartList.forEach(ele => {
        if (item.id == ele.id) {
          ele.num++;
        }
      });
      this.$store.state.count++;
      this.allPrices()
    },
    del(item, num) {
       if (item.num <= 1) {
        return
      }
      
      this.$store.state.cartList.forEach(ele => {
        if (item.id == ele.id) {
          ele.num--;
           this.$store.state.count--;
        }       
      });
     
     
      this.allPrices()
    },
    pageInit() {
      var num = 0;
      var cartList = this.$store.state.cartList;
      cartList.forEach(item => {
        item.bool = true;
        num += item.CurrentPrice * item.num;
      });
      this.cartList = cartList;
      this.allPrice = num;
    },
    allPrices(){
        this.allPrice=0;
        this.$store.state.cartList.forEach(item=>{
          if(item.bool){
           this.allPrice+=item.num*item.CurrentPrice
          }
        })
    }
  },
  mounted() {
    this.pageInit();
    // this.allPrices()
  }
};
</script>
<style scoped lang="scss">
#car {
  background: #f7f7f7;
  .kong {
    width: 100%;
    height: 60px;
    background: #fff;
    text-align: center;
    color: #141414;
    font-size: 12px;
    line-height: 60px;
  }
  .gain {
    background: #fff;
    width: 100%;
    .img1 {
      width: 20px;
      height: 20px;
      margin: 40px 10px;
    }
    .cake {
      width: 114px;
      height: 106px;
    }
    div {
      float: right;
      width: 55%;
      height: 77px;
      .cakeName {
        font-size: 16px;
        line-height: 18px;
        margin-top: 30px;
        width: 100%;
      }
      .cakeSize {
        width: 100%;
        font-size: 12px;
        color: #ccc;
        height: 25px;
        margin: 4.5px 0;
        line-height: 25px;
        .p1 {
          margin-left: 50%;
          .jian {
            width: 10px;
            height: 10px;
          }
          sapn {
            color: #333;
            font-size: 16px;
            display: block;
            width: 32px;
            margin: 0 15px;
          }
          .jia {
            width: 10px;
            height: 10px;
          }
        }
      }
      .cakePrice {
        width: 100%;
        font-size: 13px;
        color: #030303;
        font-weight: bold;
      }
    }
    .p2 {
      height: 48px;
      padding-left: 46px;
      line-height: 48px;
      border-bottom: 15px solid #f7f7f7;
      .span1 {
        color: #f2495e;
        font-size: 14px;
        font-weight: bold;
        margin-right: 5px;
      }
      .span2 {
        color: #333;
        font-size: 14px;
      }
    }
  }
  .show {
    margin-top: 52px;
    background: #f7f7f7;
    box-sizing: border-box;
    padding: 64.5px 0 0 13.5px;
    .theme {
      .p1 {
        line-height: 27px;
        color: #333;
        font-weight: bold;
        font-size: 24px;
        text-align: center;
      }
      .xian {
        height: 2px;
        background: #333;
        width: 50%;
        margin: 7.5px 0 7.5px 84px;
      }
      .p2 {
        line-height: 15px;
        color: #333;
        font-weight: bold;
        font-size: 15px;
        text-align: center;
        padding-bottom: 52px;
      }
    }
    .newlist {
      width: 100%;
      height: 600px;
      li {
        float: left;
        width: 50%;
        box-sizing: border-box;
        padding: 0 6.5px 31px 0;
        .cake {
          width: 100%;
          height: 100%;
          display: block;
        }
        .cakeName {
          line-height: 18px;
          font-size: 14px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 4.5px;
          font-weight: bold;
        }
        p {
          .price {
            font-size: 13px;
            color: #333;
            line-height: 25px;
            font-weight: bold;
          }
          .unit {
            font-size: 13px;
            color: #333;
            line-height: 25px;
            font-weight: bold;
          }
          .buy {
            width: 21px;
            height: 21px;
            float: right;
          }
        }
      }
    }
  }
  .count {
    position: fixed;
    bottom: 52px;
    width: 100%;
    height: 56px;
    background: #fff;
    line-height: 56px;
    .chose {
      width: 20px;
      height: 20px;
      float: left;
      margin: 16px 10px;
    }
    .all {
      width: 10%;
      float: left;
      font-size: 15px;
      color: #333;
      font-size: 15px;
      margin-right: 15px;
    }
    .none {
      width: 10%;
      float: left;
      font-size: 13px;
      color: #333;
    }
    .num {
      line-height:14px;
      width:30%;
      float: left;
      text-align: right;
      margin-top: 10px;
      margin-right: 20px;
      .price {
        font-size: 18px;
        color: #f2495e;
      }
      span {
        font-weight: 400;
        line-height: 19px;
        color: #333;
         font-size: 12px;
      }
    }
    .end {
      width: 30%;
      float: left;
      background: #02d4d7;
      color: white;
      font-weight: bolder;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>


