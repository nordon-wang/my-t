<template id="PictureSelector">
  <div class="PictureSelector public_selector" :class="progressIsShow ? '' : 'noUpload'">
    <el-dialog
      title="图片库"
      :modal-append-to-body="false"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :visible="true">

      <div class="pic_body file_body">

        <el-tabs type="border-card" @tab-click="select_tab" v-model="activeName">
          <el-tab-pane label="个人图片" name="personal">
            <div class="con">
              <el-upload
                      style="width: 500px;"
                      name="imgFile"
                      class="upload-frame"
                      drag
                      action="/index_pc.php/newapi/filemanage/upload"
                      :file-list="upload_fileList"
                      :on-success="fileSucces"
                      :on-progress="progress"
                      :on-error="fileError"
                      :before-upload="beforeUpload"
                      :on-exceed="exceed"
                      :data="{pid:select_Folder ? select_Folder.id : 0}">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em >点击上传</em></div>
              </el-upload>
            </div>

            <div class="Crumbs">
              <span class="all" @click="select_all">所有文件</span>
              <span>/</span>
              <span>{{FolderName}}</span>
            </div>

            <div class="pic_list">
              <ul v-loading="isLoading">
                <p class="addFolderBtn"  @click="addFolder" v-show="!select_Folder">
                  <span style="height:6px;"></span>
                  <img src="static/image/f1.png">
                </p>
                <li v-for="(val,i) in view_fileList"
                    :class="[
                val.type == 'Pic' ? 'PicParent' : 'FolderParent',
                select_img.id == val.id ? 'sel' : ''
                ]">
                  <i class="right_bottom_btn el-icon-check" v-if="val.type=='Pic' && select_img.id == val.id"></i>
                  <span
                          class="pic_frame"
                          :class="[val.type == 'Pic' ? 'picFrame' : '']"
                  >
                <div class="click" @click="selePic(val)"></div>
                <div class="child">
                  <my-thumbnail
                          :src="$store.state.domain + val.src"
                          :width="80"
                          :height="60"
                          :is-mongolia="false"
                          v-if="val.src"
                          :radius="0"
                  ></my-thumbnail>
                  <img src="static/image/f2.png" v-else>
                  <!--<i class="fa-trash-o del_btn" style="font-family: FontAwesome" @click.stop="del_file(val,i)"></i>-->
                </div>

              </span>


                  <input type="text"
                         v-model="val.name"
                         class="imgName"
                         @focus="imgName_focus($event)"
                         @blur="imgName_blur($event,val.id)"
                         v-if="val.type === 'Folder'"
                  >
                  <p v-else class="imgName_p">{{val.name}}</p>

                </li>
              </ul>
            </div>

            <div class="progress" v-if="progressIsShow"></div>

          </el-tab-pane>
          <!--<el-tab-pane label="共享图片" name="share">
            <div class="con">
              <el-upload
                      style="width: 500px;"
                      name="image"
                      class="upload-frame"
                      drag
                      action="http://www.blog.com/headupload.html"
                      :file-list="upload_fileList"
                      :on-success="fileSucces"
                      :on-progress="progress"
                      :on-error="fileError"
                      :before-upload="beforeUpload"
                      :on-exceed="exceed"
                      multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em >点击上传</em></div>
              </el-upload>
            </div>

            <div class="Crumbs">
              <span class="all" @click="select_all">所有文件</span>
              <span>/</span>
              <span>{{FolderName}}</span>
            </div>

            <div class="pic_list">
              <ul>
                <p class="addFolderBtn"  @click="addFolder" v-show="!select_Folder">
                  <span style="height:6px;"></span>
                  <img src="static/image/f1.png">
                </p>
                <li v-for="(val,i) in view_fileList"
                    :class="[
                val.type == 'Pic' ? 'PicParent' : 'FolderParent',
                select_img.id == val.id ? 'sel' : ''
                ]">
                  <i class="right_bottom_btn el-icon-check" v-if="val.type=='Pic' && select_img.id == val.id"></i>
                  <span
                          class="pic_frame"
                          :class="[val.type == 'Pic' ? 'picFrame' : '']"
                  >
                <div class="click" @click="selePic(val)"></div>
                <div class="child">
                  <my-thumbnail
                          :src="val.src"
                          :width="80"
                          :height="60"
                          :is-mongolia="false"
                          v-if="val.src"
                          :radius="0"
                  ></my-thumbnail>
                  <img src="static/image/f2.png" v-else>
                  <i class="fa-trash-o del_btn" style="font-family: FontAwesome" @click.stop="del_file(val,i)"></i>
                </div>

              </span>


                  <input type="text" v-model="val.name" class="imgName" @focus="imgName_focus($event)" @blur="imgName_blur($event,val.id)">
                  &lt;!&ndash;<p>{{val.name}}</p>&ndash;&gt;

                </li>
              </ul>
            </div>

            <div class="progress" v-if="progressIsShow"></div>

          </el-tab-pane>-->
        </el-tabs>



      </div>


      <div slot="footer" class="dialog-footer">
        <!--<el-button type="warning" @click="addFolder" :disabled="isAddFolder" size="medium">新建文件夹</el-button>-->
        <el-button type="primary" @click="sure" size="medium">确 定</el-button>
        <el-button @click="handleClose" size="medium" type="text">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "PictureSelector",
    data () {
      return {
          activeName:'personal',
        percent:0,//上传进度
        upload_fileList:[],
        view_fileList:[],//用来渲染当前文件夹的数组
        all_fileList:[],//文件夹根目录数组
        FolderName:'',//子文件夹名称
        select_img:{},//当前选中的图片对象
        progressIsShow:false,
        select_Folder:null,//当前选中的文件夹
        isAddFolder:false,//是否可以新建文件夹
          isLoading:false,

          //存放接口获取的两种数据
          personal:[],//个人数据
          share:[],//共享数据.
      }
    },
    methods:{

      //上传成功后
      fileSucces(response, file, fileList){
          if(response.code === 200){
              this.percent = 0;
              this.upload_fileList = [];
              this.progressIsShow = false;
              this.$message.success('上传成功！');

              //插入图片
              if(this.select_Folder){
                  //如果是在子文件夹中上传图片
                  let Folder_id = this.select_Folder.id;
                  let Folder_index = 0;
                  //找到当前文件夹的索引
                  //debugger;
                  for(let i = 0;i<this.all_fileList.length;i++){
                      if(this.all_fileList[i].id == Folder_id){
                          Folder_index = i;
                          break;
                      }
                  }
                  this.add_Pic({img:response.data,Folder_index});

              }
              else{
                  //如果是在根目录中添加图片
                  let addIndex = this.img_index();
                  this.add_Pic({img:response.data,addIndex});
              }

          }


      },

      //图片开始插入的索引，图片一定在文件夹后面
      img_index(){
        for(let i = 0;i<this.all_fileList.length;i++){
          if(this.all_fileList[i].type != 'Folder'){
            return i;
          }
        }
      },

      //图片添加
      add_Pic({img,addIndex,Folder_index}){
        //因为可能是1张，可能是n张，所以都在图片列表中找
        /*for(let i = 0;i<fileList.length;i++){

        }*/
          let newObj = this.pic_Folder_obj({
              id:img.id,
              type:'Pic',
              name:img.name,
              src:img.path
          });

          if(addIndex){
              //插入根目录中
              this.view_fileList.splice(addIndex,0,JSON.parse(JSON.stringify(newObj)));
              this.all_fileList.splice(addIndex,0,JSON.parse(JSON.stringify(newObj)));
          }
          else{
              //插入文件夹中
              this.view_fileList.unshift(JSON.parse(JSON.stringify(newObj)));
          }
          //插入后，最后一个为选中
          this.select_img = newObj;


      },

      progress(event, file, fileList){
        this.percent = event.percent;
      },

      fileError(err, file, fileList){
        this.percent = 0;
        this.upload_fileList = [];
        this.progressIsShow = false;
        this.$message.error('图片上传失败，请检查网络！');
      },

      //文件超出上限
      exceed(){
        this.$message.error('每次只能上传一张图片!');
      },

      //图片选择
      selePic(val){
        if(val.type == 'Folder'){
          //选择的是文件夹
            this.view_fileList = [];
            this.select_Folder = JSON.parse(JSON.stringify(val));//当前选中文件夹数据赋值
            this.FolderName = val.name;//面包薛名字赋值
            this.isAddFolder = true;//新建文件夹按钮禁用
            this.get_img_list(val.id,1);


        }
        else{
          //选中的是图片
          this.select_img = JSON.parse(JSON.stringify(val));

        }
      },

      //删除文件
      del_file(val,index){
        var file_id = val.id;

        this.$confirm('删除文件会影响到使用该文件的地方，确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          //如果删除的是选中的图片
          if(file_id == this.select_img.id){
            this.select_img = {};
          }

          //删除视图渲染的数据
          this.view_fileList.splice(index,1);

          //删除备份数据
          for(let i = 0;i<this.all_fileList.length;i++){
            //根目录删除
            if(this.all_fileList[i].id == file_id){
              this.all_fileList.splice(i,1);
              break;
            }

            //子目录图片删除
            if(this.all_fileList[i].children.length > 0){
              for(let j = 0;j<this.all_fileList[i].children.length;j++){
                if(this.all_fileList[i].children[j].id == file_id){
                  this.all_fileList[i].children.splice(j,1);
                  break;
                }
              }
            }
          }
        }).catch(function () {

        });




      },

      //图片上传前
      beforeUpload(file){
        let type = file.type;
        //图片类型限制
        if(type != 'image/jpeg' && type != 'image/png' && type != 'image/bmp'){
          this.$message.error('只支持jpg,jpeg,png/bmp格式图片!');
          return false;
        }

        //图片大小限制
        if(file.size > 2097152){
          let str_size = Math.floor(file.size/1024/1024);
          this.$message.error('图片最大为2MB!');
          return false;
        }
        this.progressIsShow = true;

      },

      //新建文件夹
      addFolder(){
          this.isLoading = true;
          const data = {
              url: '/index_pc.php/newapi/filemanage/create_folder',
              type: 'post',
              data: {
                  pid: 0,
                  name: '新建文件夹',
                  type: 1
              }
          };
          this.templet.p_ajax(data).then((e)=>{
              this.isLoading = false;
              if(e.code === 200){
                  let newObj = this.pic_Folder_obj({
                      id:e.data.id,
                      type:'Folder',
                      name:'新建文件夹',
                  });
                  this.view_fileList.unshift(newObj);
                  this.all_fileList.unshift(newObj);
              }
              else{
                  this.$message.error('网络异常，请稍后尝试！');
              }
          }).catch((err)=>{
              this.isLoading = false;
              this.$message.error('网络异常，请稍后尝试！');
          })

      },

      //所有文件
      select_all(){
        //断开引用，良性冗余
        this.view_fileList = JSON.parse(JSON.stringify(this.all_fileList));
        this.select_Folder = null;//清空选择的文件
        this.FolderName = '';
        this.isAddFolder = false;//新建文件夹按钮开启使用
      },

      handleClose(){
        this.resetParameters();
      },

      //重置图片选择器参数
      resetParameters(){
        //全局对象重置
        this.$store.state.showPicCon = false;
        this.$store.state.imgUrls = null;

      },

      //创建图片或文件对象
      pic_Folder_obj({id,type,name,src=''}){
        return {
          id,
          type,
          src,
          name
        }
      },

      //确定选择
      sure(){
        let src = this.select_img.src;
        //将选中的图片的src返回出去
        this.$store.state.imgUrls(this.select_img);

        this.resetParameters();
      },

      //点击input选中所有字
      imgName_focus($event){
        $($event.target).css('border-color','#ccc');
        $($event.target).select();
      },

      //确认修改
      imgName_blur($event,id){
        let val = $($event.target).val();
        $($event.target).css('border-color','transparent');
        let file_id = id;
          this.isLoading = true;
          const data = {
              url: '/index_pc.php/newapi/filemanage/create_folder',
              type: 'post',
              data: {
                  id:file_id,
                  pid: 0,
                  name: val,
              }
          };

          this.templet.p_ajax(data).then((e)=>{
              this.isLoading = false;
              if(e.code === 200){
                  for(let i = 0;i<this.all_fileList.length;i++){
                      //根目录修改名称
                      if(this.all_fileList[i].id == file_id){
                          this.all_fileList[i].name = val;
                          break;
                      }
                  }
              }
              else{
                  this.$message.error('网络异常，请稍后尝试！');
              }
          }).catch((err)=>{
              this.isLoading = false;
              this.$message.error('网络异常，请稍后尝试！');
          })


      },

        //tab切换
        select_tab(){
            console.log(this.activeName);
        },

        //获取图片
        get_img_list(pid,type){
          this.isLoading = true;
          const data = {
              url:'/index_pc.php/newapi/filemanage/getlist',
              type:'post',
              data:{
                  pid,
                  ext:"\*.jpg;\*.jpeg;\*.gif;\*.png;\*.ico",
                  type
              }
          };
          this.templet.p_ajax(data).then((e)=>{
              this.isLoading = false;
              if(e.code === 200){
                  for(let i = 0;i<e.data.list.length;i++){
                      const val = e.data.list[i];
                      let obj = this.pic_Folder_obj({
                          id:val.id,
                          type:val.ext === 'F' ? 'Folder' : 'Pic',
                          src:val.ext === 'F' ? '' : val.path,
                          name:val.name,
                      });
                      //选择文件夹
                      if(pid){
                          this.view_fileList.push(obj);

                      }
                      //初始化
                      else{
                          this.all_fileList.push(obj);
                          this.view_fileList.push(obj);
                      }
                  }
              }
              else{
                  this.$message.error('网络异常，请稍后尝试！');
              }

          }).catch((err)=>{
              this.isLoading = false;
              this.$message.error('网络异常，请稍后尝试！');
          })
        },



    },
    mounted(){
        this.get_img_list(0,1);
    }
  }
</script>

<style>
div.public_selector > div.el-dialog__wrapper{
  z-index: 811214 !important;
}
</style>
