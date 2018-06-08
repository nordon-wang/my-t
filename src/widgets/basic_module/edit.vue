<template>
  <div class="moduleEdit">
<!-- btm_4cols -->
    <div class="row_setting btm_4cols">
      
      <my-computed 
        :btype="'diff_hover'">
          <div slot="padding_control" class="setOne">
            <my-number v-model="css.w_fill" title="填充"></my-number>
          </div>
          <!-- 默认的边框设置 -->
          <div class="setOne" slot="diff_border">
            <my-border
              type="top"
              :my_width.sync="css.w_border_top_width"
              :my_color.sync="css.module_pulick_border_top_color"
              :my_style.sync="css.w_border_top_style"
            ></my-border>
            <my-border
              type="bottom"
              :my_width.sync="css.w_border_bottom_width"
              :my_color.sync="css.module_pulick_border_bottom_color"
              :my_style.sync="css.w_border_bottom_style"
            ></my-border>
            <my-border
              type="left"
              :my_width.sync="css.w_border_left_width"
              :my_color.sync="css.module_pulick_border_left_color"
              :my_style.sync="css.w_border_left_style"
            ></my-border>
            <my-border
              type="right"
              :my_width.sync="css.w_border_right_width"
              :my_color.sync="css.module_pulick_border_right_color"
              :my_style.sync="css.w_border_right_style"
            ></my-border>
          </div>
          <!-- contain_control -->
          <div slot="contain_control" class="setOne">
            <my-img v-model="css.w_bg_src"></my-img>
            <my-select v-model="css.w_tile_style" title="背景平铺" :option="$store.state.options.backgroundRepeat"></my-select>
            <my-select v-model="css.w_bg_position" title="背景位置" :option="$store.state.options.backgroundPosition"></my-select>
            <my-color v-model="css.w_background" title="背景颜色"></my-color>
          </div>
        </my-computed>

      <!-- 边框设置结束 -->
      <div class="setOne">
        <my-number v-model="css.w_border_raduis_num" title="圆角"></my-number>
        <my-number v-show="opacitySet" v-model="css.w_opacity" :max="1" :min="0.1" title="透明度" :step="0.1"></my-number>

      </div>
        <div class="setOne" v-show="$store.state.modulePostion">
            <my-number v-model="css.module_left" :min="-2000" title="靠左位置"></my-number>
            <my-number v-model="css.module_top" :min="-2000" title="靠上位置"></my-number>
        </div>

    </div>
  </div>
</template>

<script>
import style from "./style";

export default {
  name: "basic_module_edit",
  props: {},
  data() {
    return {
      css: JSON.parse(JSON.stringify(this.$store.state.module_Data.data.css)),
      test: "",
      opacitySet:true,//设置动画之后 不允许设置module的透明度
        isFirst:0
    };
  },
  watch: {
    css: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "css",
          val: JSON.parse(JSON.stringify(val))
        });
          if(this.isFirst){
              const name = this.templet.p_nameToChinese(this.$store.state.module_Data && this.$store.state.module_Data.name);
              this.templet.module_add_historical(`${name}基础属性修改`);
          }
          this.isFirst++;


      },
      deep: true
    }
  },
  methods: {},
  components: {},

  mounted() {
    let moduleName = this.$store.state.module_Data.name
    let moduleInfor = this.$store.state.module_Data.data.infor
    // 富文本 视频 定位为fixed 的时候 不允许设置 left、top
    if(moduleName == 'basic_customedit'){
      if(moduleInfor.custom_pos_style == 0 || moduleInfor.custom_pos_style == 2){
        this.$store.state.modulePostion = false;
      }else{
        this.$store.state.modulePostion = true;
      }
    }
    else if(moduleName == 'basic_video'){
      if(moduleInfor.videoPosition == 'fixed'){
        this.$store.state.modulePostion = false;
      }else{
        this.$store.state.modulePostion = true;
      }
    }

    // 设置动画的时候 不允许设置透明度
    let hasAnimation = this.$store.state.module_Data.data.animateObj.animatedType;
    
    if(hasAnimation == 'fadeIn' || hasAnimation == 'bounceIn' || hasAnimation == 'flash' || hasAnimation == 'rollIn'){
      this.opacitySet = false
      this.css.w_opacity = 1
    }else{
      this.opacitySet = true
    }

  }
};
</script>
