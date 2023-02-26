<template>
  <div>
    <div class="icon-back" @click="tologin">
      <van-icon size="25" name="arrow-left" />
    </div>
    <div>
      <p>注册</p>
    </div>
    <van-form>
      <van-field name="uploader" label="上传头像">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <van-cell-group>
        <van-field
            v-model="phone"
            @blur="blur"
            required
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
                         { required: true },
                         { pattern: /^1[3456789]/, message: '手机号码格式错误！' },
        ]"
        />
        <van-field
            v-model="password"
            required
            type="password"
            label="密码"
            placeholder="请输入密码"
        />
        <van-field
            v-model="password1"
            required
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
        />
        <van-field
            v-model="address"
            required
            type="address"
            label="地址"
            placeholder="输入默认地址"
        />
      </van-cell-group>
    </van-form>
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" @click="onsubmit">注册</van-button>
    </div>
  </div>
</template>

<script>

import { Toast } from 'vant';


export default {
  name: "Register",
  data() {
    return {
      phone:'',
      password:'',
      password1:'',
      uploader: [{ url: 'http://127.0.0.1:8000/media/media/author.jpg' }],
      address: '',
    };
  },
  methods: {
    blur(){
      this.axios.post("checkuserphone/",{phone:this.phone},
          {headers:{'content-type': 'application/x-www-form-urlencoded' }})//传参
          .then(function(res){
            if (res.data.data=='1'){
              Toast('手机已注册');
              this.phone=''
            }
          }).catch(function(err){
            console.log("请求失败233");});
    },
    tologin(){
      this.$router.go(-1);
    },
    onsubmit(){
      if(this.phone==""||this.password==""||this.password1==""){
        Toast('注册失败！信息未完善');
      }
      else if(this.password!=this.password1){
        Toast('密码输入两次不一致！');
      }
      else{
        let _this=this;
        var formdata = new FormData();
        formdata.append('userPhone', this.phone);
        formdata.append('password', this.password);
        formdata.append('address', this.address);
        var a=this.uploader.pop().file
        formdata.append('img', a);
        this.axios({
          url:'saveuser/',
          method:'post',
          data:formdata,
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(function(res){
          if(res.data.data=='0'){
            Toast.success('注册成功');
            _this.$notify({
              type: "success",
              message: "注册成功，3s后返回登录",
              duration: 3000,
            });
            setTimeout(() => {
              sessionStorage.clear("regis");
              _this.$router.go(-1);
            }, 3000);
          }

        })
      }
    }
  },
};
</script>

<style scoped>
.icon-back{
  position: absolute;
  left: 2px;
  top:15px
}
.van-button--round{
  border:0;
  background: #4c8cfe;
  color: white;
  font-size: 18px;
}
form{
  margin: 20px 15px;
  border-radius: 10px;
  background: white;
}
form div{
  background: none;
}
</style>

