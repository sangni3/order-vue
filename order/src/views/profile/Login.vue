<template>
  <div>
    <van-nav-bar title="登录" :border="false" />
    <div class="main">
      <van-image
          round
          width="6rem"
          height="6rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <van-form>
        <van-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
                         { required: true },
                         { pattern: /^1[3456789]/, message: '手机号码格式错误！' },
        ]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="onSubmit">登录</van-button>
        </div>
        <div class="reg">
          <div @click="toRegister">没有账号？立即注册</div>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
import request from "@/router/axios";
export default {
  name: "Login",
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if(this.username==""&&this.password==""){
        Toast('请输入账号或密码');
      }
      else{
        let formdata = new FormData()
        let that = this;
        formdata.append('userPhone', this.phone);
        formdata.append('password', this.password);
        request({
          url:'login/',
          method:'POST',
          data:formdata,
        }).then(function(res){
          if (res.data.data=='0'){
            Toast.fail('账号或密码错误');
          }
          else {
            that.$store.commit("setToken", res.data.token);
            that.$store.commit("setUserInfo", res.data)
            Toast.success('登录成功');
            that.$router.push('/profile')
          }

        })


      }
    },
    toRegister(){
      this.$router.push('/Register')
    }
  }
}

</script>

<style scoped>

.main{
  margin-top: 50px;
}
.van-field__label {
  width: 80px;}
.van-field {
  font-size: 18px;
}
.van-cell{
  line-height: 40px;
}
.van-field__label{
  width: 80px!important
}
.van-button--round{
  border:0;
  background: #4c8cfe;
  color: white;
  font-size: 18px;
}
</style>

