import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import {userList} from './data/userList' 
import Store from "storejs";
let mock = new MockAdapter(axios);

mock.onPost('/login').reply(config => {
    var reqdata=JSON.parse(config.data).data;
    var data={
        code: 200,
        data:{},
        msg: ''
    };
        var bool=true;
        for(var i=0;i<userList.length;i++){
            if(userList[i].username==reqdata.uname){
                if(userList[i].password==reqdata.upwd){
                    return [200,{ code: 1,data:userList[i],msg:"登陆成功"}];
                }else{
                    return [200,{ code: 2,msg:"密码错误"}];
                }
            }
        }
        return [200,{ code: 0,msg:"账号不存在"}];
        // console.log("OK")


    //   userList.map((item)=>{
    //     if(item.username==reqdata.uname){
    //         if(item.password==reqdata.upwd){
    //             return [200,{ code: 200,msg:"success"}];
    //         }
    //     }
    //   })
    // }else{
    //     return [200,{  code: 200,data:"",msg:"账号或者密码错误"}];
    // }

    //   if(bool){
    //     return [200,{  code: 200,data:"",msg:"账号不存在"}];
    //   }
    // if(reqdata.uname==saveData.username&&reqdata.upwd==saveData.password){
    //     	// 做一个数据效验
    //         data.msg="登陆成功";
    //         data.code=200;
    //         data.data=saveData;
    // }else{
    //     data.msg="账号或者密码错误";
    //     data.code=500
    // }
    // return [200,data];

});

mock.onPost('/test').reply(config => {
    var reqdata=JSON.parse(config.data).data;
    userList.push(reqdata);
    Store.set("userList",userList);
    return [200,{ code: 1,msg:"注册成功"}];
	// 做一个数据效验
});

// 例子
/*
  login(data){
    return mock.post("/login",{
      data: data
    })
  }
   login(data){
    return mock.get("/login",{
      params: data
    })
  }

*/
export default axios;	//注意暴露axios