<template>
  <div class="navEdit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

       <span @click="column_dialog"
             class="mouseClass"
             data-Highlight=""
       >列表设置</span>
        <span
                @click="templet.p_select_parts('box_set')"
                class="mouseClass"
                data-Highlight="box_set"
                :class="[
           $store.state.hover_parts == 'box_set'  ? 'index_Highlight' : ''
           ]"
        >容器设置</span>
        <span
                @click="templet.p_select_parts('module_attribute')"
                class="mouseClass"
                data-Highlight="module_attribute"
                :class="[
           $store.state.hover_parts == 'module_attribute'  ? 'index_Highlight' : ''
           ]"
        >模块属性</span>

        <span
                @click="templet.p_select_parts('module_img')"
                class="mouseClass"
                data-Highlight="module_img"
                :class="[
           $store.state.hover_parts == 'module_img'  ? 'index_Highlight' : ''
           ]"
        >
            图片属性
            <i v-if="infor.pic.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('module_title')"
                class="mouseClass"
                data-Highlight="module_title"
                :class="[
           $store.state.hover_parts == 'module_title'  ? 'index_Highlight' : ''
           ]"
        >
            标题属性
            <i v-if="infor.title.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('module_content')"
                class="mouseClass"
                data-Highlight="module_content"
                :class="[
           $store.state.hover_parts == 'module_content'  ? 'index_Highlight' : ''
           ]"
        >
            内容属性
            <i v-if="infor.content.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('module_time')"
                class="mouseClass"
                data-Highlight="module_time"
                :class="[
           $store.state.hover_parts == 'module_time'  ? 'index_Highlight' : ''
           ]"
        >
            时间属性
            <i v-if="infor.time.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('module_id')"
                class="mouseClass"
                data-Highlight="module_id"
                :class="[
           $store.state.hover_parts == 'module_id'  ? 'index_Highlight' : ''
           ]"
        >
            序列属性
            <i v-if="infor.sequence.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('class_title')"
                class="mouseClass"
                data-Highlight="class_title"
                v-if="infor.classTitle"
                :class="[
           $store.state.hover_parts == 'class_title'  ? 'index_Highlight' : ''
           ]"
        >
            分类标题
            <i v-if="infor.classTitle.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('module_header')"
                class="mouseClass"
                data-Highlight="module_header"
                :class="[
           $store.state.hover_parts == 'module_header'  ? 'index_Highlight' : ''
           ]"
        >
            组件标题
            <i v-if="infor.header.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('class_btn')"
                class="mouseClass"
                data-Highlight="class_btn"
                :class="[
           $store.state.hover_parts == 'class_btn'  ? 'index_Highlight' : ''
           ]"
        >分类按钮</span>

        <span
                @click="templet.p_select_parts('banner_btn')"
                class="mouseClass"
                data-Highlight="banner_btn"
                :class="[
           $store.state.hover_parts == 'banner_btn'  ? 'index_Highlight' : ''
           ]"
        >
            轮播按钮
            <i v-if="infor.btnStyle.display === 'none'" class="fa fa-eye-slash"></i>
        </span>

        <span
                @click="templet.p_select_parts('mongolia_layer')"
                class="mouseClass"
                data-Highlight="mongolia_layer"
                :class="[
           $store.state.hover_parts == 'mongolia_layer'  ? 'index_Highlight' : ''
           ]"
        >
            蒙层设置
            <i v-if="infor.Mongolia.isOpen === 'false'" class="fa fa-eye-slash"></i>
        </span>
    </div>

      <!--列表设置-->
      <div class="listSetUp" id="listSetUp" v-if="list_set">
          <el-dialog
                  title="列表设置"
                  :visible="true"
                  :modal-append-to-body="false"
                  :before-close="handleClose">
              <div style="height: 400px;">
                  <div class="listAdministration">
                      <h5 class="title">
                          <my-select v-model="listArr.listType" title="类型选择：" :option="$store.state.options.listType" @change="typeChage" :my_style="{width:'120px'}"></my-select>
                          <div class="top_btn">
                              <el-button @click="openListSele" type="primary" :disabled="btn_disabled.indexOf(listArr.listType) > -1 ? true : false">内容选择</el-button>
                              <el-button @click="openAddList" :disabled="btn_disabled.indexOf(listArr.listType) > -1 ? true : false">添加</el-button>
                          </div>

                          <p v-if="contentSelectBtn"></p>
                      </h5>
                      <ul class="listbox" v-show="listArr.listType == 'product' || listArr.listType == 'case' || listArr.listType == 'article' || listArr.listType == 'video' || listArr.listType == 'download' || listArr.listType == 'help'">
                          <li v-for="(val,i) in listArr.listArr" class="allListOne">
                              <h6 style="display: none" v-text="val.id"></h6>
                              <img :src="val.src">
                              <div class="listCenter">
                                  <p>
                                      <span>标题：</span>
                                      <b v-text="val.title"></b>
                                  </p>
                                  <p>
                                      <span>链接：</span>
                                      <i v-text="val.link"></i>
                                  </p>
                                  <p>
                                      <span>简介：</span>
                                      <strong v-text="val.content"></strong>
                                  </p>

                              </div>
                              <em v-text="val.time" style="display: none"></em>
                              <h1 v-text="val.type_name" style="display: none"></h1>
                              <div class="myBtn">
                                  <el-button @click="listEditBtn(i)" size="mini">编辑</el-button>
                                  <el-button @click="listDelBtn(i)" size="mini">删除</el-button>
                              </div>


                          </li>
                      </ul>
                      <div class="Relevant"  v-if="listArr.listType == 'productRelevant' || listArr.listType == 'caseRelevant' || listArr.listType == 'articleRelevant' || listArr.listType == 'videoRelevant' || listArr.listType == 'downloadRelevant' || listArr.listType == 'helpRelevant' || listArr.listType == 'productNew' || listArr.listType == 'caseNew'|| listArr.listType == 'articleNew'|| listArr.listType == 'videoNew'|| listArr.listType == 'helpNew'">
                          <div class="setOne">

                              <my-number v-model="listArr.RelevantLimit" title="显示条数" :controls="false"></my-number>
                          </div>
                      </div>
                  </div>
                  <div class="oneSetUp">
                      <h5 class="title">
                          分类设置
                          <div class="classTileZheZhao" v-if="isdisabled"></div>

                          <el-switch
                                  v-model="infor.classOpen"

                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                          </el-switch>
                      </h5>
                      <div class="Occlusion" v-if="!infor.classOpen">
                          点击左上角开启分类！
                      </div>
                      <div class="classTitle">
                          <my-select v-model="nowSelect" title="分类选项：" :option="listArr.classArr" @change="classChange" :my_style="{width:'120px'}"></my-select>
                          <div class="top_btn">
                              <el-button @click="classTitleEditF" type="primary">编辑分类</el-button>
                              <el-button @click="addClassF">添加分类</el-button>
                          </div>

                      </div>
                      <div class="classList">
                          <ul class="classListBox">
                              <li v-for="(val,i) in classListArr" :data-id="val.id">
                                  <img :src="val.src">
                                  <div class="listCenter">
                                      <p>
                                          <span>标题：</span>
                                          <b v-text="val.title"></b>
                                      </p>
                                      <p>
                                          <span>链接：</span>
                                          <i v-text="val.link"></i>
                                      </p>
                                      <p>
                                          <span>简介：</span>
                                          <strong v-text="val.content"></strong>
                                      </p>
                                  </div>
                                  <em v-text="val.time" style="display: none"></em>
                                  <h1 v-text="val.type_name" style="display: none"></h1>
                                  <h2 v-text="val.id" style="display: none"></h2>

                                  <div class="top_btn">
                                      <el-button @click="classlistEditBtn(i)" size="mini">编辑</el-button>
                                      <el-button @click="classDelBtn(i)" size="mini">删除</el-button>
                                  </div>

                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </el-dialog>
      </div>

      <edit-dialog
              title="无分类数据添加"
              v-if="editListAdd"
              :my-data="addList"
              @sure="editListAddOk"
              @cancel="editListAdd = false"></edit-dialog>

      <edit-dialog
              title="无分类数据编辑"
              v-if="editOne"
              :my-data="oneEdit"
              @sure="editOneOk"
              @cancel="editOne = false"></edit-dialog>

      <edit-dialog
              title="分类数据编辑"
              v-if="classEditOne"
              :my-data="oneEdit"
              @sure="classListEditOneOk"
              @cancel="classEditOne = false"></edit-dialog>

      <div >
          <el-dialog
                  title="分类标题编辑"
                  :visible.sync="classTitleEdit"
                  :modal-append-to-body="false">

              <div class="classTitleEdit">
                  <ul class="classTitleEditBox">
                      <li v-for="(val,i) in listArr.classArr">
                          <div style="float: left;">
                              <my-input title="分类名称：" v-model="val.value" @change="classNameChange(i)"></my-input>
                          </div>
                          <el-button @click.stop="classTitleDelF(i)" style="float: right">删除</el-button>
                      </li>
                  </ul>
              </div>
          </el-dialog>
      </div>

      <div v-if="addClass.show">
          <el-dialog
                  title="添加分类"
                  :visible="true"
                  :before-close="addClassClose"
                  :modal-append-to-body="false">
              <div class="addClass" style="overflow: hidden">
                  <div style="float: left;">
                      <my-input title="分类名称：" v-model="addClass.value" placeholder="请输入分类名称"></my-input>
                  </div>

                  <span style="margin-left: 10px;color: #999;float: left;line-height: 40px;">分类最多添加5个</span>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClassOk" type="primary" >确 定</el-button>
                <el-button @click="addClassClose">取消</el-button>
              </span>
          </el-dialog>
      </div>

      <my-edit-list
              :list-arr="listArr.listArr"
              @close="edit_dialog = false"
              @get_data="seleSure"
              :type="listArr.listType"
              v-if="edit_dialog"></my-edit-list>

      <!--容器设置-->
      <div class="pattern" id="pattern" v-if="$store.state.parts == 'box_set'">

          <el-alert title="为了更好的编辑该挂件，可视化部分不展示头尾相连，数据顺序可能与预览不一致，请以预览最终结果为准！" type="info"></el-alert>

          <div class="setOne">
              <my-select v-model="infor.pattern" :option="$store.state.options.box" title="模式选择"></my-select>
              <my-select v-model="infor.patternAutoplay" :option="$store.state.options.timeInterval" title="滚动间隔"></my-select>

              <my-number v-model="infor.patternSpace" title="模块间隔"></my-number>
              <my-number v-model="infor.patternSlidesPerView" title="显示个数" :min="1"></my-number>
              <my-number v-model="infor.patternSlidesRow" :max="30" :min="1" title="显示行数"></my-number>
          </div>

          <div class="setOne">
              <!-- @change="test"-->
              <my-select v-model="infor.loop" :option="$store.state.options.isOpen" title="头尾相连"></my-select>
              <my-number v-model="infor.patternWidth" title="容器宽度"></my-number>
              <my-number v-model="infor.patternHeight" title="容器高度"></my-number>
              <my-number v-model="infor.patternPadding" title="容器边距"></my-number>
              <my-select v-model="infor.patternBorderType" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>

          </div>

          <div class="setOne">
              <my-color v-model="infor.patternBordercolor" title="边框颜色"></my-color>
              <my-number v-model="infor.patternBorderSize" title="边框粗细"></my-number>
          </div>
      </div>

      <!--模块属性-->
      <div class="module_attribute btm_4cols" v-if="$store.state.parts == 'module_attribute'">

        <div class="setOne">
            <my-select v-model="infor.model.target" :option="$store.state.options.picarticle_target" title="链接打开" ></my-select>
            <my-select v-model="infor.model.borderStyle" :option="$store.state.options.borderStyle" title="模块边框" ></my-select>
            <my-color v-model="infor.model.background" title="背景色"></my-color>
            <my-number v-model="infor.model.height" title="模块高度"></my-number>

        </div>

          <div class="setOne">
              <my-color v-model="infor.model.borderTopColor" title="上边框颜色"></my-color>
              <my-color v-model="infor.model.borderBottomColor" title="下边框颜色"></my-color>
              <my-color v-model="infor.model.borderLeftColor" title="左边框颜色"></my-color>
              <my-color v-model="infor.model.borderRightColor" title="右边框颜色"></my-color>
          </div>

      </div>

      <!--图片模块-->
      <div class="module_img btm_4cols" v-if="$store.state.parts == 'module_img'">
          <div class="setOne">
              <my-number v-model="infor.pic.width" title="图片宽度"></my-number>
              <my-number v-model="infor.pic.height" title="图片高度"></my-number>
              <my-select v-model="infor.pic.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
          </div>
          <div class="setOne">
              <my-number v-model="infor.pic.marginTop" title="上外边距" :min="-1000"></my-number>
              <my-number v-model="infor.pic.marginBottom" title="下外边距" :min="-1000"></my-number>
              <my-number v-model="infor.pic.marginLeft" title="左外边距" :min="-1000"></my-number>
              <my-number v-model="infor.pic.marginRight" title="右外边距" :min="-1000"></my-number>
          </div>
      </div>

      <!--标题模块-->
      <div class="module_title" v-if="$store.state.parts == 'module_title'">

          <my-computed :btype="'diff_hover'">
              <div slot="margin_control" class="setOne">
                  <my-number v-model="infor.title.marginTop" title="上外边距" :min="-1000"></my-number>
                  <my-number v-model="infor.title.marginRight" title="右外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.title.marginBottom" title="下外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.title.marginLeft" title="左外间距" :min="-1000"></my-number>
              </div>

              <div slot="padding_control" class="setOne">
                  <!--<my-number v-model="infor.title.paddingTop" title="上内间距"></my-number>
                  <my-number v-model="infor.title.paddingRight" title="右内间距"></my-number>
                  <my-number v-model="infor.title.paddingBottom" title="下内间距"></my-number>-->
                  <my-number v-model="infor.title.paddingLeft" title="左内间距"></my-number>
              </div>

              <!-- 默认的边框设置 -->
              <div slot="diff_border" class="setOne_border">
                  <my-number v-model="infor.title.borderLeftWidth" title="左边框粗细"></my-number>
                  <my-number v-model="infor.title.borderRightWidth" title="右边框粗细"></my-number>
                  <my-number v-model="infor.title.borderTopWidth" title="上边框粗细"></my-number>
                  <my-number v-model="infor.title.borderBottomWidth" title="下边框粗细"></my-number>
              </div>
          </my-computed>

          <div class="setOne">
              <my-select v-model="infor.title.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-select v-model="infor.title.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
              <my-number v-model="infor.title.fontSize" title="文字大小" :min="12"></my-number>
          </div>

          <div class="setOne">
              <my-number v-model="infor.title.width" title="标题宽度"></my-number>
              <my-number v-model="infor.title.height" title="标题高度"></my-number>
              <my-select v-model="infor.title.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
          </div>

          <div class="setOne">
              <my-color v-model="infor.title.color" title="标题颜色"></my-color>
              <my-number v-model="infor.title.SfontSize" title="文字选中大小"></my-number>
              <my-color v-model="infor.title.Scolor" title="文字选中"></my-color>
          </div>

          <div class="setOne">
              <my-color v-model="infor.title.borderColor" title="边框颜色"></my-color>
              <my-select v-model="infor.title.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
              <my-number v-model="infor.title.borderRadius" title="圆角半径"></my-number>
          </div>
      </div>


      <!--内容模块-->
      <div class="module_content" v-if="$store.state.parts == 'module_content'">
          <div class="setOne">
              <my-select v-model="infor.content.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>

              <my-select v-model="infor.content.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
              <my-number v-model="infor.content.fontSize" title="内容文字"></my-number>
              <my-number v-model="infor.content.width" title="内容宽度"></my-number>
              <my-number v-model="infor.content.height" title="内容高度"></my-number>
          </div>

          <div class="setOne">
              <my-number v-model="infor.content.lineHeight" title="文字行高"></my-number>
              <my-number v-model="infor.content.marginTop" title="上外边距" :min="-1000"></my-number>
              <my-number v-model="infor.content.marginBottom" title="下外边距" :min="-1000"></my-number>
              <my-number v-model="infor.content.marginLeft" title="左外边距" :min="-1000"></my-number>
              <my-number v-model="infor.content.marginRight" title="右外边距" :min="-1000"></my-number>
          </div>
          <div class="setOne">
              <my-color v-model="infor.content.color" title="文字颜色"></my-color>
              <my-number v-model="infor.content.SfontSize" title="文字选中大小"></my-number>
              <my-color v-model="infor.content.Scolor" title="文字选中颜色"></my-color>
              <my-number v-model="infor.content.textLength" title="文字个数"></my-number>
          </div>
      </div>

      <!--时间模块-->
      <div class="module_time" v-if="$store.state.parts == 'module_time'">
          <div class="setOne">
              <my-select v-model="infor.time.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-select v-model="infor.time.timePattern" :option="$store.state.options.timePattern" title="模式选择" ></my-select>

              <my-number v-model="infor.time.year_line_height" title="年月行高" v-if="infor.time.timePattern =='UpAndDown'"></my-number>
              <!--<my-number v-model="infor.time.height" title="时间高度" v-else></my-number>-->
              <my-number v-model="infor.time.year_fontsize" title="年月大小"  v-if="infor.time.timePattern =='UpAndDown'"></my-number>
              <my-number v-model="infor.time.day_line_height" title="日行高" v-if="infor.time.timePattern =='UpAndDown'"></my-number>
          </div>

          <div class="setOne">
              <my-number v-model="infor.time.day_fontsize" title="日大小" v-if="infor.time.timePattern =='UpAndDown'"></my-number>
              <my-select v-model="infor.time.textAlign" :option="$store.state.options.textAlign" title="文字对齐" v-if="infor.time.timePattern =='ordinary'"></my-select>
              <my-number v-model="infor.time.marginTop" title="上外边距" :min="-1000"></my-number>
              <my-number v-model="infor.time.marginBottom" title="下外边距" :min="-1000"></my-number>
              <my-number v-model="infor.time.marginLeft" title="左外边距" :min="-1000"></my-number>
          </div>
          <div class="setOne">
              <my-number v-model="infor.time.marginRight" title="右外边距"></my-number>
              <my-number v-model="infor.time.fontSize" title="文字大小" v-if="infor.time.timePattern =='ordinary'" :min="12"></my-number>
              <my-color v-model="infor.time.color" title="文字颜色"></my-color>
              <my-number v-model="infor.time.width" title="时间宽度"></my-number>
              <my-number v-model="infor.time.height" title="时间高度"></my-number>
          </div>
          <div class="setOne">
              <my-number v-model="infor.time.SfontSize" title="文字选中大小" v-if="infor.time.timePattern =='ordinary'"></my-number>
              <my-color v-model="infor.time.Scolor" title="文字选中颜色"></my-color>
              <my-color v-model="infor.time.background" title="背景颜色"></my-color>
          </div>

      </div>

      <!--id属性-->
      <div class="module_id" v-if="$store.state.parts == 'module_id'">
          <my-computed :btype="'diff_hover'">
              <div slot="margin_control" class="setOne">
                  <my-number v-model="infor.sequence.marginTop" title="上外边距" :min="-1000"></my-number>
                  <my-number v-model="infor.sequence.marginRight" title="右外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.sequence.marginBottom" title="下外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.sequence.marginLeft" title="左外间距" :min="-1000"></my-number>
              </div>

              <!-- 默认的边框设置 -->
              <div slot="diff_border" class="setOne_border">
                  <my-number v-model="infor.sequence.borderLeftWidth" title="左边框粗细"></my-number>
                  <my-number v-model="infor.sequence.borderRightWidth" title="右边框粗细"></my-number>
                  <my-number v-model="infor.sequence.borderTopWidth" title="上边框粗细"></my-number>
                  <my-number v-model="infor.sequence.borderBottomWidth" title="下边框粗细"></my-number>
              </div>
          </my-computed>

          <div class="setOne">
              <my-select v-model="infor.sequence.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-color v-model="infor.sequence.color" title="序列颜色"></my-color>
              <my-select v-model="infor.sequence.textAlign" :option="$store.state.options.textAlign" title="文字对齐"></my-select>

          </div>
          <div class="setOne">
              <my-number v-model="infor.sequence.fontSize" title="文字大小" :min="12"></my-number>
              <my-select v-model="infor.sequence.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
              <my-number v-model="infor.sequence.width" title="宽度"></my-number>
          </div>
          <div class="setOne">
              <my-number v-model="infor.sequence.height" title="高度"></my-number>
              <my-color v-model="infor.sequence.borderColor" title="边框颜色"></my-color>
              <my-select v-model="infor.sequence.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          </div>
          <div class="setOne">
              <my-number v-model="infor.sequence.SfontSize" title="文字选中大小"></my-number>
              <my-color v-model="infor.sequence.Scolor" title="文字选中颜色"></my-color>
          </div>
      </div>

      <!--分类标题-->
      <div class="class_title" v-if="$store.state.parts == 'class_title'">
          <my-computed :btype="'diff_hover'">
              <div slot="margin_control" class="setOne">
                  <my-number v-model="infor.classTitle.marginTop" title="上外边距" :min="-1000"></my-number>
                  <my-number v-model="infor.classTitle.marginRight" title="右外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.classTitle.marginBottom" title="下外间距" :min="-1000"></my-number>
                  <my-number v-model="infor.classTitle.marginLeft" title="左外间距" :min="-1000"></my-number>
              </div>

              <div slot="padding_control" class="setOne">
                  <my-number v-model="infor.classTitle.paddingTop" title="上内间距"></my-number>
                  <my-number v-model="infor.classTitle.paddingRight" title="右内间距"></my-number>
                  <my-number v-model="infor.classTitle.paddingBottom" title="下内间距"></my-number>
                  <my-number v-model="infor.classTitle.paddingLeft" title="左内间距"></my-number>
              </div>

              <!-- 默认的边框设置 -->
              <div slot="diff_border" class="setOne_border">
                  <my-number v-model="infor.classTitle.borderLeftWidth" title="左边框粗细"></my-number>
                  <my-number v-model="infor.classTitle.borderRightWidth" title="右边框粗细"></my-number>
                  <my-number v-model="infor.classTitle.borderTopWidth" title="上边框粗细"></my-number>
                  <my-number v-model="infor.classTitle.borderBottomWidth" title="下边框粗细"></my-number>
              </div>
          </my-computed>

          <div class="setOne">
              <my-select v-model="infor.classTitle.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-select v-model="infor.classTitle.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
              <my-color v-model="infor.classTitle.color" title="文字颜色"></my-color>
          </div>
          <div class="setOne">
              <my-number v-model="infor.classTitle.width" title="宽度"></my-number>
              <my-number v-model="infor.classTitle.height" title="高度"></my-number>
              <my-select v-model="infor.classTitle.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
          </div>
          <div class="setOne">
              <my-number v-model="infor.classTitle.fontSize" title="文字大小" :min="12"></my-number>
              <my-color v-model="infor.classTitle.background" title="背景颜色"></my-color>
              <my-select v-model="infor.classTitle.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          </div>
          <div class="setOne">
              <my-color v-model="infor.classTitle.borderColor" title="边框颜色"></my-color>
              <my-number v-model="infor.classTitle.borderRadius" title="圆角半径"></my-number>
          </div>
      </div>

      <div class="module_header btm_4cols" v-if="$store.state.parts == 'module_header'">
          <div class="setOne">
              <my-select v-model="infor.header.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-input placeholder="请输入标题" v-model="infor.header.name" title="内容设置"></my-input>
              <my-number v-model="infor.header.height" title="高度设置"></my-number>
              <my-number v-model="infor.header.fontSize" title="文字大小" :min="12"></my-number>

          </div>
          <div class="setOne">
            <my-color v-model="infor.header.color" title="标题颜色"></my-color>
              <my-select v-model="infor.header.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
              <my-select v-model="infor.header.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
          </div>
          <div class="setOne"></div>
      </div>

      <div class="class_btn" v-if="$store.state.parts == 'class_btn'">

          <div class="setOne">
              <my-select v-model="infor.classStyle.selectPattern" :option="$store.state.options.selectPattern" title="选中模式" ></my-select>
              <my-number v-model="infor.classStyle.boxWidth" title="容器宽度"></my-number>
              <my-number v-model="infor.classStyle.boxHeight" title="容器高度"></my-number>
              <my-number v-model="infor.classStyle.boxMarginLeft" title="左外边距"></my-number>
              <my-number v-model="infor.classStyle.margin" title="左右间距"></my-number>
          </div>

          <div class="setOne">
              <my-number v-model="infor.classStyle.width" title="按钮宽度"></my-number>
              <my-number v-model="infor.classStyle.height" title="按钮高度"></my-number>
              <my-color v-model="infor.classStyle.background" title="默认颜色"></my-color>
              <my-color v-model="infor.classStyle.selectbackground" title="选中背景"></my-color>
              <my-number v-model="infor.classStyle.fontSize" title="文字大小" :min="12"></my-number>
          </div>
          <div class="setOne">
              <my-color v-model="infor.classStyle.color" title="文字颜色"></my-color>
              <my-color v-model="infor.classStyle.selectcolor" title="选中文字"></my-color>
              <my-color v-model="infor.classStyle.borderColor" title="边框颜色"></my-color>
              <my-color v-model="infor.classStyle.selectborderColor" title="边框选中"></my-color>

          </div>

      </div>

      <div class="banner_btn" v-if="$store.state.parts == 'banner_btn'">
          <div class="setOne">
              <my-select v-model="infor.btnStyle.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
              <my-number v-model="infor.btnStyle.width" title="按钮宽度"></my-number>
              <my-number v-model="infor.btnStyle.height" title="按钮高度"></my-number>
              <my-icon v-model="infor.btnStyle.leftIcon" title="左按钮选择"></my-icon>
              <my-icon v-model="infor.btnStyle.rightIcon" title="右按钮选择"></my-icon>
          </div>
          <div class="setOne">
              <my-color v-model="infor.btnStyle.color" title="图标颜色"></my-color>
              <my-color v-model="infor.btnStyle.background" title="图标背景"></my-color>
              <my-number v-model="infor.btnStyle.fontSize" title="图标大小"></my-number>
              <my-number v-model="infor.btnStyle.top" title="靠上距离"></my-number>
              <my-number v-model="infor.btnStyle.left" title="靠左/右距离"></my-number>
          </div>
      </div>

      <div class="mongolia_layer" v-if="$store.state.parts == 'mongolia_layer'">
          <el-tabs type="border-card">

              <el-tab-pane label="蒙层容器设置">
                  <div class="setOne">
                      <my-select title="蒙层状态" v-model="infor.Mongolia.isOpen" :option="$store.state.options.isOpen"></my-select>
                      <my-number v-model="infor.Mongolia.width" title="宽度"></my-number>
                      <my-number v-model="infor.Mongolia.height" title="高度"></my-number>
                      <my-number v-model="infor.Mongolia.marginTop" title="上外边距"></my-number>
                      <my-number v-model="infor.Mongolia.marginLeft" title="左外边距"></my-number>
                  </div>

                  <div class="setOne">
                      <my-select title="动画特效" v-model="infor.Mongolia.animation" :option="$store.state.options.ani"></my-select>
                      <my-number v-model="infor.Mongolia.opacity" title="透明度" :step="0.1" :min="0" :max="1"></my-number>
                      <!--<my-number v-model="infor.Mongolia.time" title="动画时间"></my-number>-->
                      <my-color v-model="infor.Mongolia.background" title="背景颜色"></my-color>
                      <my-select title="动画方向" v-model="infor.Mongolia.direction" :option="$store.state.options.direction" v-if="infor.Mongolia.animation == 'slide' || infor.Mongolia.animation == 'blind' || infor.Mongolia.animation == 'drop'"></my-select>
                  </div>
              </el-tab-pane>

              <el-tab-pane label="蒙层图标设置">
                  <div class="setOne">
                      <my-select v-model="infor.MongoliaIcon.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
                      <my-number v-model="infor.MongoliaIcon.fontSize" title="图标大小"></my-number>
                      <my-color v-model="infor.MongoliaIcon.color" title="图标颜色"></my-color>
                      <my-icon v-model="infor.MongoliaIcon.icon" ></my-icon>
                  </div>

              </el-tab-pane>

              <el-tab-pane label="蒙层标题设置">

                  <div class="setOne">
                      <my-select v-model="infor.MongoliaTitle.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
                      <my-number v-model="infor.MongoliaTitle.fontSize" title="文字大小" :min="12"></my-number>
                      <my-color v-model="infor.MongoliaTitle.color" title="文字颜色"></my-color>
                      <my-number v-model="infor.MongoliaTitle.width" title="宽度设置"></my-number>
                      <my-number v-model="infor.MongoliaTitle.height" title="高度设置"></my-number>

                  </div>
                  <div class="setOne">
                      <my-number v-model="infor.MongoliaTitle.lineHeight" title="行高设置"></my-number>
                  </div>

              </el-tab-pane>

              <el-tab-pane label="蒙层内容设置">
                  <div class="setOne">
                      <my-select v-model="infor.MongoliaContent.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
                      <my-number v-model="infor.MongoliaContent.fontSize" title="文字大小" :min="12"></my-number>
                      <my-color v-model="infor.MongoliaContent.color" title="文字颜色"></my-color>
                      <my-number v-model="infor.MongoliaContent.width" title="宽度设置"></my-number>
                      <my-number v-model="infor.MongoliaContent.height" title="高度设置"></my-number>
                  </div>
                  <div class="setOne">
                      <my-number v-model="infor.MongoliaContent.lineHeight" title="行高设置"></my-number>
                  </div>
              </el-tab-pane>

          </el-tabs>
      </div>








  </div>
