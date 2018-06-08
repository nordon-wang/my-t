<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span @click="templet.p_select_parts('map_set')" class="mouseClass" data-Highlight="map_set">地图设置</span>
    </div>

    <!--地图设置-->
    <div class="Routine_setting btm_4cols " v-if="$store.state.parts == 'map_set'">
      <div id="l-map"></div>
      <p class="map-slider">
        <span class="demonstration">放大倍率选择：</span>
        <el-slider v-model="infor.zoom" @change="changeSlider" :max="20" :min="1"></el-slider>
      </p>
      <p class="map-address">
        <el-button size="mini" @click="addLocation">添加地址</el-button>
        <!-- <el-button type="primary" size="mini" @click="allLocation2" v-show="infor.addressList.length > 0">全部定位</el-button> -->
      </p>
      <ul class="map-list ">
        <li v-for="(item,index) in myAddressList" :key="index">
          <my-input title='标题：' v-model="item.title"></my-input>
          <my-input title='地址：' v-model="item.address"></my-input>
          <el-button size="mini" @click="indexLocation2(index)" type="primary">定位</el-button>
          <el-button size="mini" @click="removerLocation(index)" type="danger">删除</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import style from "./style";
// import { MP } from "../../js/map";
export default {
  name: "basic_map_edit",
  props: {},
  data() {
    return {
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      ),
      myAddressList: Array
    };
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "infor",
          val: JSON.parse(JSON.stringify(val))
        });
        this.templet.module_add_historical("编辑地图组件");
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "animateObj",
          val: JSON.parse(JSON.stringify(val))
        });
        this.templet.module_add_historical("编辑地图组件");
      },
      deep: true
    }
  },
  methods: {
    changeSlider(val) {
      this.infor.zoom = val;
    },
    allLocation() {
      this.infor.zoom = 6;
      let that = this;
      // MP("dpBNyIO3vQGL9YDYyzwgclGUnEffPgGi").then(BMap => {
      for (let i = 0; i < this.myAddressList.length; i++) {
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(
          that.myAddressList[i].address,
          function(point) {
            if (point) {
              that.myAddressList[i].lng = point.lng;
              that.myAddressList[i].lat = point.lat;
              console.log("定位成功", point);
            } else {
              alert(
                "您填写的" + that.myAddressList[i].address + "没有解析到结果"
              );
            }
          },
          ""
        );
      }
      // });
      that.infor.addressList = that.myAddressList;
      that.myAddressList = JSON.parse(JSON.stringify(that.infor.addressList));
    },
    allLocation2() {
      this.infor.zoom = 6;
      let that = this;
      var map = new BMap.Map("l-map");
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      for (let i = 0; i < this.myAddressList.length; i++) {
        var options = {
          onSearchComplete: function(results) {
            console.log(results);
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              let point = results.getPoi(0).point;
              that.myAddressList[i].lng = point.lng;
              that.myAddressList[i].lat = point.lat;
              console.log("定位成功", point);
            } else {
              alert(
                "您填写的" + that.myAddressList[i].address + "没有解析到结果!"
              );
            }
          }
        };
        var local = new BMap.LocalSearch(map, options);
        local.search(that.myAddressList[i].address);
      }
      that.infor.addressList = that.myAddressList;
      that.myAddressList = JSON.parse(JSON.stringify(that.infor.addressList));
    },
    indexLocation(index) {
      let that = this;
      // MP("dpBNyIO3vQGL9YDYyzwgclGUnEffPgGi").then(BMap => {
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(
        that.myAddressList[index].address,
        function(point) {
          if (point) {
            that.myAddressList[index].lng = point.lng;
            that.myAddressList[index].lat = point.lat;
            console.log("定位成功", point);
            that.infor.addressList = that.myAddressList;
            that.myAddressList = JSON.parse(
              JSON.stringify(that.infor.addressList)
            );
          } else {
            alert(
              "您填写的" + that.myAddressList[index].address + "没有解析到结果!"
            );
          }
        },
        ""
      );
      // });
    },
    indexLocation2(index) {
      let that = this;
      var map = new BMap.Map("l-map");
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

      var options = {
        onSearchComplete: function(results) {
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            let point = results.getPoi(0).point;
            that.myAddressList[index].lng = point.lng;
            that.myAddressList[index].lat = point.lat;
            console.log("定位成功", point);
            that.infor.addressList = that.myAddressList;
            that.myAddressList = JSON.parse(
              JSON.stringify(that.infor.addressList)
            );
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              // if()
            }
          } else {
            alert(
              "您填写的" + that.myAddressList[index].address + "没有解析到结果!"
            );
          }
        }
      };
      var local = new BMap.LocalSearch(map, options);
      local.search(that.myAddressList[index].address);
    },
    addLocation() {
      if (this.myAddressList.length > 9) {
        this.$message({
          message: '最多添加十条信息！',
          type: 'warning'
        });
      }else{
        this.myAddressList.push({
          title: "新标题",
          address: "上海水电路682号",
          lng: 121.481877,
          lat: 31.289386
        });
      }
      
    },
    removerLocation(index) {
      let that = this;
      that.myAddressList.splice(index, 1);
      let all = this.myAddressList;
      that.myAddressList = [];
      that.$nextTick(() => {
        that.myAddressList = all;
        that.infor.addressList = that.myAddressList;
        that.myAddressList = JSON.parse(JSON.stringify(that.infor.addressList));
      });
    }
  },
  mounted() {
    this.myAddressList = JSON.parse(JSON.stringify(this.infor.addressList));
  }
};
</script>

<style scoped>
.map-slider {
  width: 50%;
  float: left;
  line-height: 38px;
  margin-top: 5px;
}
.map-slider span {
  float: left;
}
.map-slider >>> .el-slider {
  float: left;
  width: 50%;
}
.map-address {
  width: 50%;
  float: right;
  margin-top: 5px;
}
.map-list {
  clear: both;
  overflow: hidden;
}
.map-list li {
  float: left;
  width: 250px;
  height: 110px;
  margin-bottom: 10px;
}
.map-list li >>> input {
  height: 32px;
}
.Routine_setting {
  height: 170px;
  overflow: auto;
}
.map-list .el-button,
.map-list >>> .myInput {
  margin-top: 2px;
}
</style>
