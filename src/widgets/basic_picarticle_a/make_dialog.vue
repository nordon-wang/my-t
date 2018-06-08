<template>
    <div class="addlist">
        <el-dialog
                :title="title"
                :visible="true"
                :modal-append-to-body="false"
                :before-close="cancel">

            <div class="listEdit">
                <p>
                    <b><img :src="myData.src"></b>
                    <el-button @click="selePic" type="primary">选择图片</el-button>
                </p>
                <input type="text" placeholder="此处填写标题" v-model="myData.title">
                <input type="text" placeholder="此处填写链接" v-model="myData.link">
                <textarea placeholder="此处填写内容" v-model="myData.content"></textarea>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sure" type="primary" >确 定</el-button>
                <el-button @click="cancel">取消</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "make_dialog",
        props:{

            myData:{
                type:Object,
                default:function () {
                    return {};
                },
            },
            title:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                Result:this.value
            }
        },
        methods:{
            sure(){
                this.$emit('sure',this.myData);

            },
            cancel(){
                this.$emit('cancel');
            },
            selePic: function() {
                var that = this;
                this.$store.state.showPicCon = true;
                this.$store.state.imgUrls = function (val) {
                    that.myData.src = val.src;
                };

            },
        }
    }
</script>

<style scoped>

</style>