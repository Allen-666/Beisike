<template>
    <div id="show">  
      <!-- 轮播图     -->
       <div class="swipe">
          <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
              <img class="imgs" :src="item" >  
          </mt-swipe-item>
          </mt-swipe>
        </div> 
        <!-- 详情 -->
        <div class="info"> 
            <div class="nameBox">
            <p class="cakeName">{{showData.Name}}</p>
            <div class="ico"></div>
            </div>
            <ul  class="mesg">
               <li><span class="span1">甜度</span><span  class="span2"><img  class="img2" :src=url></span></li>  
               <li><span class="span1">口味</span><span class="span2" >{{showData.CategoryName}}</span></li>
              <li><span class="span1">原材料</span><span class="span2" >{{showData.Resourse||showData.Resource}}</span></li>
              <li><span class="span1">适合人群</span><span class="span2">所有人群</span></li>
              <li><span class="span1">保鲜条件</span><span class="span2">{{showData.KeepFresh||"最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"}}</span></li> 
            </ul>
            <div class="com">
                <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt=""><span class="span1">商品评价</span><span class="span2">(n条)<img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" alt=""></span>
            </div>
            <div class="des"> 
               <p v-for="(item,index) in sizeList" :key="index" @click="selSize(index)" :class="{selected:selNum==index}" >{{item.Size}}</p>       
              <ul>
                <li><img class="img1" src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112" alt=""><span class="span2">直径13.5cm</span></li>
                <li><img class="img1" src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt=""><span class="span2">适合4-5人分享</span></li>
                <li><img class="img1" src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt=""><span class="span2">含五人份餐具</span></li>
                <li><img class="img1" src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt=""><span class="span2">至少需提前一天预约</span></li>
              </ul>
            </div>
            <!-- 数量加减 -->
            <div class="count">
                <span class="span1">购买数量</span>
                <div class="div2">
                 <img class="img1"   src="https://res.bestcake.com/m-images/ww/detail/reduce-1.png" @click="setNum(true)"> 
                 <span>{{num}}</span>
                <img class="img1"  src="https://res.bestcake.com/m-images/ww/detail/add.png"  @click="setNum(false)">
                </div>
            </div>
            <!-- 底部购买   -->
             <div class="foot">
            <div> 
              <p class="p1" >{{ Number(priceList.CurrentPrice)*num||0}}</p>
              <p class="p2"><span class="span1">已优惠：</span><span class="span2">0.00</span></p>
            </div>
            <p class="p3" @click="add()">加入购物车</p>
            <p class="p4" @click="toCar()">立即购买</p>
            </div> 
          </div>  
          <!-- 页尾 -->
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
import { MessageBox } from 'mint-ui';
export default {
  name: "HelloWorld",
  data() {
    return {
       num: 1,
      bannerList: [],
      bannerInfos: [],
      sizeList: [],
      showData: {},
      selNum: 0,
      sweetList:[],
      activeList:{},
      priceList:[],
      url:"",
      lazBool:false
    };
  },
  mounted() {
    this.pageInit();
  },

  methods: {
    pageInit() {
      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          this.bannerInfos = res;
          // this.bannerInfos.push(res.data.Tag[5]);
          // console.log(this.bannerInfos);
        });
        this.setBannerList("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          this.bannerInfos = res;
          // this.bannerInfos.push(res.data.Tag.infos)
          // console.log( this.bannerInfos);
        });
        this.setBannerList("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          this.bannerInfos = res;
          // this.bannerInfos.push(res.data.Tag[0]);
          // console.log(res);
        });
        this.setBannerList("rp-detail");
      } else if (this.$route.query.c.indexOf("JZ") != -1) {
        // console.log(this.$route.query.c);
        this.GetjzCakeInfo(res => {
          this.bannerInfos = res;
          // console.log(res.data.Tag);
          // this.bannerInfos.push(res.data.Tag[0]);
        });
        this.setBannerList("jz-detail");
      }
    },
    setNum(bool){
      // console.log(bool)
      bool?this.num--:this.num++;
      if(this.num<=0)this.num=1;
    },
    selSize(index) {
      this.selNum = index;
      this.priceList = this.sizeList[index];
      // console.log(this.priceList)
    },
    toCar(){
      this.$router.push({
        path: "/cart",
      });
    },
    add() {
        var data = {
              id: this.sizeList[this.selNum].ID || this.sizeList[this.selNum].Id, //产品ID
              Name: this.showData.Name, //产品详情图片拼接,//贝利
              CurrentPrice: this.sizeList[this.selNum].CurrentPrice, //产品价格
              Size: this.sizeList[this.selNum].Size, //产品规格
              url: this.bannerList[0], //产品购物车显示图片
              SupplyNo: this.sizeList[this.selNum].SupplyNo, //产品货号类型
              num:this.num
            };
        MessageBox.confirm('是否加入购物车?').then(action => {
            this.$store.commit("add", data);
        },cancel => {
           return;
        });
    },
    setBannerList(path) {
      for (var i = 0; i < 4; i++) {
        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      }
    },
    //宠爱少女
    GetNSCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },
    GetjzCakeInfo(callback) {
      var data = {
        ProName: this.$route.query.key
      };
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    },
    GetRuPCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    }
  },
  watch: {
    bannerInfos: {
      handler() {
        var city = "上海";
        if (this.bannerInfos.data.Tag.length) {
          this.bannerInfos.data.Tag.forEach(item => {
            if (city == item.City) {
              //NS RP ID
              item.id = item.ID || item.Id;
              this.sizeList.push(item);
              this.sweetList = this.sizeList[0].Sweet;
              this.url = `https://res.bestcake.com/m-images/ww/jz/tiandu_${
                this.sweetList
              }.png`;
            }
          });
          if (this.sizeList.length == 0) {
            //JZ ID
            this.sizeList = this.bannerInfos.data.Tag;
            this.sweetList = this.sizeList[0].CakeType[0].Sweet;
            this.url = `https://res.bestcake.com/m-images/ww/jz/tiandu_${
              this.sweetList
            }.png`;
          }
          this.showData=this.sizeList[0]
          this.activeList=this.sizeList[0]
        } else {
          this.sizeList = this.bannerInfos.data.Tag.infos.CakeType; //第二级
          this.showData = this.bannerInfos.data.Tag.infos; //第一级(KSK) Id
          this.sweetList = this.sizeList[0].Sweet;
            this.url = `https://res.bestcake.com/m-images/ww/jz/tiandu_${
              this.sweetList
            }.png`;
             this.activeList=this.sizeList[0]

        }
        //调用
        this.selSize(0)
        //解决最先加载没有数据时的情况
        // this.lazBool=true;
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="scss">
#show {
  .swipe {
    width: 100%;
    height: r(445 * 2);
    .imgs {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    .nameBox {
      height: 60px;
      width: 60%;
      margin: 0 auto;
      margin-bottom: 30px;
      .cakeName {
        font-size: 16px;
        color: #333;
        text-align: center;
        font-weight: bold;
        margin: 8px 0 15px 0;
      }
      .ico {
        width: 100%;
        height: 30px;
      }
    }
    .mesg {
      border-top: 15px solid #f7f7f7;
      padding-top: 34px;
      height: 280px;
      li {
        width: 100%;
        // height: 100%;

        .span1 {
          display: block;
          width: 20%;
          margin-left: 15px;
          color: #9a9a9a;
          font-size: 14px;
          float: left;
        }
        .span2 {
          float: left;
          width: 72%;
          color: #252525;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 15px;
          .img2 {
            width: 85px;
            height: 16px;
          }
        }
      }
    }
    .com {
      border-top: 15px solid #f7f7f7;
      width: 100%;
      height: 22px;
      padding: 15px 0;
      img {
        width: 20px;
        height: 18px;
        margin: 0 15px;
      }
      .span1 {
        font-size: 14px;
        color: #333;
      }
      .span2 {
        font-size: 14px;
        color: #333;
        margin-left: 196px;
        padding-right: 15px;
        height: 22px;
        img {
          width: 8px;
          height: 14px;
          margin: 0;
        }
      }
    }
    .des {
      border-top: 15px solid #f7f7f7;
      padding-top: 34px;
      height: 195px;
      p {
        width: 50px;
        height: 28px;
        border: 1px solid #ddd;
        border-radius: 2px;
        color: #333;
        border: 1px solid #ddd;
        // padding: 0 14px;
        text-align: center;
        line-height: 28px;
        margin-left: 15px;
        float: left;
      }
      .selected {
        border: 1px solid #02d3d6;
        background: #02d3d6;
        color: #fff;
      }
      ul {
        margin-top: 42px;
        li {
          width: 50%;
          height: 24px;
          float: left;
          margin-bottom: 15px;
          .img1 {
            width: 22px;
            height: 22px;
            float: left;
            padding: 0 15px;
          }
          .span2 {
            color: #333;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 15px;
          }
        }
      }
    }
    .count {
      border-top: 15px solid #f7f7f7;
      height: 22px;
      width: 100%;
      padding: 15px 0;
      border-bottom: 30px solid #f7f7f7;
      .span1 {
        color: #333;
        font-size: 14px;
        line-height: 22px;
        margin-left: 15px;
      }
      .div2 {
        float: right;
        margin-right: 15px;
        .img1 {
          width: 10px;
          height: 10px;
        }
        span {
          color: #333;
          font-size: 14px;
          padding: 0 10px;
        }
      }
    }
    .foot {
      position: fixed;
      bottom: 0;
      background: #fff;
      width: 100%;
      height: 54px;
      display: flex;
      div {
        width: 40%;
        margin-left: 15px;
        .p1 {
          color: rgb(255, 51, 0);
          font-size: 16px;
          height: 27px;
          line-height: 27px;
        }
      }
      .p3 {
        width: 30%;
        text-align: center;
        font-size: 16px;
        line-height: 54px;
      }
      .p4 {
        width: 30%;
        background: #02d4d7;
        color: white;
        font-weight: bolder;
        text-align: center;
        font-size: 16px;
        line-height: 54px;
      }
    }
  }

  .jg-gonggao {
    padding: 8px 0;
    height: 184px;
    width: 100%;
    background: #f7f7f7;
    .jg-gonggao1 {
      margin: 0 15px 15px 15px;
      .left {
        color: #181818;
        font-size: 14px;
        width: 25%;
        height: 66px;
        float: left;
      }
      .right {
        height: 66px;
        color: #a2a2a2;
        font-size: 14px;
        width: 75%;
        float: right;
      }
    }
  }
}
</style>
