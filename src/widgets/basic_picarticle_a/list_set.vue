<template>
    <div class="nav_column">
        <div class="nav_list_dialog">
            <el-dialog
                    title="导航栏目设置"
                    :visible="true"
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose" size="mini">取 消</el-button>
                    <el-button type="primary" @click="column_sure" size="mini">确 定</el-button>
                  </span>

            </el-dialog>
        </div>
        <!--<div class="nav_edit_dialog" v-if="editList">
            <el-dialog
                    title="列表编辑"
                    :visible="true"
                    :modal-append-to-body="false"
                    :before-close="editClose">
                <my-input
                        v-model="selectList.name"
                        title="栏目名称："
                        :my_style="{width:'300px'}"
                        :disabled="true"></my-input>
                <span style="color:#f00;">名称请去后台修改</span>

                <my-select
                        v-model="selectList.isopenwindow"
                        :option="$store.state.options.target"
                        :my_style="{width:'300px'}"
                        title="打开方式："></my-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editClose" size="mini">取 消</el-button>
                    <el-button type="primary" @click="listEditOk" size="mini">确 定</el-button>
                  </span>
            </el-dialog>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "nav_column",
        props:{
            value:{
                type:Boolean,
                default:false,
            },

        },
        data () {
            return{
                loading:false,
                isDisabled:true,
                infor:{
                    navCustomStyle:true,
                    styleId:'',
                    styleChoicIndex:'',
                    style:{
                        navBackground:'#f00',
                        navLiBackground:'#f60',
                        navColor:'#fff',
                        navBorderStyle:'dashed',
                        navBorderColor:'#f00',
                        navFontFamily:'Microsoft YaHei',
                        navFontWeight:'500',
                        navFontAlign:'center',
                        navOneWidth:122,
                        navWidth:1525,
                        navHeight:80,
                        navFontSize:16,
                        navBorderRadius:0
                    },
                    navSelectStyle:{
                        navSelectBackground:'#ccc',
                        navSelectColor:'#000',
                        navSelectFontSize:20,
                    },
                    dropDownStyle:{
                        dropDownBackground:'#f00',
                        dropDownColor:'#fff',
                        dropDownHeight:40,
                        dropDownFontSize:12,
                        dropDownBackgroundImage:'',
                        isRepeat:'repeat',
                        opacity:1,
                        navMarginTopHeight:10,
                        navMarginBottomHeight:10,
                    },
                    dropDownSelectStyle:{
                        dropDownSelectBackground:'#e3e3e3',
                        dropDownSelectColor:'#fff',
                        dropDownSelectFontSize:16,
                        height:20,
                        opacity:1
                    },
                    icon:{
                        position:'center-left',
                        fontSize:16,
                        dropDownFontSize:12,
                        childIcon:'',
                        color:'#f00',

                    }
                },
                //中转量，将选中的对象赋值
                selectList:{},
                index:{
                    parent:'',
                    child:''
                },
                Result:this.value,
                //listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
                listArr:[],
                editList:false

            }
        },
        watch:{
            Result(val,oldVal){
                this.$emit('input',val);//双向数据绑定
            },
            value(val){
                this.Result = val;
            }

        },
        methods:{
            column_sure(){
                this.templet.p_editModule({
                    key:'listArr',
                    val:JSON.parse(JSON.stringify(this.listArr))
                });
                this.$parent.nav_column = false;

            },
            handleClose(){
                this.$parent.nav_column = false;
            },

            editClose(){
                this.editList = false;
            },
            //点击显示/隐藏
            ShowOrHide:function (data) {
                var state = data.disabled == 'false' ? 'true' : 'false';
                data.disabled = state;
            },

            //折叠
            Fold:function (data,i) {
                data.isClose = data.isClose == "true" ? "false" : "true";
            },
            //父列表编辑
            parentEdit:function (i,val) {

                this.isDisabled = val.isSystem ? false : true;
                var obj = {
                    name:this.listArr[i].name,
                    disabled:this.listArr[i].disabled,
                    isopenwindow:this.listArr[i].isopenwindow,
                    index:{
                        parent:i,
                        child:null
                    }
                };

                this.selectList = obj;
                this.editList = true;
            },
            //子列表编辑
            childEdit:function (parentIndex,childIndex,val) {
                this.editList = true;
                this.isDisabled = val.isSystem ? false : true;
                var obj = {
                    name:this.listArr[parentIndex].children[childIndex].name,
                    disabled:this.listArr[parentIndex].children[childIndex].disabled,
                    isopenwindow:this.listArr[parentIndex].children[childIndex].isopenwindow,
                    index:{
                        parent:parentIndex,
                        child:childIndex
                    }
                }
                this.selectList = obj;
                //console.log(this.selectList)
            },
            //父列表，点击赋值index
            mousedown_parentIndex:function (i) {
                this.index.parent = i;
                this.index.child = null;

            },
            mousedown_childIndex:function (parentIndex,childIndex) {
                this.index.parent = parentIndex;
                this.index.child = childIndex;
                //console.log(this.index)
            },

            //父列表绑定排序
            parent_sortable(){
                const that = this;
                $('.navColumnList').sortable({
                    placeholder: "paixu",
                    handle: ".ben",
                    cancel:'.no_draggable',
                    stop:function (e, ui) {
                        var navColumnList = $(this);
                        var myList = [];
                        //1级进1级

                        if(that.cover && that.index.child == null){
                            //debugger;
                            myList = JSON.parse(JSON.stringify(that.listArr));
                            var obj = myList[that.index.parent];
                            myList[that.selectIndex].children.push(obj);
                            myList.splice(that.index.parent,1);
                        }
                        else{

                            myList = that.resetVal($('.navColumnList'));
                        }
                        that.listArr = [];

                        that.$nextTick(function () {
                            that.listArr = myList;
                            that.Re_binding();
                        });
                    }
                });
            },

            //子列表绑定排序
            child_sortable(){
                const that = this;
                $('.childFrame').sortable({
                    connectWith: ".navColumnList",
                    placeholder: "neipaixu",
                    cancel:'.no_draggable',
                    stop:function ( event, ui ) {
                        var myList = JSON.parse(JSON.stringify(that.listArr));
                        //2级进1级
                        if(that.cover && that.index.child != null && that.selectIndex!=that.index.parent){
                            //ui.item.remove();
                            var obj = myList[that.index.parent].children[that.index.child];
                            myList[that.selectIndex].children.push(obj);
                            myList[that.index.parent].children.splice(that.index.child,1);

                        }
                        else{
                            myList = that.resetVal($('.navColumnList'));

                        }
                        ui.item.remove();
                        that.listArr = [];
                        that.$nextTick(function () {
                            //debugger;
                            that.listArr = myList;
                            that.Re_binding();
                            //that.listArr = that.resetVal($('.navColumnList'));
                            //that.listDroppable();
                        });
                    }
                });
            },

            //列表绑定可放置
            listDroppable(){
                const that = this;
                //debugger;
                $('.navColumnList').find('.navOneLi').droppable({
                    hoverClass: "xuanfu",
                    accept:'.dropLi',
                    over:function (event, ui) {
                        that.cover = true;
                        //如果有子元素了，就不能放置了
                        if(ui.draggable.find('.childFrame').children().length > 0){
                            that.cover = false;
                        }
                        //console.log('是否可被放置',that.cover)
                        $('.neipaixu').css({
                            'background': '#f5f5f5',
                            'border': '1px #b5c8eb dashed'
                        });
                        $('.paixu').css({
                            'background': '#f5f5f5',
                            'border': '1px #b5c8eb dashed'
                        });

                        that.selectIndex = $(this).index('.navOneLi');
                    },
                    out:function (event, ui) {
                        that.cover = false;
                        $('.neipaixu').css({
                            'background': '#fff8a1',
                            'border': '1px #ff690a dashed'
                        });
                        $('.paixu').css({
                            'background': '#fff8a1',
                            'border': '1px #ff690a dashed'
                        });
                    }
                });
            },

            //排序后重置数据
            resetVal(obj) {
                var parentNum = obj.children('li').length;
                var arrList = [];
                for(var i = 0;i<parentNum;i++){
                    var parentObj = {
                        icon:obj.children('li').eq(i).children('.ben').children('span').text(),
                        name:obj.children('li').eq(i).children('.ben').children('strong').text(),
                        link:obj.children('li').eq(i).children('.ben').children('p').text(),
                        disabled:obj.children('li').eq(i).children('.ben').children('h1').text(),
                        id:obj.children('li').eq(i).children('.ben').children('h2').text(),
                        is_system:obj.children('li').eq(i).children('.ben').children('h3').text(),
                        isopenwindow:obj.children('li').eq(i).children('.ben').children('h4').text(),
                        module:obj.children('li').eq(i).children('.ben').children('h5').text(),
                        isClose:obj.children('li').eq(i).children('.ben').children('input').val(),
                        seq:obj.children('li').eq(i).children('.ben').children('i').text(),
                        isSystem:obj.children('li').eq(i).children('.ben').children('h6').text(),
                        children:[]
                    };
                    var childNum = obj.children('li').eq(i).children('.childFrame').children('li').length;
                    for(var j = 0;j<childNum;j++){
                        var childNode = obj.children('li').eq(i).children('.childFrame').children('li').eq(j).children('.ben');
                        var childObj = {
                            isClose:'false',
                            icon:childNode.children('b').attr('class'),
                            name:childNode.children('strong').text(),
                            link:childNode.children('p').text(),
                            disabled:childNode.children('h1').text(),
                            id:childNode.children('h2').text(),
                            is_system:childNode.children('h3').text(),
                            isopenwindow:childNode.children('h4').text(),
                            module:childNode.children('h5').text(),
                            isSystem:childNode.children('h6').text(),
                            //pid:childNode.children('h6').text(),
                            seq:childNode.children('i').text(),
                            children:[]
                        }
                        parentObj.children.push(childObj);
                    }
                    arrList.push(parentObj);
                }
                return arrList
            },

            //确定编辑
            listEditOk:function () {
                if(this.selectList.index.child == null){
                    //父列表数据赋值
                    var name = this.selectList.name.replace(/\"/g,'“').replace(/\'/g,'‘');
                    this.listArr[this.selectList.index.parent].name = name;
                    this.listArr[this.selectList.index.parent].disabled = this.selectList.disabled;
                    this.listArr[this.selectList.index.parent].isopenwindow = this.selectList.isopenwindow;
                }
                else{
                    //子列表数据赋值
                    var name = this.selectList.name.replace(/\"/g,'“').replace(/\'/g,'‘');
                    this.listArr[this.selectList.index.parent].children[this.selectList.index.child].name = name;
                    this.listArr[this.selectList.index.parent].children[this.selectList.index.child].disabled = this.selectList.disabled;
                    this.listArr[this.selectList.index.parent].children[this.selectList.index.child].isopenwindow = this.selectList.isopenwindow;
                }
                this.editList = false;


                /*if( this.selectList.name == ''){
                    this.$Message.info('栏目名称不能为空！');
                }
                else{

                }*/

            },

            //选择图标
            select_icon(val,type){
                const that = this;
                this.$store.state.icon_IsOpen = true;
                this.$store.state.icon_select_now = val.icon;
                this.$store.state.icon_Callback = function (icon) {
                    if(type == 'parent'){
                        val.icon = icon;
                    }
                    else{
                        that.infor.icon.childIcon = icon;
                    }

                };

            },
            del_icon(val,type){
                if(type == 'parent'){
                    val.icon = '';
                }
                else{
                    this.infor.icon.childIcon = '';
                }

            },
            Re_binding(){
                this.$nextTick(()=>{
                    this.parent_sortable();
                    this.child_sortable();
                    //列表绑定可放置
                    this.listDroppable();

                });
            },

            init(){
                this.loading = true;
                const that = this;
                $.ajax({
                    url:'/nav',
                    type:'get',
                    dataType: "json",
                    success(e){
                        that.loading = false;
                        if(e != 'null' && e.length > 0){
                            for(var i = 0 ;i<e.length;i++){
                                e[i].isClose = false;
                            }
                            that.listArr = e;
                            that.Re_binding();

                        }
                    },
                    error(err){
                        that.loading = false;
                    }

                });
            }

        },
        mounted(){
            this.init();
            debugger;







        }
    }
</script>

<style scoped>

</style>