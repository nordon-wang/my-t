<template>
    <!-- 遮罩 -->
    <div class="pic-mask" v-show='showPicCon' @click="closeMask"></div>
</template>

<script>
export default {
    name:'edit_mask',
    computed:{
        showPicCon(){
            return this.$store.state.showMyMask;
        }
    },
    methods:{
        closeMask(){
            let _mydata = this.$store.state.module_Data;

            let _pid = _mydata.pid;
            let _rowtype = _mydata.rowType;
            let _id = _mydata.widgets_id;

            let IndexObj = this.templet.p_find_moduleIndex({
            pid: _pid,
            type: _rowtype,
            id: _id
            });

            let rowIndex = IndexObj.row;
            let moduleIndex = IndexObj.module;
            let rowtype = _mydata.rowType;

            this.$store.state[rowtype][rowIndex].children[moduleIndex].data.infor.isShows = false;
            
            this.$store.state.module_name = "";
            this.$store.state.parts = "";
            this.$store.state.module_Data = null;
            this.$store.state.hover_parts = "";
            this.$store.state.showMyMask = false;
        }
    }
}
</script>

<style>

    .pic-mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
</style>
