<template>
  <div class="module_thumbnail" :style="{
      width:isMax ? '100%' : width + 'px',
      height:isMax ? '100%' :height + 'px',
      backgroundImage:src ? 'url('+src+')' : '',
      cursor:isMongolia ? 'pointer' : '',
      borderRadius:radius + 'px'
    }" @click="open">
  </div>
</template>

<script>



  export default {
    name: 'module_thumbnail',
    props:{
      //缩略图大小
      width:{
        type:Number,
        default:80,
      },
      height:{
        type:Number,
        default:80,
      },
      src:{
        type:String,
        default:'',
      },
      isMongolia:{
        type:Boolean,
        default:true,
      },
      radius:{
        type:Number,
        default:3,
      },
        //宽高是否百分百
        isMax:{
            type:Boolean,
            default:false,
        }



    },
    data() {
      return {
        isOpen:false

      };
    },
    components:{

    },
    computed:{

    },
    watch:{


    },


    methods: {
      open(){
          if($('#module_thumbnail_Mongolia').length == 0 && this.isMongolia){
              var src = `<div id="module_thumbnail_Mongolia"><img src="${this.src}"><i class="el-icon-close close" onclick="document.body.removeChild(document.querySelector('#module_thumbnail_Mongolia'))"></i></div>`;
              $(src).appendTo('body');
          }
      }
    },

    mounted() {
    }

  }

</script>

<style scoped>

</style>
