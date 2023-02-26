<template>
  <router-view  v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
    <tab-footer></tab-footer>
</template>

<script>
import TabFooter from '@/components/common/TabFooter.vue'
export default {
  name: 'app',
  components: {
    TabFooter,
  },
  created() {

  },
  computed: {}


}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin:0;
  padding:0;
  border:0;
}
@media all and (max-width: 400px) {
  html{width: 390px;}/* 16*4.2 */
}

/*:root -> 获取根元素html*/
body{
  min-height: 100vh;
  background: #f7f8fa;
  margin: 0;
  padding: 0;
}
.van-tabbar{
  border-bottom: 1px solid white;
}

</style>
