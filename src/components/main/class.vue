<template>
  <div id="classs">
    <div class="tab">
      <span @click="ziying" :class="{selected:active==1}" >自营</span>
      <span @click="two" :class="{selected:active==2}">贝式严选</span>
    </div>
    <div class="zy yangshi" v-show="active==1">
      <span class="span0" v-for="(item,index) in one" :key="index" @click="optionData(index) " :class="{selected:selNum==index}">{{item.name}}</span>
      <ul>
        <li v-for="(item,index) in activeList" :key="index" >
          <img :src="item.ImgUrl" @click="toShow(item)">
             <p class="p1">{{item.Name}}</p>
             <p class="p2">{{item.Means}}</p>
            <span class="span1">{{"￥"+item.CurrentPrice}}</span>
            <span class="span2">{{"/"+item.Size}}</span>
            <img class="car" src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt="" @click="addData(item)">
        </li>
      </ul>
    </div>
    <div class="bs yangshi" v-show="active==2">
      <span class="rp selected">乳品</span>
       <ul>
        <li v-for="(item,index) in activeList" :key="index" >
          <img :src="item.ImgUrl" @click="toShow(item)">
            <p class="p1">{{item.Name}}</p>
           <p class="p2">{{item.Means}}</p>
            <span class="span1">{{"￥"+item.CurrentPrice}}</span>
            <span class="span2">{{"/"+item.Size}}</span>
             <img class="car" src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt="" @click="addData(item)">
        </li>
      </ul>
    </div>
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
      oneTabNo:0,
      selNum:0,
      active: 1,
      tabActive: 0,
      goodsList: [],
      activeList: [],
      one: [
        { name: "经典", mark: "KSK" },
        { name: "女神", mark: "NS" },
        { name: "伴手礼", mark: "JZ" }
      ]
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.GetJdListNew(res => {
        var goodsList = res.data.Tag.cakelist;
        var url = `https://res.bestcake.com/m-images/ww/`;
        goodsList.forEach(item => {
          if (item.SupplyNo.indexOf("KSK") != -1) {
            item.ImgUrl = `${url}jd/${item.Name}.png`;
          } else if (item.SupplyNo.indexOf("NS") != -1) {
            item.ImgUrl = `${url}ns/${item.Name}.jpg`;
          } else if (item.SupplyNo.indexOf("JZ") != -1) {
            item.ImgUrl = `${url}jz/${item.Name}.png`;
          } else {
            item.ImgUrl = `${url}rp/${item.Name}.jpg`;
          }
        });
        // https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=14
        // https://res.bestcake.com/m-images/ww/ns/一见倾心.jpg?v=14
        // https://res.bestcake.com/m-images/ww/jz/草莓先生.png?v=14
        //  res.data.Tag.cakelist
        this.goodsList = goodsList;
        this.optionData(0);
      });
    },
    optionData(index) {
      var tabNum=this.one[index]?this.one[index].mark:"RP";
      this.selNum=index;
      var activeList = [];
      // console.log(this.goodsList);
      this.goodsList.forEach(item => {
        if (item.SupplyNo.indexOf(tabNum) != -1) {
          activeList.push(item);
        }
      });
      this.activeList = activeList;
      if(index!=4){
        this.oneTabNo=index;
      }
    },
    addData(item){
       var data = {
        id: item.ID,  //产品ID
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
      	SupplyNo:item.SupplyNo  //产品货号类型
      };
      // console.log(data);
      this.$store.commit("add",data);
      MessageBox.confirm('是否加入购物车?').then(action => {
            this.$store.commit("add", data);
        },cancel => {
           return;
        });
    },
    ziying(){
      this.active=1;
      this.optionData(this.oneTabNo);    
    },
    two() {
      this.active = 2;
      this.optionData(4);
    },
    toShow(item) {
      //图片焦点图跳转详情页

      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: { key: data.key, c: data.c }
      });
    },

    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#classs {
  .tab {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    span {
      display: block;
      width: 50%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #333;
      text-align: center;
      float: left;
    }
    .selected {
      color: #1db0b8;
      border-bottom: 2px solid #1db0b8;
    }
  }
  .bs{
    .rp{
      display: block;
      font-size: 14px;
      width:10%; 
      color: #333;
      text-align: center;
      line-height: 22px;
      box-sizing: border-box;
      margin: 0 auto;
    }
    .selected {
      font-size: 16px;
      font-weight: bold;
      border-bottom: 2px solid #1db0b8;
    }
  }
  .yangshi {
    margin-top: 30px;
    width: 100%;
    .span0 {
      display: block;
      font-size: 14px;
      color: #333;
      margin: 0 20px;
      height: 22px;
      float: left;
      text-align: center;
      line-height: 22px;
      box-sizing: border-box;
    }
    .selected {
       font-size: 16px;
      font-weight: bold;
      border-bottom: 2px solid #1db0b8;
    }
    ul {
      padding: 0 6px;
      li:nth-child(2n + 1) {
        margin-right: 30px;
      }
      li {
        width: 45%;
        float: left;
        position: relative;
        margin-bottom: 20px;
        img {
          max-width: 100%;
          height:190px;;
        }
        .p1 {
          color: #333;
          font-size: 14px;
          text-align: left;
          padding-left: 7px;
          height: 15px;
          line-height: 15px;
          overflow: hidden;
        }
        .p2 {
          color: #999;
          text-align: left;
          padding-left: 7px;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          overflow: hidden;
          width: 140px;
        }
        .span1 {
          color: rgb(255, 51, 0);
          font-size: 16px;
        }
        .span2 {
          color: rgb(212, 212, 212);
        }
        .car {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .jg-gonggao {
    clear: both;
    padding: 8px 0;
    height: 184px;
    width: 100%;
    margin-bottom: 80px;
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