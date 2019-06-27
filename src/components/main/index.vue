<template>
    <div id="warp">
      <!-- 定位 -->
      <div class="loc">
        <img class="loc_loc" src="https://res.bestcake.com/images/newIndex/localtion.png" @click="showCity()">
        <span class="loc_span">{{cityListThree}}</span>
        <img class="loc_more" src="https://res.bestcake.com/images/newIndex/more.png" >
     </div>
     <!-- 城市选择 -->
    <div class="big_city" v-show="bool">
       <div class="city">
       <div align="center" class="city_title">
         <label >
           选择城市
        </label>
       </div> 
      <div align="center" class="city_one">
       <ul class="city_one_ul">
         <li v-for="(item,index) in cityListOne" :key="index" @click="cityAdd(item,$event)"><a href="javascript:void(0);">{{item}}</a>
         </li> 
         </ul>
         </div> 
         <div align="center" class="city_two">
           <ul class="city_two_ul">
             <li v-for="(item,index) in cityListTwo" :key="index" @click="cityAdd(item,$event)"><a href="javascript:void(0);">{{item}}</a>
             </li>     
          </ul>
        </div>
      </div>
    </div>
     <!-- 轮播图 -->
      <div class="swipe">
          <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
              <img class="imgs" :src="item.ImgUrl" >   
          </mt-swipe-item>
          </mt-swipe>
      </div>
      <!-- 图标 -->
      <div class="ico">           
          <div v-for="(item,index) in iconList" :key="index">
             <img :src="item.ImgUrl">
             <span>{{item.ActName}}</span>
          </div>      
      </div> 
      <!-- NS -->
     <div class="imgClass">
           <img v-for="(item,index) in icoImgList" :key="index" :src="item.ImgUrl"  @click="toShow(item)">
      </div>
      <!-- 魔法猜心 -->
    <div class="tabs">
          <img src="https://res.bestcake.com/m-images-2/mofa.png" alt="">
          <p>
            任选一款，走进你的心
        </p>
          <div>
        <span v-for="(item,index) in tabClass" :key="index" @click="setTab(index)" :class="{selected:tabActive==index}">{{item}}</span> 
          </div>           
         <ul>
             <li v-for="(item,index) in activeList" :key="index" @click="toShow(item)">
                 <img :src="item.ImgUrl">
                 <p>{{item.Name}}</p>
                 <span class="span1">{{"￥"+item.CurrentPrice}}</span>
                 <span class="span2">{{"/"+item.Size}}</span>
             </li>
         </ul>
      </div> 
      <!-- 品质臻选 -->
     <div class="goodsList">
          <img class="zhenxuan" src="https://res.bestcake.com/m-images-2/pinzhi.png" alt="">
          <p>
            没尝过这些美味的人生，是不完美的
        </p>
          <ul>
              <li v-for="(item,index) in goodList" :key="index">
                 <img class="tu" v-lazy="item.ImgUrl"  @click="toShow(item)">
                 <div>
                 <p class="p1">{{item.Name}}</p>
                 <p class="p2">{{item.MoreUrl}}</p>
                 <div v-if="item.Brand.indexOf('乳品系列')!=-1">
                    <img class="img1" src="https://res.bestcake.com/m-images-2/icon_yx.png">
                 </div>
                 <div v-else>
                    <img class="img1" src="https://res.bestcake.com/m-images-2/icon_zy.png">
                 </div>
                 <span class="span1">{{"￥"+item.CurrentPrice}}</span>
                 <span class="span2">{{"/"+item.Size}}</span>
                 </div>
                  <div   @click="add(item)"><img class="car" src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" alt="" @click="addFly(item,$event)"></div>
              </li>
          </ul>
      </div> 
      <!-- 页尾文字  -->
    <div class="jg-gonggao">
          <div class="jg-gonggao1">
              <div class="left">划线价格</div>
              <div class="right">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
          </div>
          <div class="jg-gonggao1">
              <div class="left">未划线价格</div>
              <div class="right">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
          </div>
      </div>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
