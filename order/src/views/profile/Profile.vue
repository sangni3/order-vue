<template>
  <div class="my">
    <van-nav-bar title="我的信息" :border="false" />
    <div class="header">
      <div class="info">
        <img ref="avatar" src="../../assets/img/profile/avatar.svg">
        <div class="center">
          <p class="login" @click="toLogin">{{ name }}</p>
        </div>
        <div class="i">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="detail">
      <div @click="this.$router.push({path: '/order'})">
        <p><span>{{num}}</span>单</p>
        <p>我的订单</p>
      </div>
      <div class="center">
        <p><span>0</span>&nbsp;个</p>
        <p>我的优惠</p>
      </div>
      <div>
        <p><span>0</span>&nbsp;分</p>
        <p>我的积分</p>
      </div>
    </div>
    <div class="news">
      <div>
        <img src="@/assets/img/profile/message.svg">
        <span>我的消息</span>
      </div>
      <div class="shop">
        <img src="../../assets\/img/profile/pointer.svg">
        <p>我的商城</p>
      </div>
      <div>
        <img src="../../assets/img/profile/vip.svg">
        <p>会员卡</p>
      </div>
    </div>
    <div class="cart">
      <div>
        <img src="../../assets/img/profile/cart.svg">
        <span>我的购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/router/axios";

export default {
  name: "Profile",
  data() {
    return {
      name:'登录 / 注册',
      num:'0'
    }
  },
  created(){
    this.getuser()
  },
  methods:{
    async getuser(){
      const token = localStorage.getItem("token");
      if (token) {
        request({
          url: "validToken/",
          method: "GET",
        })// token 有效
            .then((res) => {
              if (res.data.data===1){
                request({
                  url: "profile/",
                  method: "GET",
                }).then((res) => {
                  this.name=res.data.name
                  var avatar = this.$refs.avatar
                  avatar.src='http://127.0.0.1:8000/media/'+res.data.avatar
                  this.num=res.data.num

                })
              }
              else {
                this.$router.push('Login')
              }
            })
            // token 无效
            .catch((err) => {
              localStorage.removeItem("token");
            });
      }

    },
    toLogin(){
      this.$router.push('/Login')
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "/Login") {
        vm.getuser()
      }
    })

  },
}
</script>

<style scoped>
.my .header{
  background-color: #FF8E96;
  padding: 10px;
}

.header .info{
  display: flex;
  align-items: center;
  justify-content:space-between;
  color: white;
}
.info img{
  width: 80px;
  height: 80px;
  border-radius:50%;
}
.info .center{
  margin-left: -180px;
  margin-top: -40px;
}
.center .login{
  font-size: 16px;
}
.center .iphone{
  display: flex;
  align-items: center;
  font-size: 15px;
}
.info .i{
  font-size: 30px;
}

.detail{
  display: flex;
  height: 100px;
  border-bottom: 5px solid #F2F2F2;
}
.detail .center{
  border-left: 1px solid #FAFAFA;
  border-right: 1px solid #FAFAFA;
}
.detail div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 16px;}
.detail p{
  margin: 0;
  padding: 0;
}
.detail span {
  color: #E67962;
  font-weight: bold;
}
.news{
  display: flex;
  flex-direction: column;
  height: 200px;
  padding: 0 20px;
  border-bottom: 2px solid #F2F2F2;}
.news p{
  display: flex;
  align-items: center;
  width: calc(100% - 50px);
  height: 100%;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}

.news div{
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;}
.news img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.cart{
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100px ;}
.cart div{
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;}
.cart img{
  width: 30px;
  height: 30px;
}
.app{
  display: flex;
  align-items: center;
  width: calc(100% - 0.6rem);
  height: 100%;
  border-top: 1px solid #f2f2f2;
}
</style>
