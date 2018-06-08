<template>
  <div class="dateIndex   mouseClass locationClass" :style="{
        width:infor.width ? infor.width + 'px' : css.module_width + 'px',
        height:infor.height ? infor.height + 'px' : css.module_height + 'px',

    }">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_map')">{{templet.p_nameToChinese(name)}}编辑</li>
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


    <div @dblclick.stop="select_parts('map_set','basic_map')">
      <div :id="'allmap'+id" :style="{
          width:infor.width ? infor.width + 'px' : css.module_width + 'px',
        height:infor.height ? infor.height + 'px' : css.module_height + 'px',
      }"></div>
    </div>
    <div class="noDrag" @dblclick.stop="select_parts('map_set','basic_map')"></div>
  </div>
</template>
<script type="text/ecmascript-6">
// import { MP } from "../../js/map";
export default {
  name: "basic_map",
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
      default: ""
    },
    pid: {
      type: String,
      default: ""
    },
    rowType: {
      type: String,
      default: ""
    },
      css:{
          type:Object,
          default:null,
      },
    name:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      address_detail: null, //详细地址
      userlocation: { lng: "", lat: "" },
      map: Object
    };
  },
  computed: {},
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    },
    initData(){
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
			let _pid = this.pid;
			let _rowtype = this.rowType;
			let _id = this.id;

			let IndexObj = this.templet.p_find_moduleIndex({
				pid: _pid,
				type: _rowtype,
				id: _id
			});

			let rowIndex = IndexObj.row;
			let moduleIndex = IndexObj.module;
      let rowtype = this.rowType;
      
      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css;
      
      this.$set(this.infor,'width',moduleObj.module_width || 200);
      this.$set(this.infor,'height',moduleObj.module_height || 200);

    }
  },
  updated() {

  },
  watch: {
    infor(val, oldval) {
      let that = this;
       var point
      if (val.zoom != oldval.zoom) {
        that.map.setZoom(val.zoom);
      }
      if (val.addressList != oldval.addressList) {
        var id = 'allmap'+this.id
        var map = new BMap.Map(id,{enableMapClick: false});
        if (val.addressList.length <= 0) {
           point = new BMap.Point(121.48789949, 31.24916171); // 创建点坐标
        } else {
           point = new BMap.Point(
            val.addressList[0].lng,
            val.addressList[0].lat
          ); // 创建点坐标
        }
        map.centerAndZoom(point, val.zoom);
        // map.enableScrollWheelZoom();
        for (let i = 0; i < val.addressList.length; i++) {
          var points = new BMap.Point(
            val.addressList[i].lng,
            val.addressList[i].lat
          );
          var marker = new BMap.Marker(points);
          map.addOverlay(marker); //绘制红点

          // marker.addEventListener("click", function(e) {
          //   var p = e.target;
          //   var pointss = new BMap.Point(
          //     p.getPosition().lng,
          //     p.getPosition().lat
          //   );
          //   var content = val.addressList[i].address;
          //   var opts = {
          //     width: 250, // 信息窗口宽度
          //     height: 80, // 信息窗口高度
          //     title: val.addressList[i].title, // 信息窗口标题
          //     // enableMessage: true, //设置允许信息窗发送短息
          //     enableAutoPan: true, 
          //     panel: "panel"
          //   };
          //   var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
          //   map.openInfoWindow(infoWindow, pointss);
          // });
        }
      }
    },
  },
  mounted() {
    let that = this;
    this.$nextTick(()=>{
// MP("dpBNyIO3vQGL9YDYyzwgclGUnEffPgGi").then(BMap => {
      var id = 'allmap'+this.id;
      var map = new BMap.Map(id,{enableMapClick: false}); // 创建Map实例
      that.map = map;
      var point = new BMap.Point(121.48789949, 31.24916171); // 创建点坐标
      map.centerAndZoom(point, 10);
      // map.enableScrollWheelZoom();
      
      for (let i = 0; i < that.infor.addressList.length; i++) {
        that.infor.addressList[i];
        var points = new BMap.Point(
          that.infor.addressList[i].lng,
          that.infor.addressList[i].lat
        );
        var marker = new BMap.Marker(points);
        map.addOverlay(marker); //绘制红点

        // marker.addEventListener("click", function(e) {
        //   var p = e.target;
        //   var pointss = new BMap.Point(
        //     p.getPosition().lng,
        //     p.getPosition().lat
        //   );
        //   var content = that.infor.addressList[i].address;
        //   var opts = {
        //     panel: "panel",
        //     width: 250, // 信息窗口宽度
        //     height: 80, // 信息窗口高度
        //     title: that.infor.addressList[i].title, // 信息窗口标题
        //     // enableMessage: true //设置允许信息窗发送短息
        //   };
        //   var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        //   map.openInfoWindow(infoWindow, pointss);
        // });
      }
    // });
    })
      

    if(!this.infor.width){
      this.initData();
      
    }
    
  }
};
</script>

<style  lang="scss" scoped="" type="text/css" >
.dateIndex {
  border: 1px solid transparent;
}
.noDrag {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  display: block;
}
.moduleTop .noDrag {
  display: none;
}
</style>