import params from "@/core/api/params";
export default {
  name: "HelloWorld",
  data() {
    return {
      bool:true,
      cityListThree:"",
      cityListOne:["上海","北京","天津","重庆"],
      cityListTwo:["苏州","无锡","南京","杭州","宁波","绍兴","成都","常州","台州","嘉兴"],
      bannerList: [],
      //焦点
      icoImgList: [
        {
          name: "宠爱少女",
          key: "宠爱少女",
          ImgUrl: "https://res.bestcake.com/m-images-2/guanggao1.png?v=0419"
        },
        {
          name: "小猪蛋糕-贝丽",
          key: "贝丽",
          ImgUrl: "https://res.bestcake.com/m-images-2/guangao22.png?v=0419"
        },
        {
          name: "星光游乐园",
          key: "星光游乐园",
          ImgUrl: "https://res.bestcake.com/m-images-2/guanggao3.png"
        }
      ],
      //class
      iconList: [],
      tabClass: ["送恋人", "送挚友", "送长者", "送亲子"],
      activeList: [],
      tabActive: 0,
      tabList: [],
      goodList: [],
      cartList: [],
      num: 0
    };
  },
  mounted() {
    Indicator.open();
    this.GetBannerList(res => {
      res.forEach(item => {
        item.ImgUrl = "https://res.bestcake.com/" + item.ImgUrl;
      });
      this.bannerList = res;
      Indicator.close();
    });
     this.NewIndexController(res=>{
      this.iconList=res.mainresult.TopIconList;
      console.log(this.iconList)
     });
    this.GetIndexCakeList(res => {
      res.list.forEach(item => {
        if (item.TabType == 4) {
          this.tabList.push(item);
        } else {
          this.goodList.push(item);
        }
      });
      Indicator.close();
      this.setTab(0);
    });
    
  },

  methods: {
    showCity(){
      this.bool=true;
    },
    cityAdd(item, e){
      this.cityListThree=item
      this.bool=false;
    },
    addFly(item, e) {
      this.flay(item, e);
    },
    //fly
    flay(item, e) {
      var flyer = $(
        `<img class="flyer-img" style="display:block;width: 80px;height:80px;"src="${
          item.ImgUrl
        }">`
      );
      var top = $(window).scrollTop();
      var dh = event.pageY;
      var newh = dh - top;
      //  购物车节点位置,决定图片飘的位置
      var oBtn = $(".cart").offset();
      var newdh = oBtn.top - top;
      flyer.fly({
        start: {
          left: event.pageX, //抛物体起点横坐标
          top: newh //抛物体起点纵坐标
        },
        end: {
          left: oBtn.left, //抛物体终点横坐标
          top: newdh //抛物体终点纵坐标
        },
        onEnd: function() {
          this.destory(); //销毁抛物体
        }
      });
    },
    //详情页
    toShow(item) {
      console.log(item);
      var data = {
        key: item.Name || item.key,
        c: item.SupplyNo || "NS"
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },
    //送人
    setTab(index) {
      var activeList = [];
      this.tabList.forEach(item => {
        if (this.tabClass[index] == item.ActiveName) {
          activeList.push(item);
        }
      });
      this.activeList = activeList.slice(0, 3);
      this.tabActive = index;
    },
    add(item) {
      var data = {
        id: item.Pid, //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
        SupplyNo: item.SupplyNo //产品货号类型
      };
      // console.log(data);
      this.$store.commit("add", data);
    },

    //轮播
    GetBannerList(callback) {
      var data = {
        v: params.v,
        c: "Index",
        m: "GetBannerList",
        Type: "2",
        City: "上海"
      };
      this.$apis.GetBannerList(data).then(res => {
        callback(res.data.Tag.List);
      });
    },
    //商品
    GetIndexCakeList(callback) {
      var data = {
        v: params.v,
        c: "Index",
        m: "GetIndexCakeList"
      };
      this.$apis.GetIndexCakeList(data).then(res => {
        callback(res.data.Tag);
      });
    },
    NewIndexController(callback) {
      var data = {
        v: params.v,
				c: 'NewIndexController',
				m: 'index'
      };
      this.$apis.NewIndexController(data).then(res => {
        callback(res.data.Tag);
      });
    },
  }
};
</script>
<style scoped lang="scss">
#warp {
  .loc {
    width: 100%;
    margin: 0  16px;
    height: 45px;
    .loc_loc {
      width: 18px;
      height: 22px;
      margin-top: 10px;
     
    }
    .loc_span {
      width: 28px;
      height: 44px;
      font-size: 14px;
      color: #333;
      text-align: center;
      margin-left:4px;
      line-height: 44px;
      position: absolute;
    }
    .loc_more {
      width: 10px;
      height: 18px;
       margin-left:40px;
    }
  }
  .big_city{
    display: block;
    width: 100%;
    height: 97vh;
    left: 0;
    top: 0;
    background: rgba(3,3,3,0.5);
    position: fixed;
    z-index: 99;
    .city{
    background: rgb(255, 255, 255);
    position: fixed; 
    width: 77.33vw; 
    left: 11.47vw; 
    top: 8.84vh; 
    z-index: 999999;
    .city_title{
      label{
        border-bottom: 0.15vw solid rgb(51, 51, 51); 
        display: block; 
        width: 20vw; 
        font-size: 4.26vw; 
        padding-top: 2.39vh; 
        padding-bottom: 1.79vh; 
        line-height: 3.37vh; 
        margin-bottom: 5.24vh;
      }
    }
    .city_one{
      .city_one_ul{
        width: 100%;
        height: 94px;
        margin-bottom:20px; 
        li{
          list-style:none;
          width: 96px;
          height: 32px;
          margin-bottom:15px;
          float: left;
          a{
            text-decoration: none;
            color: #333;
            width: 72px;
            height: 32px;
            display: block;
            font-size:14px; 
            line-height:32px;
            text-align: center; 
          }
        }
      }
    }
    .city_two{
      .city_two_ul{
         width: 100%;
        height: 248px;
        li{
          list-style:none;
          width: 96px;
          height: 32px;
          margin-bottom: 15px;
          float: left;
          a{
            text-decoration: none;
            color: #333;
            width: 72px;
            height: 32px;
            display: block;
            font-size:14px; 
            line-height:32px;
            text-align: center; 
          }
        }
      }
    }
  }
  }
  .swipe {
    width: 100%;
    height: r(200 * 2);
    .imgs {
      width: 100%;
      height: 100%;
    }
  }
  .ico {
    height: 220px;
    border-bottom: 10px solid #fafafa;
    div {
      width: 18%;
      height: 90px;
      text-align: center;
      float: left;
      margin: 3%;
      img {
        // display: inline;
        width: 100%;
      }
    }
  }
  .imgClass {
    width: 100%;
    height: 190px;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 10px solid #fafafa;
    img {
      width: 46%;
      float: left;
      margin: 5px;
    }
  }
  .tabs {
    border-bottom: 10px solid #fafafa;
    padding-top: 25px;
    img {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
      margin-bottom: 30px;
    }
    div {
      margin-bottom: 10px;
      padding: 0 15px;
      width: 100%;
      height: 33px;
      box-sizing: border-box;
      span {
        width: 20%;
        background: url(https://res.bestcake.com/m-images-2/mofa-1.png)
          no-repeat center center;
        text-align: center;
        line-height: 33px;
        display: block;
        color: #333;
        float: left;
        margin: 0 2%;
        background-size: 100% 100%;
      }
      .selected {
        color: #fff;
        background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
      }
    }
    ul {
      box-sizing: border-box;
      padding: 0 20px 20px 15px;
      margin-bottom: 10px;
      height: 200px;
      li {
        list-style: none;
        width: 30%;
        height: 100%;
        float: left;
        margin: 0 5px;
        img {
          //   display: inline;
          width: 106px;
          height: 90px;
        }
        p {
          font-size: 14px;
          color: #333;
        }
        .span1 {
          color: rgb(255, 51, 0);
          font-size: 16px;
        }
        .span2 {
          color: rgb(212, 212, 212);
        }
      }
    }
  }

  .goodsList {
    padding-top: 25px;
    .zhenxuan {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
      margin-bottom: 30px;
    }
    ul {
      padding: 0 15px;
      margin-bottom: 12px;
      li {
        position: relative;
        list-style: none;
        width: 100%;
        height: 110px;
        margin-bottom: 12px;
        .tu {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
        }
        div {
          width: 180px;
          margin-left: 110px;
          text-align: left;
          .p1 {
            color: #333;
            font-size: 16px;
            text-align: left;
            margin-top: 4px;
            margin-bottom: 0;
            height: 25px;
            line-height: 25px;
            overflow: hidden;
          }
          .p2 {
            color: #999;
            text-align: left;
            margin-bottom: 4px;
            margin-top: 0;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
          }
          div {
            margin-left: 0;
            .img1 {
              display: block;
              width: 32px;
              height: 18px;
              margin-left: 0;
              margin: 4px 0;
            }
          }
          .span1 {
            color: rgb(255, 51, 0);
            font-size: 16px;
          }
          .span2 {
            color: rgb(212, 212, 212);
          }
        }
        .car {
          display: block;
          width: 42px;
          height: 42px;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .jg-gonggao {
    padding: 8px 0;
    height: 184px;
    width: 100%;
    margin-bottom: 60px;
    .jg-gonggao1 {
      margin: 15px;
      height: 66px;
      .left {
        color: #181818;
        font-size: 14px;
        width: 25%;
        height: 66px;
        float: left;
      }
      .right {
        color: #a2a2a2;
        font-size: 14px;
        line-height: 22px;
        width: 75%;
        float: right;
      }
    }
  }
}
</style>