</template>

<script type="text/ecmascript-6">

    import EditDialog from './make_dialog';


  export default {
    name: 'basic_picarticle_a',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        list_set:false,//栏目管理弹框
          contentSelectBtn:false,
          nowSelect: '', //当前选中的分类
          isdisabled:false,
          classListArr: [], //挂件内，分类列表展示的数组
          editListAdd: false, //列表添加
          editOne: false, //列表编辑
          classEditOne: false, //分类列表编辑
          classTitleEdit: false, //分类标题编辑
          addList: {
              src: 'static/image/pic.png',
              link:'',
              title: '',
              content: '',
              time:'',
              type_name:'',
          },
          oneEdit: {
              index: '',
              id:'',
              src: '',
              link:'',
              title: '',
              content: '',
              time:'',
              type_name:'',
          }, //编辑列表单个对象
          edit_dialog:false,
          addClass: {
              value: '',
              show: false
          },
          classTieleIndex:0,
          addClassTitle:'',
          sortableIndex:0,
        btn_disabled:['productRelevant','caseRelevant','articleRelevant','videoRelevant','downloadRelevant','helpRelevant','productNew','caseNew','articleNew','videoNew','helpNew'],
          classTrue:true
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑图文展示组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
            this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑图文展示组件');
        },
        deep: true
      },
      classTitleEdit(val){
          const that = this;
          if(!val){
              return;
          }

          this.$nextTick(function () {
              if($('.classTitleEditBox').hasClass('ui-sortable')){
                  return;
              }

              $('.classTitleEditBox').sortable({
                  placeholder: "listSort",
                  stop: function(event, ui) {
                      var index = $(ui.item).index();
                      //数组排序
                      var obj = that.listArr.classArr[that.classTieleIndex];
                      that.listArr.classArr.splice(that.classTieleIndex, 1);
                      that.listArr.classArr.splice(index, 0, obj)
                  },
                  activate: function(event, ui) {
                      var index = $(ui.item).index();
                      that.classTieleIndex = index;
                  },
              });
          })
      },
      list_set(val){
      if(val){
          this.list_set_init()
      }
  }
    },
    created(){

    },
    components:{
        EditDialog
    },
    methods:{
        addClassClose(){
            this.addClass.show = false
        },
/*        test(val){
            console.log(this.infor.loop);
            debugger;
        },*/
        seleSure(arr){
            this.listArr.listArr = arr;
            this.edit_dialog = false;
        },
        //打开数据选择器
        openListSele(){
            this.edit_dialog = true;

        },
        handleClose(){
            this.list_set = false;
        },
        column_dialog(){
            this.list_set = true;

        },
        //图标搜索
        SearchStart:function(){
            var val = this.SearchContent;
            if(val){
                var list = [];
                for(var i = 0;i<this.iconSearchSave.length;i++){
                    for(var j = 0;j<this.iconSearchSave[i].value.length;j++){
                        if(this.iconSearchSave[i].value[j].indexOf(val) > -1){
                            list.push(this.iconSearchSave[i]);
                            break;
                        }
                    }
                }
                this.iconListView = list;
            }
            else{
                this.iconListView = this.iconSearchSave;
            }

        },
        //图标组件选择
        iconComponentSelect:function (val) {
            this.infor.MongoliaIcon.icon = val.name;
        },
        contentSure:function(){
            this.seachContent='';
            this.contentList = false;

        },
        classNameChange:function(e){
            var str = this.listArr.classArr[e].value.replace(/\"/g,'“').replace(/\'/g,'‘');
            this.listArr.classArr[e].value = str;
            this.listArr.classArr[e].label = str;
        },
        _iconDialog:function (type) {
            this.bannerStyleIconDialog = true;
            this.iconBtn = type;
        },
        bannerStyleIconSel:function (i,val) {
            this.bannerStyleIconIndex = i;
            if(this.iconBtn == 'left'){
                this.infor.btnStyle.leftIcon = val;
            }
            else{
                this.infor.btnStyle.rightIcon = val;
            }
            this.bannerStyleIconDialog = false;
        },
        typeChage:function () {
            if(this.listArr.listType == 'productRelevant' || this.listArr.listType == 'caseRelevant' || this.listArr.listType == 'articleRelevant' || this.listArr.listType == 'videoRelevant' || this.listArr.listType == 'downloadRelevant' || this.listArr.listType == 'helpRelevant' || this.listArr.listType == 'productNew' || this.listArr.listType == 'caseNew'|| this.listArr.listType == 'articleNew'|| this.listArr.listType == 'videoNew'|| this.listArr.listType == 'helpNew'){
                this.infor.classOpen = false;
                this.contentSelectBtn = true;
                this.isdisabled = true;
            }
            else{
                //this.infor.classOpen = true;
                this.contentSelectBtn = false;
                this.isdisabled = false;
            }
        },
        //图片选择
        selePic: function() {
            var that = this;
            this.$store.state.showPicCon = true;
            this.$store.state.imgUrls = function (val) {
                that.addList.src = val.src;
            };

        },

        editSelePic: function() {
            var that = this;
            this.$store.state.showPicCon = true;
            this.$store.state.imgUrls = function (val) {
                that.oneEdit.src = val.src;
            };

        },

        //打开添加列表
        openAddList: function() {
            this.addList.src = 'static/image/pic.png';
            this.addList.link = '';
            this.addList.title = '';
            this.addList.content = '';
            this.addList.time = '';
            this.addList.type_name = '';
            this.editListAdd = true;
        },

        //添加列表
        editListAddOk: function() {
            var linkStr = this.addList.link.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'');
            var titleStr = this.addList.title.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'');
            var contentStr = this.addList.content.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'');
            var timeStr = this.addList.time.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'');
            var typeNameStr = this.addList.type_name.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'');


            var obj = {
                src: this.addList.src,
                link:linkStr,
                title: titleStr,
                content:contentStr,
                time:timeStr,
                type_name:typeNameStr
            };
            this.listArr.listArr.unshift(obj);
            this.editListAdd = false;
        },

        //列表编辑
        listEditBtn: function(i) {
            this.editOne = true;
            this.oneEdit.index = i;
            this.oneEdit.id = this.listArr.listArr[i].id;
            this.oneEdit.src = this.listArr.listArr[i].src;
            this.oneEdit.link = this.listArr.listArr[i].link;
            this.oneEdit.title = this.listArr.listArr[i].title;
            this.oneEdit.content = this.listArr.listArr[i].content;
            this.oneEdit.time = this.listArr.listArr[i].time;
            this.oneEdit.type_name = this.listArr.listArr[i].type_name;
        },

        //确定编辑
        editOneOk: function() {
            var linkStr = this.oneEdit.link ? this.oneEdit.link.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var titleStr = this.oneEdit.title ? this.oneEdit.title.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var contentStr = this.oneEdit.content ? this.oneEdit.content.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var timeStr = this.oneEdit.time ? this.oneEdit.time.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var typeNameStr = this.oneEdit.type_name ? this.oneEdit.type_name.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,'') : '';


            this.listArr.listArr[this.oneEdit.index].id = this.oneEdit.id;
            this.listArr.listArr[this.oneEdit.index].src = this.oneEdit.src;
            this.listArr.listArr[this.oneEdit.index].link = linkStr;
            this.listArr.listArr[this.oneEdit.index].title = titleStr;
            this.listArr.listArr[this.oneEdit.index].content = contentStr;
            this.listArr.listArr[this.oneEdit.index].time = timeStr;
            this.listArr.listArr[this.oneEdit.index].type_name = typeNameStr;
            this.editOne = false;
        },

        //列表删除
        listDelBtn: function(i) {
            this.listArr.listArr.splice(i, 1);
        },

        //分类开关
        classSwitch: function() {
            this.infor.classOpen = !this.infor.classOpen;
        },

        //添加分类打开
        addClassF: function() {
            //debugger;
            if (this.listArr.classArr.length >= 10) {
                this.$Message.info('最多只能添加10条分类！');
            } else {
                this.addClass.value = '';
                this.addClass.show = true;
            }
        },

        //添加分类OK
        addClassOk: function() {
            if(!this.addClass.value){
                this.$message.error('分类名称不能为空！');
            }
            var valueStr = this.addClass.value.replace(/\"/g,'“').replace(/\'/g,'‘');

            let isEnd = false;
            for(let i = 0 ;i<this.listArr.classArr.length;i++){
                if(this.listArr.classArr[i].label === valueStr){
                    isEnd = true;
                    break;
                }
            }
            if(isEnd){
                this.$message.error('不能重复添加分类！');
                return;
            }

            var obj = {
                value: valueStr,
                label: valueStr,
                listArr: []
            };
            this.listArr.classArr.push(obj);
            this.addClass.value = '';
            this.addClass.show = false;
        },

        //分类列表编辑
        classlistEditBtn: function(i) {
            this.classEditOne = true;
            this.oneEdit.index = i;
            this.oneEdit.src = this.classListArr[i].src;
            this.oneEdit.link = this.classListArr[i].link;
            this.oneEdit.title = this.classListArr[i].title;
            this.oneEdit.content = this.classListArr[i].content;
            this.oneEdit.time = this.classListArr[i].time;
            this.oneEdit.type_name = this.classListArr[i].type_name;

        },

        //分类列表确定编辑
        classListEditOneOk: function() {
            var linkStr = this.oneEdit.link ? this.oneEdit.link.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var titleStr = this.oneEdit.title ? this.oneEdit.title.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var contentStr = this.oneEdit.content ? this.oneEdit.content.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var timeStr = this.oneEdit.time ? this.oneEdit.time.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';
            var typeNameStr = this.oneEdit.type_name ? this.oneEdit.type_name.replace(/\"/g,'“').replace(/\'/g,'‘').replace(/\n/g,''):'';

            this.classListArr[this.oneEdit.index].src = this.oneEdit.src;
            this.classListArr[this.oneEdit.index].link = linkStr;
            this.classListArr[this.oneEdit.index].title = titleStr;
            this.classListArr[this.oneEdit.index].content = contentStr;
            this.classListArr[this.oneEdit.index].time = timeStr;
            this.classListArr[this.oneEdit.index].type_name = typeNameStr;
            this.classEditOne = false;
        },

        //分类列表图片选择
        classListSelePic: function() {
            var that = this;
            templet.file_manage(function(d) {
                that.oneEdit.src = d.path
            }, {
                app_id: 'site',
                radio: true
            })
        },

        //分类列表删除
        classDelBtn: function(i) {
            this.classListArr.splice(i, 1);
        },

        //分类切换
        classChange: function(val) {
            //debugger;
            for (var i = 0; i < this.listArr.classArr.length; i++) {
                if (this.listArr.classArr[i].value == val) {
                    this.classListArr = this.listArr.classArr[i].listArr; //分类列表视图与数据源建立引用关系
                    break;
                }
            }
        },

        //分类标题编辑
        classTitleEditF: function() {
            this.classTitleEdit = true;
            this.classListArr = [];
            this.nowSelect = '';
        },

        //分类标题删除
        classTitleDelF: function(i) {
            //debugger;
            this.listArr.classArr.splice(i, 1);
            /*var list = JSON.parse(JSON.stringify(this.listArr.classArr));
            this.listArr.classArr = [];
            this.$nextTick(()=>{
                this.listArr.classArr = list;
            })*/

        },

        iconSel:function (i,val) {
            this.iconIndex = i;
            this.infor.MongoliaIcon.icon = val;
        },

        list_set_init(){
            const that = this;
            this.$nextTick(function () {
                //左边列表-列表排序
                $('.listbox').sortable({
                    placeholder: "listSort",
                    stop: function(event, ui) {
                        var num = $(this).children('li').length;
                        var child = $(this).children('li');
                        that.listArr.listArr = [];
                        that.$nextTick(function () {
                            for (var i = 0; i < num; i++) {
                                var one = {
                                    id:child.eq(i).find('h6').text(),
                                    src: child.eq(i).find('img').attr('src'),
                                    link: child.eq(i).find('i').text(),
                                    title: child.eq(i).find('b').text(),
                                    content: child.eq(i).find('strong').text(),
                                    time: child.eq(i).find('em').text(),
                                    type_name: child.eq(i).find('h1').text(),
                                };
                                that.listArr.listArr.push(one);
                            }
                        });

                    },
                    activate: function(event, ui) {
                        var index = $(ui.item).index();
                        that.sortableIndex = index;
                    },
                });

                //右边列表-列表排序
                $('.classListBox').sortable({
                    placeholder: "listSort",
                    stop: function(event, ui) {
                        var num = $(this).children('li').length;
                        var child = $(this).children('li');
                        var list = [];
                        var index = 0;
                        for (var a = 0; a < that.listArr.classArr.length; a++) {
                            if (that.listArr.classArr[a].value == that.nowSelect) {
                                //that.listArr.classArr[a].listArr = [];
                                index = a;
                                for (var i = 0; i < num; i++) {
                                    var one = {
                                        id:$(this).children('li').eq(i).find('h2').text(),
                                        src: $(this).children('li').eq(i).find('img').attr('src'),
                                        link: $(this).children('li').eq(i).find('i').text(),
                                        title: $(this).children('li').eq(i).find('b').text(),
                                        content: $(this).children('li').eq(i).find('strong').text(),
                                        time: $(this).children('li').eq(i).find('em').text(),
                                        type_name: $(this).children('li').eq(i).find('h1').text(),
                                    };
                                    //that.listArr.classArr[a].listArr.push(one);
                                    list.push(one);
                                }
                                break;
                            }
                        }
                        that.classListArr = [];
                        that.$nextTick(function () {
                            that.listArr.classArr[index].listArr = list;
                            that.classListArr = that.listArr.classArr[index].listArr;
                        });
                    },
                });

                //右边列表可放置
                $('.classListBox').droppable({
                    accept: '.allListOne',
                    hoverClass: "xuanfu",
                    drop: function() {
                        var obj = {
                            id:that.listArr.listArr[that.sortableIndex].id,
                            src: that.listArr.listArr[that.sortableIndex].src,
                            link: that.listArr.listArr[that.sortableIndex].link,
                            title: that.listArr.listArr[that.sortableIndex].title,
                            content: that.listArr.listArr[that.sortableIndex].content,
                            time:that.listArr.listArr[that.sortableIndex].time,
                            type_name:that.listArr.listArr[that.sortableIndex].type_name,
                        };

                        //数据时往infor大对象中插，然后引用给classArr
                        var isPush = true;
                        for (var i = 0; i < that.listArr.classArr.length; i++) {
                            if (that.listArr.classArr[i].value == that.nowSelect) {
                                for( var j = 0 ; j<that.listArr.classArr[i].listArr.length; j++){
                                    if( obj.id == that.listArr.classArr[i].listArr[j].id){
                                        that.$message.error('不能加入重复数据!');
                                        isPush = false;
                                        break;
                                    }
                                }
                                if(isPush){
                                    that.listArr.classArr[i].listArr.push(obj);
                                    that.classListArr = that.listArr.classArr[i].listArr; //分类列表视图与数据源建立引用关系
                                    break;
                                }
                                else{
                                    break;
                                }

                            }
                        }
                        console.log(that.listArr.classArr);

                    }
                })



            });
        }
    },

    mounted(){
        console.log(this.infor);


    }
  }
</script>
