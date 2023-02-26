<template>
  <!-- 顶部 nav-bar -->
  <van-nav-bar title="万家味道"  :border="false" />
  <div class="scroll">
    <home-swiper :banner="banner"></home-swiper>
  </div>
  <div class="recommend">
        <div class="recommend-iten"  >
          <ol>
            <li>
              <a>
                <img src="@/assets/img.png" alt="万里超市"/>
                <span>万里超市</span>
              </a>
            </li>
            <li>
              <a >
                <img src="@/assets/img.png" alt="数码"/>
                <span>数码</span>
              </a>
            </li>
            <li>
              <a >
                <img src="@/assets/img.png" alt="领券"/>
                <span>领券</span>
              </a>
            </li>
            <li>
              <a >
                <img src="@/assets/img.png" alt="茅台酒"/>
                <span>茅台酒</span>
              </a>
            </li>
            <li>
              <a >
                <img src="@/assets/img.png" alt="优选水果"/>
                <span>优选水果</span>
              </a>
            </li>
          </ol>
        </div>
      </div>
  <goods-list :goods="goods"  :cart="cart" :categorys="categories"></goods-list>

</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper.vue"; //轮播图
import GoodsList from "@/components/content/goods/GoodsList.vue";

export default {
    name: "Home",
    data() {
        return {
            banner: [],
            goods: [],
            categories:[],
            currentType: "pop", //页面默认渲染当前类型
            cart: []
        };
    },
    created() {
      this.getData ()
    },
    methods: {
      getData () {
        this.axios.get('main/')
            .then(response=> {
              this.banner=response.data.banners
              this.goods=response.data.goodlist
              this.categories=response.data.category
              this.cart=response.data.carts
            })
      },
    },
    components: {
      HomeSwiper,
      GoodsList
    },

};
</script>
<style>
.van-nav-bar {
    background-color: #ff8a9d;
}
.van-nav-bar__title {
    color: #fff;
}
.recommend-iten ol {
  display: flex;
  flex-wrap: wrap; }
.recommend-iten ol li {
  list-style: none;
  width: 20%;
  margin: 5px 0;
}
.recommend-iten > ol a {
  display: block;
}
.recommend-iten ol a img {
  width: 59.1px;
}
.recommend-iten ol li span{
  font-size: 11.7px;
  display: block;
  text-align: center;
}
</style>
