<template>
    <div class="edit_list">
            <el-dialog
                    title="数据选择器"
                    :visible="true"
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div style="width: 680px;height:580px;">
                    <div class="contentButton">
                        <p class="inp">
                            <strong>输入搜索内容：</strong>
                            <el-input v-model="seachContent" placeholder="请输入内容" style="width:150px;float: left;height: 30px;"></el-input>

                            <el-button @click="seachStart" size="mini" type="primary" style="margin-left: 10px">搜索</el-button>
                            <span style="color: #f00">搜索后会取消选中！</span>

                        </p>
                        <el-button @click="selectAll" size="mini" type="primary">全选</el-button>
                        <el-button @click="noSelectAll" size="mini" style="margin-right: 10px">取消全选</el-button>
                    </div>

                    <div class="edit_list_body">
                        <el-table
                                ref="multipleTable"
                                v-loading="contentList"
                                height="551"
                                :data="list"
                                empty-text="暂无数据，请去后台添加"
                                @selection-change="handleSelectionChange"
                                style="width: 100%">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="图片"
                                    width="130">
                                <template slot-scope="scope">
                                    <my-thumbnail
                                            :width="50"
                                            :height="50"
                                            :src="scope.row.img"
                                            :is-mongolia="false"
                                            :is-max="false"
                                            :radius="0"
                                    ></my-thumbnail>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="标题"
                                    width="265">
                                <template slot-scope="scope">
                                    <p class="text">{{scope.row.title}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="内容">
                                <template slot-scope="scope">
                                    <p class="text">{{scope.row.summary}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="pageChange"
                                :current-page.sync="nowIndex"
                                :total="listLength">
                        </el-pagination>-->

                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose" size="mini">取 消</el-button>
                    <el-button type="primary" @click="contentSure" size="mini">确 定</el-button>
                  </span>

            </el-dialog>


    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: "edit_list",
        data () {
            return {
                seachContent:'',
                list:[],
                listAll:[],//存所有数据
                listLength:0,
                onePageLength:10,//分页每页多少条
                contentList:false,
                contentSelectBtn:false,
                nowIndex:1,
                multipleSelection:[],//最终选中的数据
                end_result:[]
            }
        },
        props:{
            type:{
                type:String,
                default:'product',
            },
            listArr:{
                type:Array,
                default:function () {
                    return [];
                },
            },

        },
        watch:{
            nowIndex(){
                this.$nextTick(()=>{
                    this.isSelect(this.list);
                })

            },
            seachContent(val){
                if(val.length === 0){
                    this.list = this.listAll;
                }

            }
        },
        created(){

        },
        components:{

        },
        methods:{
            handleClose(){
                this.seachContent='';
                this.contentList = false;
                this.$emit('close');
            },
            contentSure(){
                this.seachContent='';
                this.contentList = false;
                this.$emit('get_data',this.multipleSelection);

            },
            seachStart:function () {
                if(this.seachContent == ''){
                    alert('搜索内容不能为空！');
                    //this.$message.error('搜索内容不能为空！');
                    return;
                }
                var seachContent = this.seachContent;
                var list = [];
                this.nowIndex = 1;
                if( seachContent != ''){

                    for( var i = 0; i<this.listAll.length; i++){
                        for(var j in this.listAll[i] ){

                            //模糊搜索title和summary
                            if( j =="title" || j == "summary" ){
                                if( typeof this.listAll[i][j] === 'string' &&this.listAll[i][j].indexOf(seachContent) > -1){
                                    list.push(this.listAll[i]);
                                    break;
                                }
                            }
                        }
                    }
                    this.listLength = this.list.length;
                    this.list = list;
                }
                /*else{
                    //插入第一页的数据
                    //如果总数据小于每页展示总数
                    if( this.listLength < this.onePageLength){
                        for(var i = 0; i<this.listLength; i++){
                            list.push(this.listAll[i]);
                        }
                    }
                    else{
                        for(var i = 0; i<this.onePageLength; i++){
                            list.push(this.listAll[i]);
                        }
                    }



                    this.listLength = this.listAll.length;//处理分页器
                    this.list = list;
                    this.seachContent='';
                }*/
            },
            selectAll:function () {
                //先清空
                this.$refs.multipleTable.clearSelection();
                this.$nextTick(()=>{
                    //再全选
                    this.list.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    })
                });

            },
            noSelectAll:function () {
                this.$refs.multipleTable.clearSelection();
            },
            pageChange:function (i) {
                var dataStartIndex = (i - 1) * this.onePageLength;
                this.nowIndex = i;
                var dataEndIndex = dataStartIndex + ( this.onePageLength - 1 );
                this.list = [];
                var allLength = this.listAll.length;
                for(var j = dataStartIndex; j <= dataEndIndex; j++){
                    if(this.listAll[j]){
                        this.list.push(this.listAll[j]);
                    }
                    else{
                        break;
                    }
                }
            },
            /*seachStart:function () {
                var seachContent = this.seachContent;
                var list = [];
                this.nowIndex = 1;

                if( seachContent != ''){
                    for( var i = 0; i<this.listAll.length; i++){
                        for(var j in this.listAll[i] ){

                            //模糊搜索title和summary
                            if( j =="title" || j == "summary" ){
                                if( this.listAll[i][j].indexOf(seachContent) > -1){
                                    list.push(this.listAll[i]);
                                    break;
                                }
                            }
                        }
                    }
                    this.listLength = this.list.length;
                    this.list = list;
                }
                else{
                    //插入第一页的数据
                    //如果总数据小于每页展示总数
                    if( this.listLength < this.onePageLength){
                        for(var i = 0; i<this.listLength; i++){
                            list.push(this.listAll[i]);
                        }
                    }
                    else{
                        for(var i = 0; i<this.onePageLength; i++){
                            list.push(this.listAll[i]);
                        }
                    }

                    this.listLength = this.listAll.length;//处理分页器
                    this.list = list;
                    this.seachContent='';
                }
            },*/
            init(){
                const that = this;
                that.contentList = true;
                var $url = '';
                if (this.type == 'product') {
                    $url = '/index_pc.php/newapi/goods/getlist';
                }
                if (this.type == 'case') {
                    $url = '/index_pc.php/newapi/article/getlist/type/3';
                }
                if (this.type == 'article') {
                    $url = '/index_pc.php/newapi/article/getlist/type/1';
                }
                if (this.type == 'download') {
                    $url = '/index_pc.php/newapi/article/getlist/type/4';
                }
                if (this.type == 'video') {
                    $url = '/index_pc.php/newapi/article/getlist/type/11';
                }
                if (this.type == 'help') {
                    $url = '/index_pc.php/newapi/article/getlist/type/2';
                }

                const path = this.$store.state.domain + $url;

                $.get(path, function(data){
                  that.contentList = false;
                  var list = [];
                  if(data.code === 200){
                    list = data.data;
                    for(var i = 0;i<list.length;i++){
                      var num = parseInt(list[i].updatetime)*1000;
                      var t = new Date(num).toLocaleString();
                      var nian = t.split(' ')[0].replace(/\//g,'-');
                      list[i].createtime = nian;
                      list[i].up_time = nian;
                      list[i].time = nian;
                      list[i].src = list[i].img;
                      list[i].content = list[i].summary;
                      list[i].link = `/${that.type}-item-${list[i].id}.html`;
                      list[i].name = list[i].title;
                      list[i].my_type = that.type;
                      list[i].price_sell = list[i].price_sell ? list[i].price_sell.toFixed(2) : '0.00';
                    }

                    that.list = list;
                      that.listAll = list;//吧所有数据存一份
                    that.$nextTick(()=>{
                        that.isSelect(list);
                    })




                    /*that.listLength = list.length;

                    //插入第一页的数据
                    //如果总数据小于每页展示总数
                    if( that.listLength < that.onePageLength){
                      for(var i = 0; i<that.listLength; i++){
                        that.list.push(that.listAll[i]);
                      }
                    }
                    else{
                      for(var i = 0; i<that.onePageLength; i++){
                        that.list.push(that.listAll[i]);
                      }
                    }*/
                  }
                  else{
                    that.contentList = false;
                    that.$message.error('网络异常，请稍后尝试！');
                  }
                });
            },
            //手动单个选中或取消
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            isSelect(list){

                //处理数组
                var select_arr = [];
                //debugger;
                for(var i = 0;i<this.listArr.length;i++){
                    for(var j = 0;j<list.length;j++){
                        //id和标题一致，则为选中过的
                        if( this.listArr[i].id == list[j].id && this.listArr[i].title == list[j].name){
                            select_arr.push(list[j]);
                            break;
                        }
                    }
                }
                //debugger;
                select_arr.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            }


        },

        mounted(){
            this.init();
        }
    }
</script>

<style scoped>
    .contentHeader{
        width:100%;
        height: 30px;
        background: #ccc;
        margin-top: 5px;
        overflow: hidden;
    }
    .contentButton {
        width: 100%;
        height: 30px;
    }

    .contentButton button{
        float: right;
    }
    .contentButton strong{
        float: left;
        width: 200px;
        height: 30px;
        line-height: 30px;
    }
    .contentButton p{
        float: left;
    }
    .contentButton p strong{
        width: 100px;
    }
    .contentButton p button{
        float: left;
    }
    .contentButton button:nth-of-type(1){
        margin-right: 10px;
    }

    .contentHeader span{
        float: left;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .edit_list .text{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }


</style>
