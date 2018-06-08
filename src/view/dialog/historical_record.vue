<template>
    <div class="historical_record" :class="$store.state.historical.websql_is_show ? 'historical_sidebar_open' : ''">
        <div class="myHeader">
            历史记录
            <i class="el-icon-circle-close-outline right_sidebar_close" @click="right_sidebar_close"></i>
        </div>
        <el-button type="primary" @click="clear_all" style="display:block;margin: 0 auto;margin-top: 5px;width: 280px;">清空所有记录</el-button>
        <ul class="historical_record_list" v-if="has_webSQL">
            <li
                    v-for="(val,i) in $store.state.historical.historical_record"
                    :class="val.id === $store.state.historical.Pointer.id ? 'sele' : ''"
                    :data-historical_record_id="val.id"
                    @click="select_historical(val)">
                <div class="line">
                    <b>{{i+1}}</b>
                    <span class="right_sidebar_child_handle" :title="val.name">{{val.name}}</span>
                    <span class="right_sidebar_child_handle" :title="val.time && new Date(val.time).toLocaleString()">{{val.time|time_filters}}</span>
                    <!--<i class="el-icon-delete" @click.stop="del_historical(val,i)"></i>-->
                </div>

            </li>
        </ul>
        <div v-else class="no_websql_Prompt">
            <p>该浏览器不支持历史记录,</p>
            <p>请使用谷歌浏览器，能获得更好的体验！</p>
        </div>

    </div>
    
</template>

<script>
    export default {
        name: "historical_record",
        data() {
            return {
                selectId: "",
                isShow: true
            };
        },
        filters: {
            time_filters(val){
                const time = new Date(val).toLocaleString();
                const end = time.split(' ')[1];
                return end;
            }
        },
        methods: {
            right_sidebar_close() {
                this.$store.commit('historical/websql_close');
            },
            select_historical(val){
                this.$store.commit('historical/set_pointer_id',val.id);
                this.$store.dispatch('historical/find_sql',{
                    $message:this.$message,
                    type:'Select',
                    id:val.id
                });
                //this.templet.find_sql(this.$message,'Select',val.id);
            },
            /*del_historical(val,i){
                const historical_id = val.id;
                if(historical_id === this.$store.state.Pointer.id){
                    this.$message.error('当前选中的历史记录无法删除！');
                    return;
                }

                this.$confirm('是否删除此条历史记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$store.state.websql.transaction( (tx) => {
                        tx.executeSql('DELETE FROM historical_list WHERE id == ?',[historical_id], (txx,Result) =>{
                            if(Result.rows.length === 0){
                                this.$store.state.historical_record.splice(i,1);
                            }
                        });
                    })
                })

            },*/
            clear_all(){
                this.$confirm('是否清除所有历史记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(this.$store.state.historical.historical_record.length > 1){
                        const last_obj = this.$store.state.historical.historical_record[this.$store.state.historical.historical_record.length-1];
                        const last_id = last_obj ? last_obj.id : null;
                        if(last_id){
                            this.$store.dispatch('historical/clear_all',{last_id,last_obj});

                        }
                    }
                    else{
                        this.$message.error('只剩下一条历史记录，无法清除！');
                    }

                }).catch(()=>{})

            }
        },
        computed:{
            has_webSQL(){
                if(typeof openDatabase =='undefined'){
                    return false;
                }
                else{
                    return true;
                }
            }
        },
    }
</script>

<style scoped>

</style>