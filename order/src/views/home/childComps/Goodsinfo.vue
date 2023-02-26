<template>
  <van-action-sheet title="标题" >
    <div class="goods-content">
      <img :src="product[0].image"   alt="">
      <div class="desc">
        <van-cell-group>
          <van-cell title="介绍" :value="product[0].des" />
        </van-cell-group>
        <div class="comments" v-for="(item,index) in comments">
          <div class="avator">
            <img :src="item.user[0].avator" />
          </div>
          <div class="comment-content">
            <span>{{item.user[0].userName}}</span>
            <span> ({{item.created_time.substring(0,10)}})</span>
             <div><p>{{item.comments}}</p></div>
          </div>
        </div>
        <van-cell-group inset>
          <van-field
              v-model="mycomment"
              clearable
              placeholder="评论"
          >
            <template #button>
              <van-button size="small" @click="send" type="primary">发送</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>

  </van-action-sheet>


</template>

<script>
import { ref } from 'vue'
import request from "@/router/axios";
import {Toast} from "vant";
export default {
  name: "Goodsinfo",
  data(){
    return{
      mycomment:''
    }
  },
  props:{
    goods:{
      type:Array,
      default() {
        return []
      }
    },
    goodsid:{
      type:String,
      default() {
        return ''
      }
    },
    comments:{
      type:Object,
      default(){
        return {}
      }

    }
  },
  computed: {//通过计算属性过滤掉列表中不需要显示的项目
    product: function () {
      var _this=this
      return this.goods.filter(function (good) {
        return good.productid===_this.goodsid
      })

    }
  },
  methods:{
    send(){
      request({
        url: "comments/",
        method: "post",
        data: {'comment':this.mycomment,
              'goodsid':this.product[0].productid,
        }
      }).then(data=>{
        if (data.data.data==0)
          Toast.fail(data.data.status);
        else
          this.$forceUpdate()

      })
    }
  },
}
</script>

<style>
.goods-content {
  /*padding: 16px 16px 160px;*/
}
.goods-content >img{
  width: 100%;
  height: 350px;
}
.van-cell__title{
  flex: 1;
}
.van-cell__value{
  text-align: left;
  flex: 2;
}
.comments{
  padding: 5px;
  margin: 5px;
  border-bottom: 1px solid;
}
.avator{
  height: 50px;
  width: 50px;
  float: left;
}
.avator> img{
  width: 100%;
}
.comment-content{
  margin-left: 70px;
  text-align: left;
}
</style>
