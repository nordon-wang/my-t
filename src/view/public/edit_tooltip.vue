<template>
  <div @mouseover="toolHover" @mouseout="toolOut" class="my-tooltip">
      <div class="tool-content" v-show="isShow  && myDir == 'top'">{{$props.content}}</div>
      <slot>
          默认的
      </slot>
      <div class="tool-content-down" v-show="isShow && myDir == 'down'">{{$props.content}}</div>
  </div>
</template>

<script>
export default {
    name:'public_tooltip',
    props:{
        content:{
            type:String,
            default:''
        },
        dir:{
            type:String,
            default:'top'
        }
    },
    data(){
        return {
            isShow:false,
            myDir:this.$props.dir
        };
    },
    methods:{
        toolHover(){
            this.isShow = true;
        },
        toolOut(){
            this.isShow = false;
        }
    },
    mounted(){
    }
}
</script>

<style>
.my-tooltip{
    position: relative;
}

/* 上 */
div.tool-content{
    position: absolute;
    top: -48px;
    left: -20px;
    width: auto;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    background: #fff;
    border: 1px solid #303133;
    white-space: nowrap;
}
div.tool-content::after{
    content: '';
    display: inline-block;
    height: 6px;
    width: 6px;
    border: 1px solid #000;
    border-top-color: transparent;
    border-left-color: transparent;
    background-color: #fff;
    transform: rotate(45deg);
    position: absolute;
    bottom: -4px;
    right: 30px;
}

/* 下 */
div.tool-content-down{
    position: absolute;
    top: 40px;
    left: 50%;
    width: auto;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    background: #fff;
    border: 1px solid #303133;
    white-space: nowrap;
    transform: translateX(-50%);
    background: #303133;
    color: #fff;

}

div.tool-content-down::after{
    content: '';
    display: inline-block;
    height: 6px;
    width: 6px;
    border: 1px solid #000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    background-color: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: -4px;    
    right: calc(50% - 4px);
    background: #303133;
    color: #fff;
}
</style>
