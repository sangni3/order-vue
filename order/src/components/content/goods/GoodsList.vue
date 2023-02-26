<template>
  <div class="category_content" >
    <div class="title" ref="head">
      <div :class="{active: countIndex===index}" v-for="(item,index) in categorys" :key="index"  @click="jump(index)">
        <a >{{ item.typename }}</a>
      </div>
    </div>
    <div class="cate"  v-for="(item,index) in categorys" :key="index"  >
      <p >{{item.typename}}</p>
      <div class="content" v-for="(item1,d) in activegoods[index]"  :key="d" >
        <goods-list-item class="goods_item"  @aas="blune"   :cate="item.typeid" :key="d" :goodsItem="item1" :count="cart"  ></goods-list-item>
      </div>
    </div>
    <goodsinfo v-model:show="show" :goods="goods" :goodsid="goodsid" :comments="comments"></goodsinfo>
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem.vue'
import Goodsinfo from "@/views/home/childComps/Goodsinfo";
import request from "@/router/axios";
import {ref} from "vue";
export default {
    name:'GoodsList',
    props:{
      goods:{
           type:Array,
           default() {
               return []
           }
       },
      categorys:{
           type:Array,
           default() {
               return []
           }
       },
      cart:{
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        show:ref(false),
        countIndex:0,
        cateContentList:[],
        goodsid:'',
        comments:{}
      }
    },
    created() {
      this.getcart()
    },
    methods: {
      blune(message) {
        this.show=message.show
        this.goodsid=message.goodsid
        this.getinfo(this.goodsid)
      },
      getinfo(goodsid){
        request({
          url: "comments",
          method: "get",
          params:{
            'goodsid':goodsid
          }
        }).then(data=>{
          this.comments=data.data.comments
          console.log(this.comments)
        })
      },
      async getcart(){
        request({
          url: "cart/",
          method: "GET",
        }).then(data=>{

        })
      },
      getCateContent(index,item){
        this.cateContentList=[]
        for(var i in this.goods){
          if (this.goods[i].category_id===item)
          this.cateContentList.push(this.goods[i])
        }
      },
      indexChange(index,item){
        this.countIndex = index;
        this.getCateContent(index,item)
      },
      scrolls () {
        var header = this.$refs.head
        var headerTop = header.offsetTop
        window.onscroll = () => {
          if (document.documentElement.scrollTop > headerTop){
            header.style.position = 'fixed'
            header.style.top ='0px'
          }
          else
          {
            header.style.position = 'absolute'
            header.style.top ='240px'
          }
        }
      },
      jump(index){
        let target = document.querySelector('body')
        let scrollItems = document.querySelectorAll('.cate')
        if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
          this.countIndex = index
        }
        let total = scrollItems[index].offsetTop - scrollItems[0].offsetTop // 锚点元素距离其offsetParent(这里是body)顶部的距离(待滚动的距离)
        let distance = document.querySelector('html').scrollTop // 滚动条距离滚动区域顶部的距离
        console.log(total,distance)
        let step = total / 50
        if (total > distance) {
          smoothDown(document.querySelector('html'))
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp(document.querySelector('html'))
        }
        // 参数element为滚动区域
        function smoothDown (element) {
          if (distance < total) {
            distance += step
            element.scrollTop = distance
            setTimeout(smoothDown.bind(this, element), 1)
          } else {
            element.scrollTop = total
          }
        }
        // 参数element为滚动区域
        function smoothUp (element) {
          if (distance > total) {
            distance -= step
            element.scrollTop = distance
            setTimeout(smoothUp.bind(this, element), 1)
          } else {
            element.scrollTop = total
          }
        }
      }
    },
    mounted () {
      setTimeout(()=>{this.scrolls()}, 0)
    },
    computed: {//通过计算属性过滤掉列表中不需要显示的项目
      activegoods: function () {
        const b = []
        for(var i in this.categorys) {
          const a = this.categorys[i].typeid;
          b.push(this.goods.filter(function (goods) {
            return goods.category_id===a;//返回isShow=true的项，添加到activeUsers数组
          }))

        }
        return b
      }
    },
    components:{
      Goodsinfo,
      GoodsListItem
    },
    watch: {
      // '$route': function(to, from) {
      //   if(to.path!=='/home'){
      //     request({
      //       url: "addcart/",
      //       method: "POST",
      //       data: this.cart
      //     }).then( res=>{
      //     }
      //     )
      //   }
      // }
    }
}
</script>
<style >
    .goods{
        display: flex;
        flex-wrap: wrap;
    }
    .category_content .title {
      background-color: #F7F7F7;
      text-align: center;
      float:left;
      overflow:auto;
      width:20%;
      height: 100%;
      margin-right: 5px;
      box-shadow: #cdd5dc 0 0 10px;
      position: absolute;
    }
    .title >div {
      line-height: 50px;
    }
    .title >div:hover{
      cursor: pointer;
    }
    .title >.active{
      background-color: #ffffff;
      border-left: 3px solid #FF8A9D;
      font-size: medium;
      font-weight: 600;
    }
    .title a{
      color: #2c3e50;
    }
    .cate{
      display: flex;
      flex-direction: column;
      overflow:auto;
      width:78%;
      position: relative;
      left: 80px;
    }
    .cate p{
      /*font-size: large;*/
      margin: 10px 0;
      /*font-weight: 600;*/
    }
    .content > div img{
      width: 100px;
      height: 100px;
      float: left;
    }
    .content>div{
      margin-top: 5px;
      background: #fafafa;
    }

    .cate:last-child{
      margin-bottom: 100px;
    }

</style>
