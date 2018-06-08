<template>
  <div class="dateIndex  " :style="moduleClass">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_date')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div @dblclick.stop="select_parts('','basic_date')">
      <div :style="dataStyle" data-Highlight="date_set1" class="mouseClass wDefaultBorder " @dblclick.stop="select_parts('date_set1','basic_date')" :class="[
          $store.state.module_Data && $store.state.parts == 'date_set1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'date_set1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]">
        {{datas.year}}{{infor.year}}{{datas.months}}{{infor.month}}{{datas.day}}{{infor.day}}
      </div>
      <div :style="timeStyle" class="mouseClass wDefaultBorder" data-Highlight="date_set2" @dblclick.stop="select_parts('date_set2','basic_date')" :class="[
          $store.state.module_Data && $store.state.parts == 'date_set2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'date_set2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]">
        {{datas.hours}}{{infor.hours}}{{datas.minutes}}{{infor.minutes}}{{datas.seconds}}{{infor.seconds}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basic_date',
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    },
    pid: {
      type: String,
      default: ''
    },
    rowType: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      datas: {
        year: '',
        months: '',
        day: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
    }
  },
  computed: {
    moduleClass() {
      return {
        width: this.infor.allwidth + 'px',
        height: this.infor.allheight + 'px',
        lineHeight: this.infor.allheight + 'px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }
    },
    dataStyle() {
      return {
        display: this.infor.date_is_show === 'block' ? 'inline-block' : 'none',
        fontSize: this.infor.date_fs + 'px',
        color: this.infor.date_color,
        marginRight: this.infor.date_mr + 'px',
        height: '100%'
      }
    },
    timeStyle() {
      return {
        display: this.infor.time_is_show === 'block' ? 'inline-block' : 'none',
        fontSize: this.infor.time_fs + 'px',
        color: this.infor.time_color,
        height: '100%'
      }
    }
  },
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
    },
    setDate() {
      var date = new Date()
      this.$data.datas.year = date.getFullYear()
      this.$data.datas.months = date.getMonth() + 1
      this.$data.datas.day = date.getDate()
    },
    setTime() {
      let timer
      timer = setInterval(() => {
        var date = new Date()
        this.$data.datas.hours = date.getHours()
        this.$data.datas.minutes = date.getMinutes()
        this.$data.datas.seconds = date.getSeconds()
      }, 500)
    },
    initData() {
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
      let _pid = this.pid
      let _rowtype = this.rowType
      let _id = this.id

      let IndexObj = this.templet.p_find_moduleIndex({
        pid: _pid,
        type: _rowtype,
        id: _id
      })

      let rowIndex = IndexObj.row
      let moduleIndex = IndexObj.module
      let rowtype = this.rowType

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'allwidth', moduleObj.module_width || 200)
      this.$set(this.infor, 'allheight', moduleObj.module_height || 200)
    },
    test(num) {
      if(num < 10){
        return num + ''
      }

      let length = Math.pow(10,num.toString().split('').length - 1)
      
      if(num % length){
        return Math.floor(num / length) * length + ' + ' + this.test(num % length)
      }else{
        return Math.floor(num / length) * length + ''
      }

    }
  },
  updated() {
    var date = new Date()
    this.$data.datas.hours = date.getHours()
    this.$data.datas.minutes = date.getMinutes()
    this.$data.datas.seconds = date.getSeconds()
  },
  mounted() {
    this.setDate()
    this.setTime()

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.initData()
    }

    //
    /* {
      eventName:[fn...]
    } */
    //
  }
}
</script>

<style lang="scss" scoped="" type="text/css" >
</style>
