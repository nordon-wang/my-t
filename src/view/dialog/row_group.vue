<template>
    <div class="row_group_dialog moduleAndRowList" :class="$store.state.row_group_is_show ? 'row_group_show' : ''">
        <div class="myHeader">
            容器组合
            <i class="el-icon-circle-close-outline right_sidebar_close" @click="right_sidebar_close"></i>
        </div>
        <el-button type="primary" @click="template_save" style="display:block;margin: 0 auto;margin-top: 5px;width: 280px;">保存容器</el-button>
        <ul class="template_list" v-loading="isLoading">
            <li
                    v-for="(val,i) in list"
                    :data-tid="val.id"
                    @click="select_template(val)">
                <div class="myImg">
                    <my-thumbnail
                            :src="val.img ? val.img : '../../../static/image/pic.png'"
                            :width="86"
                            :height="100"
                            :is-mongolia="false"
                            :radius="0"
                    ></my-thumbnail>
                    <!--<img :src="val.img ? val.img : '../../../static/image/pic.png'">-->
                </div>
                <p :title="val.group_name">{{val.group_name}}</p>
                <i class="el-icon-delete" @click.stop="del_template(val,i)"></i>
            </li>
        </ul>
        <template-save-dialog
                type="row"
                v-if="isShow"
                :list="list"
                :close="close_dialog"></template-save-dialog>
    </div>
    
</template>

<script>
    import templateSaveDialog from "./template_save_dialog";
    export default {
        name: "row_group",
        data() {
            return {
                list:[],
                isShow: false,
                isLoading:false
            };
        },
        watch:{
            '$store.state.row_group_is_show'(val){
                if(val){
                    this.init();
                }
            }
        },
        methods: {
            add_list(obj){
                this.list.unshift(obj);
            },
            close_dialog(){
                this.isShow = false;
            },

            right_sidebar_close() {
                this.$store.state.row_group_is_show = false;
            },

            //处理row，插入进去
            row_child_filter(row){
                const row_id = this.$store.state.select_row.widgets_id;
                const rowType = this.$store.state.select_row.rowType;
                const row_index = this.templet.p_find_rowIndex({
                    id: row_id,
                    type: rowType
                });

                this.$store.state[rowType].splice(row_index + 1, 0, this.templet.paste_row_filter(row));
            },

            //生成一个新的row
            create_row(arr){
                let row = null;
                let children = [];
                for(let i = 0 ; i<arr.length; i++){
                    if(arr[i].data.name === 'layout_row'){
                        row = arr[i].data;
                    }
                    else{
                        children.push(arr[i].data);
                    }
                }
                if(row){
                    row.children = children;
                }
                return row;
            },

            select_template(val){
                if(this.$store.state.select_row){
                    let group_id = val.id;

                    const pam = {
                        url:`/index_pc.php/newapi/widget/getinfo/group_id/${group_id}`,
                        type:'get',
                    };
                    this.isLoading = true;
                    this.templet.p_ajax(pam).then((e)=>{
                        this.isLoading = false;
                        if(e.code === 200 && e.data.ack === true && e.data.data.length > 0 ){
                            const row = this.create_row(e.data.data);
                            if(row){
                                this.row_child_filter(JSON.parse(JSON.stringify(row)));
                                this.templet.module_add_historical('使用容器组合');
                            }
                            else{
                                this.$message.error('网络异常，请检查网络！');
                            }
                        }
                        else{
                            this.$message.error('网络异常，请检查网络！');
                        }
                    }).catch(()=>{
                        this.isLoading = false;
                        this.$message.error('网络异常，请检查网络！');
                    })
                }
                else{
                    this.isLoading = false;
                    this.$message.error('请选择容器！');
                }
            },

            template_save(){
                if(this.$store.state.select_row != null){
                    this.isShow = true;
                }
                else{
                    this.$message.error('请先选择容器！');
                }

            },

            del_template(val,i){
                this.$confirm('是否删除此条模板?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let id = val.id;
                    const pam = {
                        url:`/index_pc.php/newapi/widget/del_group`,
                        type:'get',
                        data:{
                            id
                        }
                    };
                    this.isLoading = true;
                    this.templet.p_ajax(pam).then((e)=>{
                        this.isLoading = false;
                        if(e.code === 200 && e.data.ack){
                            this.list.splice(i,1);

                        }else{
                            this.$message.error('网络异常，请检查网络！');
                        }

                    }).catch(()=>{
                        this.isLoading = false;
                        this.$message.error('网络异常，请检查网络！');
                    })
                }).catch(()=>{})




            },

            init(){
                this.list = [];
                const ajax_data = {
                    author:this.$store.state.username,
                    group_type:'new_row',
                    from:'myself',
                    row:9999
                }
                const pam = {
                    url:'/index_pc.php/newapi/widget/group_list',
                    type:'get',
                    data:ajax_data,
                };
                this.isLoading = true;

                this.templet.p_ajax(pam).then((e)=>{
                    this.isLoading = false;
                    if(e.code === 200 && e.data.ack === true){
                        this.list = e.data.data;
                    }
                    else{
                        this.$message.error('网络异常，请检查网络！');
                    }
                }).catch(()=>{
                    this.isLoading = false;
                    this.$message.error('网络异常，请检查网络！');
                })
            }
        },
        components:{
            templateSaveDialog
        },
        mounted(){
            this.init();
        }
    }
</script>

<style scoped>

</style>