<template>
  <div class="pddingTop">
    <van-nav-bar title='购物车' left-text="" fixed></van-nav-bar>
    <div class="shopContent">
      <ul>
        <li v-for="(item,i) in dataList" :key="i" >
          <div class="shopmain">
            <van-checkbox v-model="item.checked" @change="signchecked(item)"></van-checkbox>
            <div class="shops" @click="todetails(item.productid)">
              <div class="shopImg">
                <img :src="item.img" alt=""></div>
              <div class="shopsright">
                <h4>{{item.productname}}</h4>
                <div class="shoprightbot">
                  <span>￥{{item.price}}</span>
                  <div class="shopradd">
                    <button @click.stop="reducebuyNum(item.num,item,item.productid,i)" :disabled="item.num<=0">-</button>
                    <van-field style="width:40px;text-align: center" readonly v-model="item.num" type="number" />
                    <button id="button" @click.stop="addbuyNum(item.num,item)" :disabled="item.num>=5">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="!dataList.length" class="shopping">
      <p>暂无商品</p>
    </div>
    <div v-show="dataList.length" class="order_info">
      <van-cell-group inset>
        <van-field v-model="phone" label="手机号" />
        <van-field v-model="address" label="地址" />
        <van-field v-model="note" label="备注" />
      </van-cell-group>
    </div>

      <van-submit-bar
          :price="total*100"
          button-text="提交订单"
          @submit="onSubmit"
          v-bind:disabled="enable?null:'disabled'"
      >
        <van-checkbox v-model="ischecked" disabled="disabled" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>

  </div>
</template>
<script>
//toast 我全局引用了
import {Dialog, Toast} from 'vant';
import request from "@/router/axios";

export default {
  components:{
  },
  data(){
    return{
      img:require("@/assets/logo.png"),
      ischecked:false,
      dataList:[],
      total:0,
      disabled:false,
      phone:'',
      address:'',
      note:'',
      enable: false
    }
  },
  methods:{
    //商品加加
    addbuyNum(num,value){
      if(value.num<=5){
        value.num++
        // this.shopNumber(value)
        this.amount(value)
      }
    },
    //商品减减
    reducebuyNum(num,value,productCode,i){
      if(value.num<=1){
        Dialog.confirm({
          title: '温馨提示',
          message: '是否删除商品'
        }).then(() => {
          request({
            url: "subcart/",
            method: "POST",
            data: {productCode:productCode}})
              .then(data=>{
                Toast({
                  message:'删除成功',
                  duration:800
                })
              })
          setTimeout(()=>{
            //这里千万不能再调用 要把这个数组里面去除掉 不然问题是很多
            this.dataList.splice(i,1)
            this.amount(value)
          },1000)
        }).catch(() => {
        });
      }else{
        value.num--
        // this.shopNumber(value)
        this.amount(value)
      }
    },
    // 提交订单
    onSubmit(){
      let cartIdList = {}
      this.dataList.forEach(element => {
        if (element.checked) {
          cartIdList[element.productid]=element.num
        }
      });
      if (cartIdList.length<1) {
        Toast.fail('请选择订单');
      } else {
        request({
          url: "cart/",
          method: "POST",
          data:JSON.stringify({cart:cartIdList,address:this.address,note:this.note})
        }).then(data=>{
          window.location.href=data.data;
        })
      }
    },
    //加减 这里之前是自己手写了 但是参考别的网站后 这里是通过接口加减的
    shopNumber(value){
      let data = {
        dataId :value.dataId,
        buyNum:value.buyNum,
        productCode:value.productCode
      }
      request({
        url: "subcart/",
        method: "POST",
        data: data})
          .then(data=>{

          })
    },
    // 单选
    signchecked(val){
      this.amount(val)
    },
    amount(val){
      let arr =[]

      let MoneyList=[]
      this.dataList.forEach(item=>{
        if(item.checked===true){
          MoneyList.push(item)
          arr.push(item.checked)
        }

      })

      this.enable = !!arr.length;
      //这里就是判断时候为全选
      if(arr.length===this.dataList.length){
        this.ischecked = true
      }else{
        this.ischecked = false
      }
      //价格要置为0 不然一直会累加的 也会又很大的问题
      this.total=0;
      for(var i=0;i<MoneyList.length;i++){
        this.total+=MoneyList[i].price*MoneyList[i].num
      }
    },
    // 全选 这里的事件有两中 一个是click 一个是change 不同的事件用不同的方法
    checkAll(){

      this.dataList.forEach(item=>{
        if(this.ischecked==false){
          item.checked=true
        }else{
          item.checked=false
        }
      })
    },
    // 列表
    shoppingCartlist () {
      this.phone=localStorage.getItem("userPhone")

      request({
        url: "cart/",
        method: "GET",
      })
          .then(data=>{
            console.log(data.data)
             var data=data.data
            if(data.data!==0){
              //这里需要手动添加默认的checked 后台没有返
              data.carts.forEach(element => {
                element.checked = false
                // element.num = null
              });
              this.address=data.address
              this.dataList = data.carts
              if(!this.dataList.length){
                this.disabled=true

              }
            }else {
              Toast.fail(data.message);
            }
          })
    }
  },
  mounted () {
    // this.shoppingCartlist ()
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.shoppingCartlist()
      document.documentElement.scrollTop=0
    })
  }

}
</script>
<style >
.van-submit-bar{
  bottom:49px;
}
.shopContent {
  margin-top: 46px;
  /*padding-bottom: 90px;*/
}
.shopping{
  text-align: center;
  padding-top:99px;
}
.shopContent .shpping img{
  width:96px;height:96px;
  margin-bottom: 25px;
}

.shopContent li{
  padding:0 15px;
  background:#ffffff;
  margin-bottom:10px;
  position: relative;
  height:103px;
  }
li .shopmain{
  display: flex;
  padding:10px 8px 10px 10px;
  position: relative;
}
.shops{
  display: flex;
}
.shopImg{
  width:103px;height:83px;
  margin:0 7px 0 11px;
}
li img{
  width:100%;height:100%;
}

.shopsright{
  width:185px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;}
.shopsright h4{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
}
.shoprightbot{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
}
.shoprightbot span{
  font-size:17px;
  color:#F74022;
}

.van-checkbox__icon--checked .van-icon{
  background:red !important;
}
.shopsright button{
    width:24px;height:26px;
    font-size:20px;
    background:#F74022;
    color:#ffffff;
    border:none;
    border-radius: 50%;
  }
.shopsright input{
    width:48px;
  }

.shopradd{
  width: 98px;
  display: flex;}
  .van-field__control{
    text-align: center !important;
  }

.shopsright .van-cell{
  padding: 0;
  line-height: 26px
}
.shopsright .van-field__control{
  height: 26px;
}
</style>
