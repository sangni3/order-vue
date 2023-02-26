<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
  },
  data(){
    return{
      name:[]
    }
  },
  methods:{
    getData () {
      this.axios.get('main/',{ 'content-type': 'application/x-www-form-urlencoded' })
          .then(response=> {
            this.name=response.data
            console.log(response.data)
          })
    },
  },
  mounted(){
    this.getData()
  }

}
</script>
