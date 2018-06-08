<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    let time = Date.now();
    console.log('js加载用时:',time-startTime);
      console.log('6月4日版本');


      //$('.init_mongolia_layer').remove();
  }
}
</script>


