<template>
  <div id="user"> 
      <div class="tab">
      <span  @click="one" :class="{selected:active==1}">登陆</span>
      <span  @click="two"  :class="{selected:active==2}">注册</span>
    </div>   
    <div class="login" v-show="active==1">
    <div v-if="loginNum==0">
         <form action=""  class="login-left" >
                <table>
                    <tr>
                        <td>用户名：</td><td><input type="text" v-model="uname" placeholder="请输入用户名"></td>
                    </tr>
                    <tr>
                        <td>密码：</td><td><input type="text" v-model="upwd" placeholder="请输入您的密码"></td>
                    </tr>
                </table>
                <button class="btn" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
            </form>
    </div>
    </div>
    <div class="regist" v-show="active==2">
        <form action=""  class="regist-right" >
                <table>
                    <tr>
                        <td>用户名：</td><td><input type="text" v-model="uname" placeholder="请输入用户名"></td>
                    </tr>
                     <tr>
                        <td>昵称：</td><td><input type="text" v-model="nname" placeholder="请设置您的昵称"></td>
                    </tr>
                    <tr>
                        <td>设置密码：</td><td><input type="text" v-model="upwd" placeholder="请设置您的密码"></td>
                    </tr>
                </table>
                <button class="btn" @click="edit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
            </form>
    </div>
  </div>
</template>

<script>
import Store from "storejs";
export default {
  data() {
    return {
      loginNum: 0,
      uname: "",
      upwd: "",
      nname:"",
      userInfo: {},
      active: 2
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      // if (!Store.get("userInfo")) {
      //   this.loginNum = 0;
      // } else {
      //   this.userInfo = Store.get("userInfo");
      //   this.$router.push({
      //       path: "/edit"
      //     });
      // }
    },
    login() {
      //   console.log(this.uname,this,upwd);
      var data = {
        uname: this.uname,
        upwd: this.upwd
      };
      //   console.log(data);
      this.$apis.login(data).then(res => {
        if (res.data.code == 0) {
          // this.$router.push({
          //   path: "/edit"
          // });
          console.log(res.data.msg);
        } else if (res.data.code == 1) {
          // this.$store.commit("saveUserInfo",res.data.data);
           this.$router.push({
            path: "/edit"
          });
          this.userInfo = res.data.data;
           Store.set("userInfo",this.userInfo);
        } else {
          console.log(res.data.msg);
        }
      });
    },
    edit() {
      var data = {
        id: 118,
        username: this.uname,
        password: this.upwd,
        avatar: "https://avatars0.githubusercontent.com/u/22588905?v=4&s=120",
        name: this.nname
      };

      this.$apis.edit(data).then(res => {
        if (res.data.code == 1) {
          console.log(res.data.msg);
          this.active = 1;
        }
      });
    },
    one() {
      this.active = 1;
    },
    two() {
      this.active = 2;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#user {
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
  .login {
    div {
      .login-left {
        width: 100%;
        table {
          width: 100%;
          tr {
            td:nth-child(1) {
              text-align: right;
            }
            td {
              height: 35px;
              line-height: 35px;
              font-size: 18px;
              input {
                height: 35px;
                border: 0;
                width: 80%;
                margin: 10px 0;
              }
            }
          }
        }
        .btn {
          width: 80%;
          height: 35px;
          border: 0;
          background: rgb(232, 240, 254);
          margin-top: 20px;
          margin-left: 10%;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
  .regist {
    .regist-right {
      width: 100%;
      table {
        width: 100%;
        tr {
          td:nth-child(1) {
            text-align: right;
          }
          td {
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            input {
              height: 35px;
              border: 0;
              width: 80%;
              margin: 10px 0;
            }
          }
        }
      }
      .btn {
        width: 80%;
        height: 35px;
        border: 0;
        background: rgb(232, 240, 254);
        margin-top: 20px;
        margin-left: 10%;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>
