<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links1111</h2>
    <button @click="test">删除</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      myInit:Function
    }
  },
  watch:{
    '$route'(to,from){
      console.log('watch1',to);
      console.log('watch2',from);
    }
  },
  methods:{
    test(){
      this.myInit();
    }
  },
  // beforeRouteUpdate(to,from,next){
  //     console.log('beforeRouteUpdate1',to);
  //     console.log('beforeRouteUpdate2',from);
  //     console.log('beforeRouteUpdate3',next);
  // },
  mounted(){
    this.myInit = this.$route.params.methods;
    console.log(this.$route.params);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
