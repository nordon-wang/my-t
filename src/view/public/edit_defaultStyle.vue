<template id="DefaultStyleComponent">
  <div class="DefaultStyleComponent" v-loading="loading">
    <el-tabs type="border-card" @tab-click="tab_change">

      <el-tab-pane label="个人">
        <div class="body">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(val,i) in style" :key="i">
              <div class="child"
                   @click="selectStyle(val,i)"
                   :class="{'childSel' : $store.state.module_Data.data.infor.styleId == val.id}">
                <p>
                  <i class="el-icon-delete"
                     v-if="val.theme_type && val.author === $store.state.username"
                     style="background: #f00"
                     @click="deleStyle($event,val.id,i)"
                  ></i>
                  <i class="el-icon-view"
                     style="background: #0abf1a"
                     @click="look($event,val.img)"
                  ></i>

                </p>

                <div class="imgFrame">
                  <img :src="$store.state.domain + val.img">
                </div>

                <span :title="val.name">{{val.name}}</span>

              </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </el-tab-pane>

      <el-tab-pane label="共享" name="public">
        <div class="body">
          <swiper :options="swiperOption" v-if="public_swiper && public_style.length > 0">
            <swiper-slide v-for="(val,i) in public_style" :key="i">
              <div class="child"
                   @click="selectStyle(val,i)"
                   :class="{'childSel' : $store.state.module_Data.data.infor.styleId == val.id}">
                <p>
                  <i class="el-icon-delete"
                     v-if="val.theme_type && val.author === $store.state.username"
                     style="background: #f00"
                     @click="deleStyle($event,val.id,i)"
                  ></i>
                  <i class="el-icon-view"
                     style="background: #0abf1a"
                     @click="look($event,val.img)"
                  ></i>

                </p>

                <div class="imgFrame">
                  <img :src="$store.state.domain + val.img">
                </div>

                <span :title="val.name">{{val.name}}</span>

              </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <p v-else class="Default_Prompt">暂无数据！</p>
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-dialog
      title="样式预览"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="lookImg">
        <img :src="$store.state.domain + src">
      </div>

    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import StyleList from '@/base/style_list_config';

//只在生产环境中引入
/*if(process.env.NODE_ENV === 'development'){
    var my_path = require('../../../config/index');
}*/


  export default {
    name: 'DefaultStyle',
    props:{
      infor:{
        type:Object,
        default:null,
      },
    },
    data () {
      return {
        devUrl:'', //开发域名
        src:'',
        addStyleVisible:true,
        dialogVisible:false,
        selectId:null,
        style:[],
        public_style:[],
        styleSaveModal:false,
        styleSaveObj:{
          name:'',
          widget_name:this.$store.state.module_Data.name,
          style:'',
          img:'',
          public:'false'
        },
        deleStyleSureModal:true,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween:5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
          public_swiper:false,
          loading:false,


      }
    },
    watch:{


    },
    methods:{

      //图片选择
      selePic(){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (src) {
          that.styleSaveObj.img = src;
        }
      },
      //默认样式选择
      selectStyle:function (val,i) {
        let styleinfor = JSON.parse(val.style);
        // debugger;
        styleinfor.styleId = val.id;//改变数据源
        this.templet.p_editModule({
          key:'infor',
          val:styleinfor
        });
        this.templet.select_style_module();
          const name = this.templet.p_nameToChinese(this.$store.state.module_Data && this.$store.state.module_Data.name);
          this.templet.module_add_historical(name + '样式切换');

      },
      deleStyle:function (e,id,i) {
        const that = this;
        this.$confirm('删除选中样式?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
              that.templet.p_ajax({
                type:'post',
                url:'/index_pc.php/newapi/widgetstyle/del/id/',
                data:{
                  id,
                  author:that.$store.state.username
                }
              }).then(function (data) {
                if(data.code === 200){
                  that.style.splice(i,1);

                }
                else{
                  that.$message.error('网络异常，请稍后尝试！');
                }
              }).catch(function (e) {
                that.$message.error('网络异常，请稍后尝试！');
              });
          }).catch(function () {
            return false;
          });

        //阻止时间冒泡
        e.stopPropagation()

      },

      look:function (e, src) {
        e.stopPropagation();
        this.dialogVisible = true;
        this.src = src;
      },
        init(FROM){
          const that = this;
          this.loading = true;
            this.templet.p_ajax({
                type:'post',
                url:'/index_pc.php/newapi/widgetstyle/getlist',
                data:{
                    widget_name:this.$store.state.module_Data.name,
                    author:this.$store.state.username,
                    from:FROM
                }
            }).then(function (data) {
                that.loading = false;
                if(data.code === 200){
                    if(data.data != null && data.data instanceof Array){
                        if(FROM === 'self'){
                            for(let i = data.data.length-1;i>=0;i--){
                                that.style.unshift(data.data[i]);
                            }
                        }
                        else{
                            data.data.map((val)=>{
                                that.public_style.push(val);
                            });
                        }
                    }
                    else{
                        that.$message({
                            message: '仅有默认样式',
                            type: 'success'
                        });
                    }
                }
                else{
                    that.$message.error('网络异常，请稍后尝试！');
                }
            }).catch(function (e) {
                that.loading = false;
                that.$message.error('网络异常，请稍后尝试！');
            });
        },
        tab_change(tab){
            if(tab.name === 'public'){
                this.public_swiper = true;
            }

        }

    },
    components:{

    },

    mounted(){
      const that = this;
      // 读取默认的样式
        StyleList[this.$store.state.parts].DefaultStyle.forEach((item,index) => {
        this.style.unshift(item);
      });

        this.init('self');
        this.init('public');







        /**@augments
       * 样式选择 图片域名地址..
       */
      /*if(process.env.NODE_ENV === 'development' && my_path){
        this.devUrl = my_path.dev.proxyTable['/index_pc.php'].target + '/';
      }
*/
    }
  }
</script>
