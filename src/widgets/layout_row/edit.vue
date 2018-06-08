<template>
  <div class="rowEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span
          @click="templet.p_select_parts('row')"
          @mouseover="templet.p_index_hover_parts('row')"
          @mouseout="templet.p_index_out_parts()"
        >行容器</span>
        <span
          @click="templet.p_select_parts('laybox')"
          @mouseover="templet.p_index_hover_parts('laybox')"
          @mouseout="templet.p_index_out_parts()"
        >居中容器</span>
    </div>

    <!--row设置-->
    <div class="row_setting" v-if="$store.state.parts == 'row'">
      <my-computed :btype="'diff_hover'">
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.r_fill" title="内边距"></my-number>
        </div>

        <!-- 默认的边框设置 -->
        <div slot="diff_border"  class="setOne">
          <my-border
            type="top"
            :my_width.sync="infor.r_border_top_width"
            :my_color.sync="infor.r_border_top_color"
            :my_style.sync="infor.r_border_top_style"
          ></my-border>

          <my-border
            type="bottom"
            :my_width.sync="infor.r_border_bottom_width"
            :my_color.sync="infor.r_border_bottom_color"
            :my_style.sync="infor.r_border_bottom_style"
          ></my-border>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.module_height" title="行高度"></my-number>
        <!--<my-number v-model="infor.w_opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>-->
        <my-select v-model="infor.fixed" title="容器固定" :option="$store.state.options.fixed" @change="fixed_change" v-if="$store.state.module_Data.rowType ==='header'"></my-select>
      </div>

      <div class="setOne">
        <my-number v-model="infor.module_index" title="层级" :max="900"></my-number>
        <my-color v-model="infor.r_background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-img v-model="infor.r_bg_src"></my-img>
        <my-select v-model="infor.r_tile_style" title="背景重复" :option="$store.state.options.backgroundRepeat"></my-select>
        <my-select v-model="infor.r_bg_position" title="背景位置" :option="$store.state.options.backgroundPosition"></my-select>
      </div>


    </div>

    <!--laybox-->
    <div class="laybox_setting" v-if="$store.state.parts == 'laybox'">
      <my-computed :btype="'diff_hover'">
        <!--<div slot="padding_control" class="setOne">
          <my-number v-model="infor.w_fill" title="内边距"></my-number>
        </div>-->

        <!-- 默认的边框设置 -->
        <div slot="diff_border" class="setOne">
          <my-border
            type="top"
            :my_width.sync="infor.w_border_top_width"
            :my_color.sync="infor.w_border_top_color"
            :my_style.sync="infor.w_border_top_style"
          ></my-border>

          <my-border
            type="bottom"
            :my_width.sync="infor.w_border_bottom_width"
            :my_color.sync="infor.w_border_bottom_color"
            :my_style.sync="infor.w_border_bottom_style"
          ></my-border>

          <my-border
            type="left"
            :my_width.sync="infor.w_border_left_width"
            :my_color.sync="infor.w_border_left_color"
            :my_style.sync="infor.w_border_left_style"
          ></my-border>

          <my-border
            type="right"
            :my_width.sync="infor.w_border_right_width"
            :my_color.sync="infor.w_border_right_color"
            :my_style.sync="infor.w_border_right_style"
          ></my-border>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.module_width" title="宽度"></my-number>
        <my-number v-model="infor.w_opacity" :max="1" :min="0.1" title="透明度" :step="0.1" ></my-number>
        <my-color v-model="infor.w_background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-img v-model="infor.w_bg_src"></my-img>
        <my-select v-model="infor.w_tile_style" title="背景平铺" :option="$store.state.options.backgroundRepeat"></my-select>
        <my-select v-model="infor.w_bg_position" title="背景位置" :option="$store.state.options.backgroundPosition"></my-select>
      </div>

    </div>

  </div>
</template>

<script>
  import style from './style';


  export default {
    name: 'layout_row_edit',
    props:{},
    data () {
      return {
        infor:null,
          isFirst:0
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          const id = this.$store.state.module_Data.widgets_id;
          const type = this.$store.state.module_Data.rowType;
          const index = this.templet.p_find_rowIndex({id,type});
          const changeVal = JSON.parse(JSON.stringify(val));
          this.$store.state[type][index].data.infor = changeVal;
            if(this.isFirst){
                this.templet.module_add_historical('编辑行容器');
            }
            this.isFirst++;

        },
        deep: true
      },

    },
    methods:{
        fixed_change(val){

            //只能存在一个可固定的容器
            if(val === 'fixed'){
                const now_widgets_id = this.$store.state.module_Data.widgets_id;
                this.$store.state.header.map((e)=>{
                    if(e.widgets_id != now_widgets_id){
                        e.data.infor.fixed = 'static';
                    }
                });
                this.templet.header_fixed_set(now_widgets_id);
            }
            else{
                this.$store.state.fixed.id = '';
                this.$store.state.fixed.top = '';
                this.$store.state.fixed.height = '';
                $('.rowFixedNext').remove();


            }
            const now_widgets_id = this.$store.state.module_Data.widgets_id;
           // const header = this.$store.state.header;
           // this.$store.state.header = [];
           /* this.$nextTick(()=>{
                debugger;
                $(`#u${now_widgets_id}`).draggable({ disabled: true });
               // this.$store.state.header = header;
            })*/
        }

    },

    created(){

    },
    components:{
    },

    mounted(){
        //应对第一次进来，可能触发watch也可能不触发watch
        this.infor = JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor));


    }
  }
</script>
