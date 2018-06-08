<template>
    <div class="DefaultStyleComponent">

        <div class="addStyle" >
            <el-dialog
                    :title="type === 'module' ? '模板保存' : '容器保存'"
                    :modal-append-to-body="false"
                    :before-close="handleClose"

                    :visible="true">
                <div v-loading="isLoading">
                    <div class="addStyle_imgFrame" @click="selePic">
                        <p v-if="styleSaveObj.img == ''">点击选择图片</p>
                        <img :src="styleSaveObj.img" v-else>
                    </div>

                    <el-input v-model="styleSaveObj.name" placeholder="请输入组合名称"></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="addStyleSure">确 定</el-button>
                </div>
            </el-dialog>
        </div>


    </div>
</template>

<script>

    export default {
        name: "template_save_dialog",
        props:{
            type:{
                type:String,
                default:'',
            },
            close:{
                type:Function,
                default:Function,
            },
            list:{
                type:Array,
                default:function () {
                    return [];
                },
            },

        },
        data () {
            return {
                styleSaveObj:{
                    name:'',
                    widget_name:'' ,
                    style:'',
                    img:'',
                    public:'false'
                },
                isLoading:false

            }
        },
        methods:{
            handleClose(){
                this.close();
            },
            //确认选择
            addStyleSure(){
                if(!this.styleSaveObj.name){
                    this.$message.error('请输入模板名称！');
                    return;
                }

                let SaveObj = {
                    group_name:this.styleSaveObj.name,
                    type:this.type === 'module' ? 'new_group' : 'new_row',
                    author:this.$store.state.username,
                    img:this.styleSaveObj.img,
                    list:this.type === 'module' ? JSON.stringify(this.$store.state.select_module.jsonArr) : JSON.stringify(this.$store.state.select_row)
                };

                const pam = {
                    url:'/index_pc.php/newapi/widget/add_group',
                    type:'post',
                    data:SaveObj,
                };
                this.isLoading = true;

                //发送请求
                this.templet.p_ajax(pam).then((e)=>{
                    this.isLoading = false;
                    if(e.code === 200 && e.data.ack === true){
                        SaveObj.id = e.data.data;
                        this.$message.success('保存成功！');
                        //this.$emit('addlist',SaveObj)
                        this.list.unshift(SaveObj);
                        this.close();
                    }
                }).catch(()=>{
                    this.isLoading = false;
                })



            },
            //图片选择
            selePic(){
                const that = this;
                this.$store.state.showPicCon = true;
                this.$store.state.imgUrls = function (val) {
                    that.styleSaveObj.img = val.src;
                }
            },
        },
    }
</script>

<style scoped>

</style>