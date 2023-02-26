<template>
  <van-nav-bar title="订单列表" :border="false" />
  <div  class="orderInfo">
    <van-cell-group inset v-for="(item,index) in orderlist" key="index">
      <div class="imglist">
        <img v-for="(item1,index) in goodsimg[index].slice(0, 3)"  key="index" :src='item1' alt="">
      </div>
      <div class="status">
        <span>{{status[item.status]}}</span>
        <h4>￥{{item.total_amount}}</h4>
        <span>共{{item.total_count}}件</span>
        <van-button v-if="item.status===1 ||item.status===2" size="mini" @click="confirm(item.status,item.order_id)">{{btn[item.status]}}</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import request from "@/router/axios";

export default {
  name: "Order",
  data(){
    return{
      status:{1:'未付款',2:'待发货',3:'待收货',4:'已完成'},
      btn:{1:'付款',2:'确认收货'},
      price:'0.00',
      count:'0',
      orderlist:[],
      goodsimg:[]
    }
  },
  created() {
    this.getorder()
  },
  methods:{
    async getorder(){
      request({
        url: "orderlist/",
        method: "GET",
      }).then(data=>{
        if (data.data.orderlist){
          this.orderlist=data.data.orderlist
          this.goodsimg=data.data.goodsimg
        }
      })
    },
    async confirm(index,order_id){
      request({
        url: "confirm/",
        method: "POST",
        data:{'btn':index,'order_id':order_id}
      }).then(data=>{
        console.log(data.data.data)
        if (data.data.data===1){
          location.reload()
        }
          else{
          window.location.href=data.data;
        }
          }
      )
    }
  }
}
</script>

<style scoped>
.orderInfo{
  margin-top: 20px;
}
.orderInfo >div{
  min-height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
}
.imglist{
  display: flex;
  align-items: center;
}
.orderInfo img{
  height: 70px;
}
.status{
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
