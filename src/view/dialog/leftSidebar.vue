<template>
  <div class="left_sidebar">

    <div class="left_sidebar_btn" @click="dialogShow" v-show="!isShow">
      <div class="frame">
        <i class="el-icon-menu"></i>
        <span>组件</span>
      </div>
    </div>

    <div class="left_sidebar_dialog " v-show="isShow">
      <div class="frame">
        <i class="el-icon-circle-close-outline close" @click="close"></i>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="" name="icon" disabled>
            <span slot="label">
              <i class="el-icon-menu"></i>
            </span>
          </el-tab-pane>

          <el-tab-pane label="组件" name="module" class="star-wrap">
            <div class="my-add-page">
              <!-- <el-button type="success" size="small" @click.stop='addPage' >添加页面</el-button> -->
              <el-input v-model="filterPendant" placeholder="请输入挂件名称或拼音进行筛选" :style="{
                width:`240px`,
                height:`30px`
              }"></el-input>
            </div>

            <!-- <ul class="PendantList" id="PendantList">
              <li v-for="(val,i) in PendantList" :data-name="val.name" :key="i" class="Pendant_one">
                <img :src="val.icon">
                <span>{{val.title}}</span>
              </li>
            </ul> -->

            <el-collapse class="star-collapse" v-show="true" v-model="collapseItem" :accordion="collapseAccordion">
              <el-collapse-item title="常用" name="1" v-if="comment2.length>0">
                <ul class="PendantList clearfix ">
                  <li v-for="(val,i) in comment2" :data-name="val.name" :key="i" class="Pendant_one">
                    <div>
                      <b @click.stop="gotoHelp(val.name)" :data-name="val.name">
                        <i class="fa-question-circle"></i>
                      </b>
                      <img :src="val.icon">
                      <span>{{val.title}}</span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="基础" name="2" v-show="base2.length>0">
                <ul class="PendantList clearfix ">
                  <li v-for="(val,i) in base2" :data-name="val.name" :key="i" class="Pendant_one">
                    <div>
                      <b @click.stop="gotoHelp(val.name)" :data-name="val.name">
                        <i class="fa-question-circle"></i>
                      </b>
                      <img :src="val.icon">
                      <span>{{val.title}}</span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="排版" name="3" v-show="layout2.length>0">
                <ul class="PendantList clearfix ">
                  <li v-for="(val,i) in layout2" :data-name="val.name" :key="i" class="Pendant_one">
                    <div>
                      <b @click.stop="gotoHelp(val.name)" :data-name="val.name">
                        <i class="fa-question-circle"></i>
                      </b>
                      <img :src="val.icon">
                      <span>{{val.title}}</span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="高级" name="4" v-show="highGrade2.length>0">
                <ul class="PendantList clearfix ">
                  <li v-for="(val,i) in highGrade2" :data-name="val.name" :key="i" class="Pendant_one">
                    <div>
                      <b @click.stop="gotoHelp(val.name)" :data-name="val.name">
                        <i class="fa-question-circle"></i>
                      </b>
                      <img :src="val.icon">
                      <span>{{val.title}}</span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
              <el-collapse-item title="互动" name="5" v-show="exchange2.length>0">
                <ul class="PendantList clearfix ">
                  <li v-for="(val,i) in exchange2" :data-name="val.name" :key="i" class="Pendant_one">
                    <div>
                      <b @click.stop="gotoHelp(val.name)" :data-name="val.name">
                        <i class="fa-question-circle"></i>
                      </b>
                      <img :src="val.icon">
                      <span>{{val.title}}</span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>

          </el-tab-pane>

          <el-tab-pane label="页面" name="web" style="height: 100%;position: relative;padding-top: 46px;overflow: hidden;">
            <div class="my-add-page">
              <el-button type="success" size="small" @click.stop='addPage'>添加页面</el-button>
              <el-input v-model="zh2py" placeholder="请输入页面名称、拼音" :style="{
                  width:`200px`,
                  height:`30px`
                }"></el-input>
            </div>
            <div class="pages" id="pages_manege" @mouseout="leaveP">
              <div v-for="(item,index) in pages" :key="index">
                <p v-if="item.title != ''" :class="{
                    currPage:currIndex === index || hoverId === index
                  }" @mouseover="hoverP(index)" @click.stop="changePage(item.name,index,item.title)" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.1)" style="width: 100%" v-loading.fullscreen.lock="$store.state.changePage">
                  <i class="el-icon-menu"></i>
                  <span :title="item.title">{{item.title}}</span>
                  <!-- <i @click.stop="collectPage()" v-if="currIndex === index" class="el-icon-star-off" title="收藏"></i> -->
                  <i @click.stop="alterName(item.name,item.title)" v-if="currIndex === index || hoverId === index" class="el-icon-edit" title="修改名称"></i>
                  <i @click.stop="copyPage(item.name,item.title)" v-if="currIndex === index || hoverId === index" class="fa-copy" style="font-family: FontAwesome !important" title="复制"></i>
                  <i @click.stop="delPage(item.id)" v-if="item.is_system == 'false' && (currIndex === index || hoverId === index)" title="删除" class="el-icon-delete"></i>
                </p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>

    <!-- 增加页面 -->
    <el-dialog title="增加页面" :visible.sync="addDodel" :append-to-body="true" width="500px">
      <el-alert title="名称 (4-12位字母数字下滑线组成)" type="warning">
      </el-alert>
      <div class="model-div">
        <strong>名称</strong>
        <el-input :style="{
          maxWidth:'300px',
          minWidth:'200px'
        }" v-model="name" placeholder="请输入名称" @keyup.enter.native="addDodelAjax"></el-input>
      </div>
      <div class="model-div">
        <strong>标题</strong>
        <el-input :style="{
          maxWidth:'300px'
        }" v-model="title" placeholder="请输入标题" @keyup.enter.native="addDodelAjax"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDodel = false">取 消</el-button>
        <el-button type="primary" @click="addDodelAjax">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改名称 -->
    <el-dialog title="修改标题" :visible.sync="renameOpen" :append-to-body="true" width="500px">
      <div class="model-div">
        <strong>标题</strong>
        <el-input :style="{
          maxWidth:'300px'
        }" v-model="title" placeholder="请输入标题" @keyup.enter.native="alterDodelAjax"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameOpen = false">取 消</el-button>
        <el-button type="primary" @click="alterDodelAjax">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 收藏页面 -->
    <el-dialog title="收藏页面" :visible.sync="collectOpen" :append-to-body="true" width="500px">
      <div class="model-div">
        <strong>模板标题</strong>
        <el-input :style="{
          maxWidth:'300px'
        }" v-model="title" placeholder="请输入模板标题"></el-input>
      </div>
      <div class="collect-img">
        <el-button type="primary" size="small" @click='selectPic("collectImg",collectImg)'>选择图片</el-button>
        <img :src="collectImg" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="collectOpen = false">取 消</el-button>
        <el-button type="primary" @click="collectDodelAjax">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import myajax from '@/js/ajax'

