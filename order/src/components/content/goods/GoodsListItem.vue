<template>
    <div class="goods_list_item" >
      <img v-lazy="showImg"  @click="info(goodsItem.productid)"  />
      <div class="good-list">
        <h4>{{ goodsItem.productname}}</h4>
        <span class="price">￥{{ goodsItem.price}}</span>
        <van-stepper v-model="value"  @change="update_cart()"  min="0" max="5" theme="round" button-size="22" disable-input />
      </div>
    </div>
</template>
<script>
import request from "@/router/axios";
import {formToJSON} from "axios";
import {ref} from "vue";

export default {
    name:'GoodsListItem',
    data() {
      return {
        value: 0,
        show :ref(false),
      }
    },
    props:{
        goodsItem: {
          type: Object,
          default() {
            return {}
          }
        },
        cate: {
          type: String,
          default() {
            return ''
          }
        },
        count:{
          type: Object,
          default() {
            return {}
          }
        },
        index:{
          type:Number,
          default() {
            return 0
          }
        }
    },
    created() {
      const a=this.count[this.goodsItem.productid]
      if(a){
        this.value=a
      }


    },
    methods:{
        info(index) {
          console.log(index)
          this.$emit('aas', {'show':!this.show,'goodsid':index})
        },
        itemDetail() {
            // this.$router.push(`/detail/${this.goodsItem.iid}`)
        },
        async update_cart(){
            const carts={}
            carts['productid']=Number(this.goodsItem.productid)
            carts['count']=this.value;

            request({
              url: 'addcart/',
              method:'POST',
              data:carts
            }).then(res=>{

            })
          }
    },
    computed: {
        showImg() {
            return this.goodsItem.image
        }
    },


}
</script>
<style>
.goods_list_item{
        display: flex;
        padding: 0 2vw;
}
.good-list{
  position: relative;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

}
.good-list h4{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-left: 10px;
}
.good-list img{
  width: 100%;
  border-radius: 0.1rem;
}
.price{
  font-size: 15px;
  color: #fd3a3a;
  position: absolute;
  top: 70px;
  left: 10px;

}
.btn{
  display: flex;
  align-items: center;
}
.van-stepper{
  position: absolute;
  top: 70px;
  left: 100px;
}
</style>