export default {
  name: 'left_sidebar',
  data() {
    return {
      activeName: 'module',
      isShow: false,
      pages: [],
      currIndex: 0,
      fullscreenLoading: this.$store.state.changePage,
      addDodel: false,
      title: '',
      name: '',
      renameOpen: false,
      collectOpen: false,
      collectImg: '',
      alterNameTem: '',
      activeNames: ['1'],
      hoverId: null,
      zh2py: '',
      temPages: [], //用于页面搜索使用
      filterPendant: '',
      pageTitle: '',
      PendantList: this.$store.state.PendantList,
      comment: [], //常用挂件
      base: [], //基础挂件
      layout: [], //布局挂件
      highGrade: [], //高级挂件
      exchange: [], //其他挂件
      comment2: [], //常用挂件
      base2: [], //基础挂件
      layout2: [], //布局挂件
      highGrade2: [], //高级挂件
      exchange2: [], //其他挂件
      collapseItem: '1', //折叠展开项
      collapseAccordion: true, //是否是手风琴模式
      media: '', //手风琴打开项中转
      oldAlterName: ''
    }
  },
  watch: {
    zh2py(val) {
      this.zh2py = val
      this.souSuo()
    },
    filterPendant(val) {
      this.filterPendant = val
      this.fp()
    }
  },
  methods: {
    gotoHelp(name) {
      // window.location.open = 'http://t.71360.com/webhelp/#basic_magnifyingglass'
      // window.open( `http://t.71360.com/webhelp/#${name}`,'_blank','width=1000,height=600,top=100,left=50')
      window.open( `http://t.71360.com/webhelp/#${name}`)
    },
    starDrag() {
      let that = this
      this.$nextTick(() => {
        $('.PendantList')
          .children('li')
          .draggable({
            helper: 'clone',
            opacity: 0.6,
            drag: function(event, ui) {
              //console.log($(this).parent().find("li:last-of-type")[0].style.top);

              let top = $(this)
                .parent()
                .find('li:last-of-type')[0].style.top
              let left = $(this)
                .parent()
                .find('li:last-of-type')[0].style.left
              $('.star-agent').css('top', top)
              $('.star-agent').css('left', left)

              //console.log(ui.position);
            },
            start: function(event, ui) {
              that.$store.state.add_module_prompt = true
              that.close()
              let div = document.createElement('div')
              let img = document.createElement('img')
              let span = document.createElement('span')
              div.className = 'star-agent'

              let lastImg = $(this)
                .parent()
                .find('li:last-of-type img')[0]
              let lastSpan = $(this)
                .parent()
                .find('li:last-of-type span')
                .text()
              img.src = lastImg.src
              span.textContent = lastSpan
              div.appendChild(img)
              div.appendChild(span)
              document.body.appendChild(div)

              //that.isShow = false;
              //let name = $(this).attr('data-name');
              //$('.left_sidebar_dialog').css('display','none');
              //ui.helper.css('display','block');
            },
            stop: function(event, ui) {
              $('.star-agent').remove()
              //$('.left_sidebar_dialog').css('opacity',1);
              that.$store.state.add_module_prompt = false
            }
          })
      })
    },
    sort() {
      //挂件分类
      let comment = '图片、快速文本、链接、自定义内容',
        base = '当前标题、当前位置、日期、返回、页码、多语言',
        layout = '列表与分页、图文展示、导航、分类、轮播图、荣誉资质、荣誉列表',
        highGrade = '文章详情、放大镜、招聘、招聘详情、帮助、站点地图、视频、高级代码',
        exchange = '地图、留言、搜索'
      for (let i = 0; i < this.PendantList.length; i++) {
        if (comment.indexOf(this.PendantList[i].title) > -1) {
          this.comment.push(this.PendantList[i])
          this.comment2.push(this.PendantList[i])
        } else if (base.indexOf(this.PendantList[i].title) > -1) {
          this.base.push(this.PendantList[i])
          this.base2.push(this.PendantList[i])
        } else if (layout.indexOf(this.PendantList[i].title) > -1) {
          this.layout.push(this.PendantList[i])
          this.layout2.push(this.PendantList[i])
        } else if (
          highGrade.indexOf(this.PendantList[i].title) > -1 &&
          this.PendantList[i].title != '地图'
        ) {
          this.highGrade.push(this.PendantList[i])
          this.highGrade2.push(this.PendantList[i])
        } else {
          this.exchange.push(this.PendantList[i])
          this.exchange2.push(this.PendantList[i])
        }
      }
    },
    fp() {
      // 挂件筛选
      // let temStr = this.templet.hz2py(this.filterPendant).toLocaleLowerCase();
      // let temArr = this.$store.state.PendantList;

      // this.PendantList = temArr.filter(item => {
      //   if (
      //     this.templet
      //       .hz2py(item.title)
      //       .toLocaleLowerCase()
      //       .includes(temStr)
      //   ) {
      //     return true;
      //   }
      // });
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g') //判断知否为汉字
      let temStr = this.templet.hz2py(this.filterPendant).toLocaleLowerCase()
      let isChinaLanague = reg.test(this.filterPendant)

      this.comment2 = this.comment.filter(item => {
        if (isChinaLanague) {
          if (item.title.includes(this.filterPendant)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })

      this.base2 = this.base.filter(item => {
        if (isChinaLanague) {
          if (item.title.includes(this.filterPendant)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })

      this.layout2 = this.layout.filter(item => {
        if (isChinaLanague) {
          if (item.title.includes(this.filterPendant)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })

      this.highGrade2 = this.highGrade.filter(item => {
        if (isChinaLanague) {
          if (item.title.includes(this.filterPendant)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })

      this.exchange2 = this.exchange.filter(item => {
        if (isChinaLanague) {
          if (item.title.includes(this.filterPendant)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })

      if (typeof this.collapseItem == 'string') {
        this.media = this.collapseItem
      }
      if (this.filterPendant != '') {
        this.collapseItem = []
        this.collapseAccordion = false
        if (this.comment2.length > 0) {
          this.collapseItem.push('1')
        }
        if (this.base2.length > 0) {
          this.collapseItem.push('2')
        }
        if (this.layout2.length > 0) {
          this.collapseItem.push('3')
        }
        if (this.highGrade2.length > 0) {
          this.collapseItem.push('4')
        }
        if (this.exchange2.length > 0) {
          this.collapseItem.push('5')
        }
      } else {
        this.collapseAccordion = true
        this.collapseItem = this.media
      }
      this.starDrag()
    },
    souSuo() {
      // 页面筛选
      /**@augments
       * 将页面的 name title属性中 包含输入内容的显示
       */

      let temStr = this.templet.hz2py(this.zh2py).toLocaleLowerCase()

      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g') //判断知否为汉字
      let isChinaLanague = reg.test(this.zh2py)

      this.pages = this.temPages.filter(item => {
        // 根据页面name值 进行筛选
        if (item.name.toString().includes(temStr)) {
          return true
        }

        // 根据名称进行筛选
        if (isChinaLanague) {
          if (item.title.includes(this.zh2py)) {
            return true
          }
        } else {
          if (
            this.templet
              .hz2py(item.title)
              .toLocaleLowerCase()
              .includes(temStr)
          ) {
            return true
          }
        }
      })
    },
    alterName(pageName, pageTitle) {
      // 修改名称
      this.title = pageTitle
      this.oldAlterName = pageTitle
      this.name = ''
      this.renameOpen = true
      this.alterNameTem = pageName
      this.pageTitle = pageTitle
    },
    alterDodelAjax() {
      let _this = this

      if (this.oldAlterName === this.title) {
        _this.$notify({
          title: '提示',
          message: `"${_this.title}"修改名称成功`,
          type: 'success',
          duration: 3000
        })
        _this.renameOpen = false
        return
      }

      if (!this.title) {
        _this.$notify({
          title: '提示',
          message: '标题名称不能为空',
          type: 'warning',
          duration: 3000
        })
        return
      }
      // 修改名称ajax
      $.ajax({
        // url: `${_this.$store.state.domain}/index_pc.php/newapi/page/rename`,
        url: `/index_pc.php/newapi/page/rename`,
        type: 'post',
        data: {
          name: _this.alterNameTem,
          newtitle: _this.title
        },
        dataType: 'json',
        success(e) {
          _this.$notify({
            title: '提示',
            message: `"${_this.title}"修改名称成功`,
            type: 'success',
            duration: 3000
          })
          _this.renameOpen = false
          _this.initPage()
        },
        error(err) {
          _this.$notify({
            title: '提示',
            message: '修改名称失败:' + err.responseJSON.error,
            type: 'warning',
            duration: 3000
          })
        }
      })
    },
    collectPage() {
      this.title = ''
      this.collectImg = ''
      this.collectOpen = true
      // 收藏页面
    },
    collectDodelAjax() {
      // 收藏ajax
    },
    copyPage(name, title) {
      let _this = this
      // 页面复制
      $.ajax({
        // url: `${_this.$store.state.domain}/index_pc.php/newapi/page/copy`,
        url: `/index_pc.php/newapi/page/copy`,
        type: 'post',
        data: {
          name: name,
          type: 'copy'
        },
        dataType: 'json',
        success(e) {
          _this.$notify({
            title: '提示',
            message: `"${title}"页面复制成功`,
            type: 'success',
            duration: 3000
          })
          _this.initPage(true)
        },
        error(err) {
          _this.$notify({
            title: '提示',
            message: '页面复制失败:' + err.responseJSON.error,
            type: 'warning',
            duration: 3000
          })
        }
      })
    },
    delPage(pageId) {
      this.$confirm(`确定删除这个页面吗?亲`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let _this = this

          this.$store.state.changePage = true
          // 删除页面
          $.ajax({
            url: `${
              _this.$store.state.domain
            }/index_pc.php/newapi/page/remove?id=${pageId}`,
            type: 'delete',
            dataType: 'json',
            success(e) {
              _this.$notify({
                title: '提示',
                message: '删除页面成功',
                type: 'success',
                duration: 3000
              })
              _this.initPage()
              _this.currIndex = 0
              _this.$store.state.now_page = 'index'
              _this.$store.state.view_module = _this.pages[0].module

              // 删除之后 重置
              _this.$store.state.localTitle = '首页'
              document.title = '首页'
              sessionStorage.setItem('pageName', 'index')
              sessionStorage.setItem('pageIndex', 0)
              sessionStorage.setItem('pageTitle', '首页')
              sessionStorage.setItem('viewModule', 'index:index')

              _this.templet.p_init() //这个是正式接口的

              /**@augments
               * 滚动至顶部
               */
              _this.$nextTick(() => {
                $(`#pages_manege`).animate(
                  {
                    scrollTop: 0
                  },
                  'slow',
                  'swing'
                )
              })
            },
            error(err) {
              _this.$notify({
                title: '提示',
                message: '删除页面失败',
                type: 'warning',
                duration: 3000
              })

              this.$store.state.changePage = false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除页面'
          })
        })
    },
    dialogShow() {
      this.isShow = true
    },
    close() {
      this.isShow = false
    },
    initPage(isScroll = false) {
      // 页面初始化
      let _this = this
      $.ajax({
        // url: _this.$store.state.domain + "/index_pc.php/newapi/page/getlist",
        url: '/index_pc.php/newapi/page/getlist',
        type: 'get',
        dataType: 'json',
        success(e) {
          _this.pages = e.data
          _this.temPages = e.data

          if (isScroll) {
            /**@augments
             * 滚动至底部
             */
            _this.$nextTick(() => {
              let height = $(`#pages_manege`).height() * 4
              $(`#pages_manege`).animate(
                {
                  scrollTop: height
                },
                'slow',
                'swing'
              )
            })
          }

          // 历史记录
          _this.$store.commit('historyChange', false)
        }
      })
    },
    async changePage(name, index, title) {
      if (this.$store.state.now_page == name) {
        return
      }

      const { historyIsChange, changePage } = this.$store.state

      // 历史记录变化，需要先保存再切换页面
      if (historyIsChange && !changePage) {
        await this.$confirm('页面改变了？是否保存您的更改再切换页面', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            this.$store.state.changePage = true
            await this.templet.p_save(this.$message)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存页面更改!'
            })
            this.$store.commit('historyChange', false)
          })
      }
      this.$store.state.changePage = true

      this.currIndex = index
      this.$store.state.now_page = name

      this.$store.state.view_module = this.pages[index].module

      this.$store.state.localTitle = title

      document.title = title
      sessionStorage.setItem('pageName', name)
      sessionStorage.setItem('pageIndex', index)
      sessionStorage.setItem('pageTitle', title)
      sessionStorage.setItem('viewModule', this.pages[index].module)

      this.$store.state.header = []
      this.$store.state.body = []
      this.$store.state.footer = []
      this.$nextTick(() => {
        this.templet.p_init() //这个是正式接口的
      })

      // this.templet.createGuide();//重置标尺
    },
    addPage() {
      // 新增页面
      this.title = ''
      this.name = ''
      this.addDodel = true
    },
    addDodelAjax() {
      let _this = this
      // 页面名称 是否重复
      let isRepeat = this.pages.every(item => item.name !== this.name)

      if (!isRepeat) {
        _this.$notify({
          title: '提示',
          message: '页面名称重复',
          type: 'success',
          duration: 3000
        })
        return
      }

      if (!this.name) {
        this.$notify({
          title: '提示',
          message: '名称不能为空',
          type: 'warning',
          duration: 3000
        })
        return
      }

      if (!this.title) {
        this.$notify({
          title: '提示',
          message: '标题不能为空',
          type: 'warning',
          duration: 3000
        })
        return
      }

      if (/[a-zA-Z0-9_]{4,12}/gi.test(this.name)) {
        this.$store.state.changePage = true
        $.ajax({
          url: _this.$store.state.domain + '/index_pc.php/newapi/page/add',
          type: 'post',
          data: {
            title: _this.title,
            name: _this.name,
            type: 'add'
          },
          success(data) {
            _this.pages.push(data.data)
            _this.$store.state.changePage = false
            _this.addDodel = false
            _this.$notify({
              title: '提示',
              message: `"${data.data.title}"新增页面成功`,
              type: 'success',
              duration: 3000
            })
            /**@augments
             * 滚动至底部
             */
            _this.$nextTick(() => {
              let height = $(`#pages_manege`).height() * 4
              $(`#pages_manege`).animate(
                {
                  scrollTop: height
                },
                'slow',
                'swing'
              )
            })
          },
          error(err) {
            _this.$store.state.changePage = false
            _this.$notify({
              title: '提示',
              message: err.responseJSON.error,
              type: 'warning',
              duration: 3000
            })
          }
        })
      } else {
        this.$notify({
          title: '提示',
          message: '名称 (4-12位字母数字下滑线组成)',
          type: 'warning',
          duration: 3000
        })
      }
    },
    selectPic(item, urls) {
      var that = this
      this.$store.state.showPicCon = true
      this.$store.state.imgUrls = function(val) {
        that[item] = val.src
      }
    },
    hoverP(ID) {
      this.hoverId = ID
    },
    leaveP() {
      this.hoverId = null
    }
  },
  computed: {
    pIsShow() {
      return true
    }
  },
  components: {},
  created() {
    this.initPage()
  },
  mounted() {
    this.sort() //挂件列表分类
    const that = this

    this.starDrag()

    //组件绑定拖拽

    // esc 按钮切换左边栏
    $(document).keydown(e => {
      if (e.keyCode == 27) {
        this.isShow = !this.isShow
      }

      // w-87 s-83 a-65 d-68
      if (e.keyCode == 87 && e.shiftKey) {
        // this.keyScrollTop()
        this.templet.keyScrollTop(this.$message)
      }

      if (e.keyCode == 83 && e.shiftKey) {
        // this.keyScrollBtm()
        this.templet.keyScrollBtm(this.$message)
      }

      if (e.keyCode == 65 && e.shiftKey) {
        // this.keyScrollNext()
        this.templet.keyScrollNext(this.$message)
      }

      if (e.keyCode == 68 && e.shiftKey) {
        // this.keyScrollPre()
        this.templet.keyScrollPre(this.$message)
      }
    })

    // 初始化页面标题
    let index = sessionStorage.getItem('pageIndex')
    let title = sessionStorage.getItem('pageTitle')
    let pageName = sessionStorage.getItem('pageName')
    let themesId = sessionStorage.getItem('themesId')
    let viewModule = sessionStorage.getItem('viewModule')

    if (pageName) {
      this.$store.state.now_page = pageName
    }

    if (title) {
      document.title = title
      this.$store.state.localTitle = title
    }

    if (index) {
      this.currIndex = +index
    }

    if (!themesId) {
      sessionStorage.setItem('themesId', this.$store.state.theme_id)
    }

    if (viewModule) {
      // view_module: 'index:index'
      this.$store.state.view_module = viewModule
    }

    // 模板更改 重置参数
    if (themesId != this.$store.state.theme_id) {
      sessionStorage.setItem('themesId', this.$store.state.theme_id)
      this.currIndex = 0
      this.$store.state.now_page = 'index'
      document.title = '首页'
      this.$store.state.localTitle = '首页'
      this.$store.state.view_module = 'index:index'

      sessionStorage.setItem('pageName', 'index')
      sessionStorage.setItem('pageIndex', '0')
      sessionStorage.setItem('pageTitle', '首页')
      sessionStorage.setItem('viewModule', 'index:index')
    }
  },
  updated() {}
}
</script>

<style lang="scss" scoped type="text/css">
// 帮助的样式
ul.PendantList > li > div {
  position: relative;
}
ul.PendantList > li i {
  font-family: FontAwesome;
  font-size: 20px;
  color: #ccc;
  position: absolute;
  top: -16px;
  right: -18px;
  line-height: 1;
  z-index: 1;
}

ul.PendantList > li > div > b {
  width: 0;
  height: 0;
  border: 20px solid #e5e5e5;
  border-bottom-color: transparent;
  border-left-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
}

ul.PendantList > li:hover > div > b {
  display: block;
}
/* 
 ul.PendantList > li > div::before{
  content: '';
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 20px solid #e5e5e5;
  border-bottom-color: transparent;
  border-left-color: transparent;
  position: absolute;
  display: block;
} 

ul.PendantList > li:hover > div::before{
  display: block;
}
 */
// #PendantList {
//   padding-top: 40px;
//   padding-bottom: 12px;
// }

div.my-add-page {
  background-color: #fff;
  text-align: center;
  padding: 6px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

div.pages {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  p {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    // margin-bottom: 12px;
    cursor: pointer;
    border-bottom: 1px dotted #ccc;
    span {
      display: inline-block;
      margin-left: 12px;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      font-size: 16px;
      &:not(:first-child) {
        display: inline-block;
        margin-left: 12px;
      }
    }
  }
  .currPage {
    background-color: #409eff;
    color: #fff;
  }
}

div.model-div {
  margin-top: 12px;
  strong {
    display: inline-block;
    max-width: 200px;
    min-width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}

div.collect-img {
  img {
    width: 160px;
    height: 100px;
  }
}
.star-wrap {
  padding-top: 40px;
}
</style>

<style>
.my-add-page input.el-input__inner {
  height: 34px;
}
</style>
