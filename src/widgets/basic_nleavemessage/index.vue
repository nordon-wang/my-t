<template>
	<div class="dateIndex mouseClass " :style="moduleClass">
		<!--编辑框-->
		<div class="public_edit">
			<ul>
				<!-- <li class="edit_module" @click.stop="open_self_modal">表单编辑</li> -->
				<li class="edit_module" @click.stop="select_parts('','basic_nleavemessage')">{{templet.p_nameToChinese(name)}}编辑</li>
				<li class="edit_module" @click.stop="editPublic">公共设置</li>
				<my-tooltip content="动画选择">
					<li class="edit_module" @click.stop="select_parts('','public_animated')">
						<span class="fa fa-flash"></span>
					</li>
				</my-tooltip>
				<my-tooltip content="基础设置">
					<li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
				</my-tooltip>
				<li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
			</ul>
		</div>
		<div id="imgsmodel" class="index_Highlight_hover_out" :style="{
      position: 'relative',
      width:infor.form_all_width + 'px',
      height:infor.form_all_height + 'px',
			cursor:'default'
    }" @dblclick.stop="select_parts('','basic_nleavemessage')">
			<!-- 循环 -->
			<div v-for="(items,$index) in infor.form_select_datas" :key="$index" :style="{
			position: 'absolute',
			width:items.styles.width+'px',
			height:items.styles.height+'px',
			left:items.styles.left+'px',
			top:items.styles.top+'px',
			borderTopStyle:items.styles.rowBorderTopStyle,
			borderTopWidth:items.styles.rowBorderTopWidth + 'px',
			borderTopColor:items.styles.rowBorderTopColor,
			borderRightStyle:items.styles.rowBorderRightStyle,
			borderRightWidth:items.styles.rowBorderRightWidth + 'px',
			borderRightColor:items.styles.rowBorderRightColor,
			borderBottomStyle:items.styles.rowBorderBottomStyle,
			borderBottomWidth:items.styles.rowBorderBottomWidth + 'px',
			borderBottomColor:items.styles.rowBorderBottomColor,
			borderLeftStyle:items.styles.rowBorderLeftStyle,
			borderLeftWidth:items.styles.rowBorderLeftWidth + 'px',
			borderLeftColor:items.styles.rowBorderLeftColor,
		}" class="clearfix form-row-items" :data-num="$index" @dblclick.stop="openSelfModel($index)" :class="[
			$store.state.parts == 'basic_nleavemessage' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
			$store.state.hover_parts == 'basic_nleavemessage' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
			'mouseClass'
        ]">

			<div :style="{
				position: 'absolute',
				width:items.styles.width - 12 +'px',
				height:items.styles.height - 12 +'px',
				backgroundColor:'#fff',
				zIndex:'99',
				opacity:'0'
			}"></div>

				<!-- 标题 -->
				<div class="left" v-if="items.fieldtype !== 'button' && items.fieldtype !== 'doublebutton'" :style="{
				width:items.styles.titleWidth+'px',
				height:items.styles.titleHeight+'px',
				lineHeight:items.styles.titleLineHeight+'px',
				marginLeft:items.styles.titleLeft+'px',
				marginRight:items.styles.titleRight+'px',
				marginTop:items.styles.titleTop+'px',
				backgroundColor:items.styles.titleBackgroundColor,
				color:items.styles.titleColor,
				fontSize:items.styles.titleFs +'px',
				fontWeight:items.styles.titleFontWeight,
				textAlign:items.styles.titleTextAlign,
				display:items.styles.titleDisplay,
				whiteSpace: 'normal'
			}">
					{{items.inputName}}
				</div>

				<!-- 必填*号 -->
				<span v-if="items.required === 1" :style="{
				position:'absolute',
				left:items.styles.xingLeft+'px',
				top:items.styles.xingTop+'px',
				fontSize:items.styles.xingFS+'px',
				color:items.styles.xingColor,
				display:items.styles.xingDisplay,
				zIndex:'99',
	     	lineHeight: '1.5'
			}">*</span>

				<!-- 必填*号 验证码 -->
				<span v-if="items.fieldtype === 'yzm'" :style="{
				position:'absolute',
				left:items.styles.xingLeft+'px',
				top:items.styles.xingTop+'px',
				fontSize:items.styles.xingFS+'px',
				color:items.styles.xingColor,
				display:items.styles.xingDisplay,
				zIndex:'99',
	     	lineHeight: '1.5'
			}">*</span>

				<!-- 图标 -->
				<i :class="items.styles.iconClassName" :style="{
				position:'absolute',
				left:items.styles.iconLeft+'px',
				top:items.styles.iconTop+'px',
				fontSize:items.styles.iconFS+'px',
				color:items.styles.iconColor,
				display:items.styles.iconDisplay,
				zIndex:'99'
			}"></i>

				<!-- 单行文本 -->
				<div class="left" v-show="items.fieldtype === 'text'">
					<input type="text" :value="items.placeholder" :placeholder="items.placeholder" :style="{
					width:items.styles.selfInputWidth+'px',
					height:items.styles.selfInputHeight+'px',
					paddingLeft:items.styles.selfInputPaddingLeft+'px',
					marginTop:items.styles.selfInputTop+'px',
					backgroundColor:items.styles.selfInputBC,
					borderRadius:items.styles.selfInputBorderRadius+'px',
          borderTopStyle:items.styles.selfInputBorderTopStyle,
          borderTopWidth:items.styles.selfInputBorderTopWidth + 'px',
          borderTopColor:items.styles.selfInputBorderTopColor,
          borderRightStyle:items.styles.selfInputBorderRightStyle,
          borderRightWidth:items.styles.selfInputBorderRightWidth + 'px',
          borderRightColor:items.styles.selfInputBorderRightColor,
          borderBottomStyle:items.styles.selfInputBorderBottomStyle,
          borderBottomWidth:items.styles.selfInputBorderBottomWidth + 'px',
          borderBottomColor:items.styles.selfInputBorderBottomColor,
          borderLeftStyle:items.styles.selfInputBorderLeftStyle,
          borderLeftWidth:items.styles.selfInputBorderLeftWidth + 'px',
          borderLeftColor:items.styles.selfInputBorderLeftColor,
					fontSize:infor.placeholder_fs + 'px',
					color:infor.placeholder_color
				}">
				</div>

				<!-- 多文本 -->
				<div class="left" v-if="items.fieldtype === 'textarea'">
					<textarea :name="items.field" :id="items.field" :value="items.placeholder" :placeholder="items.placeholder" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					marginTop:items.styles.inputTop+'px',
					borderRadius:items.styles.inputBorderRadius+'px',
					backgroundColor:items.styles.inputBC,
          borderTopStyle:items.styles.inputBorderTopStyle,
          borderTopWidth:items.styles.inputBorderTopWidth + 'px',
          borderTopColor:items.styles.inputBorderTopColor,
          borderRightStyle:items.styles.inputBorderRightStyle,
          borderRightWidth:items.styles.inputBorderRightWidth + 'px',
          borderRightColor:items.styles.inputBorderRightColor,
          borderBottomStyle:items.styles.inputBorderBottomStyle,
          borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
          borderBottomColor:items.styles.inputBorderBottomColor,
          borderLeftStyle:items.styles.inputBorderLeftStyle,
          borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
          borderLeftColor:items.styles.inputBorderLeftColor,
          resize:'both',
          paddingTop:items.styles.textreaTopPadging + 'px',
					fontSize:infor.placeholder_fs + 'px',
					color:infor.placeholder_color
				}"></textarea>
				</div>

				<!-- 下拉框 -->
				<div class="left" v-if="items.fieldtype === 'select' && items.valtype !== 'multiple'">
					<select :name="items.field" :id="items.field" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					borderRadius:items.styles.inputBorderRadius+'px',
					backgroundColor:items.styles.inputBC,
          borderTopStyle:items.styles.inputBorderTopStyle,
          borderTopWidth:items.styles.inputBorderTopWidth + 'px',
          borderTopColor:items.styles.inputBorderTopColor,
          borderRightStyle:items.styles.inputBorderRightStyle,
          borderRightWidth:items.styles.inputBorderRightWidth + 'px',
          borderRightColor:items.styles.inputBorderRightColor,
          borderBottomStyle:items.styles.inputBorderBottomStyle,
          borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
          borderBottomColor:items.styles.inputBorderBottomColor,
          borderLeftStyle:items.styles.inputBorderLeftStyle,
          borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
          borderLeftColor:items.styles.inputBorderLeftColor,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
				}">	
						<option value="请选择">请选择</option>
						<option v-for="(options,index) in items.thisvals" :key="index">{{options}}</option>
					</select>
				</div>

				<!-- 多行下拉框 -->
				<div class="left" v-if="items.fieldtype === 'select' && items.valtype === 'multiple'">
					<select :name="items.field" :id="items.field" multiple :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					borderRadius:items.styles.inputBorderRadius+'px',
					backgroundColor:items.styles.inputBC,
          borderTopStyle:items.styles.inputBorderTopStyle,
          borderTopWidth:items.styles.inputBorderTopWidth + 'px',
          borderTopColor:items.styles.inputBorderTopColor,
          borderRightStyle:items.styles.inputBorderRightStyle,
          borderRightWidth:items.styles.inputBorderRightWidth + 'px',
          borderRightColor:items.styles.inputBorderRightColor,
          borderBottomStyle:items.styles.inputBorderBottomStyle,
          borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
          borderBottomColor:items.styles.inputBorderBottomColor,
          borderLeftStyle:items.styles.inputBorderLeftStyle,
          borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
          borderLeftColor:items.styles.inputBorderLeftColor,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
				}">
						<option v-for="(options,index1) in items.thisvals" :key="index1">{{options}}</option>
					</select>
				</div>

				<!-- 纵向复选框 -->
				<div class="left " v-if="items.fieldtype === 'checkbox'  && items.valtype === 'checkboxes'">
					<div v-for="(checkbox,index) in items.thisvals" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					backgroundColor:items.styles.inputBC,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
					textAlign: 'left'
				}" :key="index">
						<input type="checkbox" :name="items.field" :id="items.field" :style="{
						marginRight:items.styles.checkboxDistance+'px'
					}">{{checkbox}}
					</div>
				</div>

				<!-- 横向复选框 -->
				<div class="left " v-if="items.fieldtype === 'checkbox'  && items.valtype !== 'checkboxes'">
					<div v-for="(checkbox,index) in items.thisvals" class="left" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					backgroundColor:items.styles.inputBC,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
					textAlign: 'left'
				}" :key="index">
						<input type="checkbox" :name="items.field" :id="items.field" :style="{
						marginRight:items.styles.checkboxDistance+'px'
					}">{{checkbox}}
					</div>
				</div>

				<!-- 纵向单选框 -->
				<div class="left" v-if="items.fieldtype === 'radio'  && items.valtype === 'radios'">
					<div v-for="(checkbox,index) in items.thisvals" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					backgroundColor:items.styles.inputBC,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
					textAlign: 'left'
				}" :key="index">
						<input type="radio" :name="items.field" :id="items.field" :style="{
						marginRight:items.styles.checkboxDistance+'px'
					}">{{checkbox}}
					</div>
				</div>

				<!-- 横向单选框 -->
				<div class="left" v-if="items.fieldtype === 'radio'  && items.valtype !== 'radios'">
					<div v-for="(checkbox,index) in items.thisvals" class="left" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					marginTop:items.styles.inputTop+'px',
					backgroundColor:items.styles.inputBC,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
					textAlign: 'left'
				}" :key="index">
						<input type="radio" :name="items.field" :id="items.field" class="left" :style="{
						marginRight:items.styles.checkboxDistance+'px'
					}">{{checkbox}}
					</div>
				</div>

				<!-- 按钮 -->
				<div v-if="items.fieldtype === 'button'" style="text-align: left;">
					<input :type="items.valtype" :name="items.field" :value="items.thisvals" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					lineHeight:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					paddingTop:items.styles.selectPaddingTop+'px',
					backgroundColor:items.styles.inputBC,
					fontSize:items.styles.selectFS +'px',
					fontWeight:items.styles.selectFontWeight,
					color:items.styles.selectColor,
					borderRadius:items.styles.inputBorderRadius+'px',
          borderTopStyle:items.styles.inputBorderTopStyle,
          borderTopWidth:items.styles.inputBorderTopWidth + 'px',
          borderTopColor:items.styles.inputBorderTopColor,
          borderRightStyle:items.styles.inputBorderRightStyle,
          borderRightWidth:items.styles.inputBorderRightWidth + 'px',
          borderRightColor:items.styles.inputBorderRightColor,
          borderBottomStyle:items.styles.inputBorderBottomStyle,
          borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
          borderBottomColor:items.styles.inputBorderBottomColor,
          borderLeftStyle:items.styles.inputBorderLeftStyle,
          borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
          borderLeftColor:items.styles.inputBorderLeftColor,
          backgroundImage:'url(' + items.styles.doubleBtnImg1 +')',
					backgroundImage:`url(${$store.state.domain}${items.styles.doubleBtnImg1})`,
          backgroundSize:' 100% 100%',
					backgroundRepeat:'no-repeat'
				}">
				</div>

				<!-- 双按钮 -->
				<div v-if="items.fieldtype === 'doublebutton'" class="clearfix doublebutton">
					<!-- 第一个按钮 -->
					<div v-for="(doublebtn,$index) in items.thisvals" :key="$index" class="left">
						<input v-if="$index === 0" :type="items.valtype[$index]" :name="items.field" :value="doublebtn" :style="{
						width:items.styles.inputWidth+'px',
						height:items.styles.inputHeight+'px',
						lineHeight:items.styles.inputHeight+'px',
						paddingLeft:items.styles.inputPaddingLeft+'px',
						paddingTop:items.styles.selectPaddingTop+'px',
						backgroundColor:items.styles.inputBC,
						fontSize:items.styles.selectFS +'px',
						fontWeight:items.styles.selectFontWeight,
						color:items.styles.selectColor,
						borderRadius:items.styles.inputBorderRadius+'px',
            borderTopStyle:items.styles.inputBorderTopStyle,
            borderTopWidth:items.styles.inputBorderTopWidth + 'px',
            borderTopColor:items.styles.inputBorderTopColor,
            borderRightStyle:items.styles.inputBorderRightStyle,
            borderRightWidth:items.styles.inputBorderRightWidth + 'px',
            borderRightColor:items.styles.inputBorderRightColor,
            borderBottomStyle:items.styles.inputBorderBottomStyle,
            borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
            borderBottomColor:items.styles.inputBorderBottomColor,
            borderLeftStyle:items.styles.inputBorderLeftStyle,
            borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
            borderLeftColor:items.styles.inputBorderLeftColor,
            marginRight:items.styles.checkboxDistance + 'px',
            backgroundImage:'url(' + items.styles.doubleBtnImg1 +')',
						backgroundImage:`url(${$store.state.domain}${items.styles.doubleBtnImg1})`,
            backgroundSize:' 100% 100%',
            backgroundRepeat:'no-repeat'
					}">
						<!-- 第二个按钮 -->
						<input v-else :type="items.valtype[$index]" :name="items.field" :value="doublebtn" :style="{
						width:items.styles.inputWidth2+'px',
						height:items.styles.inputHeight2+'px',
						lineHeight:items.styles.inputHeight2+'px',
						paddingLeft:items.styles.inputPaddingLeft2+'px',
						paddingTop:items.styles.selectPaddingTop2+'px',
						backgroundColor:items.styles.inputBC2,
						fontSize:items.styles.selectFS2 +'px',
						fontWeight:items.styles.selectFontWeight2,
						color:items.styles.selectColor2,
						borderRadius:items.styles.inputBorderRadius2+'px',
            borderTopStyle:items.styles.inputBorderTopStyle2,
            borderTopWidth:items.styles.inputBorderTopWidth2 + 'px',
            borderTopColor:items.styles.inputBorderTopColor2,
            borderRightStyle:items.styles.inputBorderRightStyle2,
            borderRightWidth:items.styles.inputBorderRightWidth2 + 'px',
            borderRightColor:items.styles.inputBorderRightColor2,
            borderBottomStyle:items.styles.inputBorderBottomStyle2,
            borderBottomWidth:items.styles.inputBorderBottomWidth2 + 'px',
            borderBottomColor:items.styles.inputBorderBottomColor2,
            borderLeftStyle:items.styles.inputBorderLeftStyle2,
            borderLeftWidth:items.styles.inputBorderLeftWidth2 + 'px',
            borderLeftColor:items.styles.inputBorderLeftColor2,
            backgroundImage:'url(' + items.styles.doubleBtnImg2 +')',
						backgroundImage:`url(${$store.state.domain}${items.styles.doubleBtnImg2})`,
            backgroundSize:' 100% 100%',
            backgroundRepeat:'no-repeat'
					}">
					</div>
				</div>

				<!-- 验证码 -->
				<div v-if="items.fieldtype === 'yzm'" class="left " style="white-space: normal;">
					<input type="text" class="left" :value="items.placeholder" :name="items.field" :id="items.field" :placeholder="items.placeholder" :style="{
					width:items.styles.inputWidth+'px',
					height:items.styles.inputHeight+'px',
					paddingLeft:items.styles.inputPaddingLeft+'px',
					marginTop:items.styles.inputTop+'px',
					backgroundColor:items.styles.inputBC,
					borderRadius:items.styles.inputBorderRadius+'px',
					borderTopStyle:items.styles.inputBorderTopStyle,
					borderTopWidth:items.styles.inputBorderTopWidth + 'px',
					borderTopColor:items.styles.inputBorderTopColor,
					borderRightStyle:items.styles.inputBorderRightStyle,
					borderRightWidth:items.styles.inputBorderRightWidth + 'px',
					borderRightColor:items.styles.inputBorderRightColor,
					borderBottomStyle:items.styles.inputBorderBottomStyle,
					borderBottomWidth:items.styles.inputBorderBottomWidth + 'px',
					borderBottomColor:items.styles.inputBorderBottomColor,
					borderLeftStyle:items.styles.inputBorderLeftStyle,
					borderLeftWidth:items.styles.inputBorderLeftWidth + 'px',
					borderLeftColor:items.styles.inputBorderLeftColor,
					fontSize:infor.placeholder_fs + 'px',
					color:infor.placeholder_color
				}">
					<div id="legendss" class="left">
						<img :src='datas.yzmimg' id="verify" alt="验证码" :style="{
					width:items.styles.yzmImgWidth+'px',
					height:items.styles.yzmImgHeight+'px',
					marginTop:items.styles.yzmImgTop+'px',
					marginRight:items.styles.yzmImgRight+'px',
					marginBottom:items.styles.yzmImgBottom+'px',
					marginLeft:items.styles.yzmImgLeft+'px',
				}">
					</div>
					<a href="javascript:;" class="yzminfo" :style="{
					fontSize:items.styles.yzmAFs+'px',
					color:items.styles.yzmAColor,
					marginTop:items.styles.yzmATop+'px',
					display:'inline-block'
				}">看不清？换一张</a>
				</div>

			</div>
		</div>

		<!-- 私有modal -->
		<edit-module v-if="isShow" v-on:closem="myclose" :isShow="isShow"></edit-module>
		<el-dialog title="表单编辑" :modal="false" width="800px" :append-to-body="true" :visible.sync="style_modal" class="my-msg-module">

			<component @dblclick.stop.native="cancelBubles" :is="getTypeComponent" :tem_datas="tem_datas" :infor="infor"></component>

			<div slot="footer" class="dialog-footer">
				<!-- <el-button @click="style_modal = false">取 消</el-button> -->
				<el-button type="primary" @click="style_modal = false">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 公有modal -->
		<el-dialog title="公共设置" :modal="false" width="800px" :append-to-body="true" :visible.sync="style_public_modal" class="my-msg-module" :modal-append-to-body="true">

			<div class="public-form-styles" @dblclick.stop="cancelBubles" :style="{
					height: '400px',
					overflowY: 'auto'
			}">
				<el-tabs v-model="activeName">
					<el-tab-pane name="first" label="标题">
						<el-alert title="每个字段的标题为统一设置样式" type="info"></el-alert>
						<el-row class="row-modal">
							<el-button type="primary" v-on:click="mobsyncTitle">同步</el-button>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">宽:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicTitle.titleWidth"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">高:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicTitle.titleHeight"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">显示:</b>
								<my-select v-model="infor.publicTitle.titleDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">行高:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicTitle.titleLineHeight"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">水平位置:</b>
								<my-select v-model="infor.publicTitle.titleTextAlign" title="" :option="$store.state.options.textAlign"></my-select>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">字体粗细:</b>
								<my-select v-model="infor.publicTitle.titleFontWeight" title="" :option="$store.state.options.myFontWeight"></my-select>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">字体大小:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicTitle.titleFs"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">上间距:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicTitle.titleTop"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">左间距:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicTitle.titleLeft"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">右间距:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicTitle.titleRight"></my-number>
							</el-col>
						</el-row>
						<el-row class="rows2">
							<div class="setOne">
								<my-color v-model="infor.publicTitle.titleColor" title="字体:"></my-color>
								<my-color v-model="infor.publicTitle.titleBackgroundColor" title="背景:"></my-color>
							</div>
						</el-row>
					</el-tab-pane>
					<el-tab-pane name="third" label="单文本">
						<el-alert title="每个字段的单文本为统一设置样式" type="info"></el-alert>
						<el-row class="row-modal">
							<el-button type="primary" v-on:click="mobsyncInput">同步</el-button>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">宽:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicInput.selfInputWidth"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">高:</b>
								<my-number :max="1000" :min="1" v-model="infor.publicInput.selfInputHeight"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">左内间距:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputPaddingLeft"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">上间距:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputTop"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<div class="setOne single-color">
									<my-color v-model="infor.publicInput.selfInputColor" title="字体:"></my-color>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="setOne single-color">
									<my-color v-model="infor.publicInput.selfInputBC" title="背景:"></my-color>
								</div>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">圆角半径:</b>
								<my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputBorderRadius"></my-number>
							</el-col>
						</el-row>

						<div class="setOne">
							<my-border type="top" :my_style.sync="infor.publicInput.selfInputBorderTopStyle" :my_color.sync="infor.publicInput.selfInputBorderTopColor" :my_width.sync="infor.publicInput.selfInputBorderTopWidth" title="上边框"></my-border>
							<my-border type="right" :my_style.sync="infor.publicInput.selfInputBorderRightStyle" :my_color.sync="infor.publicInput.selfInputBorderRightColor" :my_width.sync="infor.publicInput.selfInputBorderRightWidth" title="右边框"></my-border>
							<my-border type="bottom" :my_style.sync="infor.publicInput.selfInputBorderBottomStyle" :my_color.sync="infor.publicInput.selfInputBorderBottomColor" :my_width.sync="infor.publicInput.selfInputBorderBottomWidth" title="下边框"></my-border>
							<my-border type="left" :my_style.sync="infor.publicInput.selfInputBorderLeftStyle" :my_color.sync="infor.publicInput.selfInputBorderLeftColor" :my_width.sync="infor.publicInput.selfInputBorderLeftWidth" title="左边框"></my-border>
						</div>
					</el-tab-pane>
					<el-tab-pane name="fourth" label="*号">
						<el-alert title="每个字段的*号为统一设置样式" type="info"></el-alert>
						<el-row class="row-modal">
							<el-button type="primary" v-on:click="mobsyncXing">同步</el-button>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">显示:</b>
								<my-select v-model="infor.publicXing.xingDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">左间距:</b>
								<my-number :max="1000" :min="-100" v-model="infor.publicXing.xingLeft"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">上间距:</b>
								<my-number :max="1000" :min="-100" v-model="infor.publicXing.xingTop"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">大小:</b>
								<my-number :max="200" :min="12" v-model="infor.publicXing.xingFS"></my-number>
							</el-col>
							<el-col :span="12">
								<div class="setOne single-color">
									<my-color v-model="infor.publicXing.xingColor" title="颜色:"></my-color>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane name="five" label="图标设置">
						<el-alert title="每个字段的图标为统一设置样式" type="info"></el-alert>
						<el-row class="row-modal">
							<el-button type="primary" v-on:click="mobsyncIcon">同步</el-button>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">显示:</b>
								<my-select v-model="infor.publicIcon.iconDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">左间距:</b>
								<my-number :max="1000" :min="-100" v-model="infor.publicIcon.iconLeft"></my-number>
							</el-col>
							<el-col :span="12">
								<b class="left inputB">上间距:</b>
								<my-number :max="1000" :min="-100" v-model="infor.publicIcon.iconTop"></my-number>
							</el-col>
						</el-row>
						<el-row class="row-modal">
							<el-col :span="12">
								<b class="left inputB">大小:</b>
								<my-number :max="200" :min="12" v-model="infor.publicIcon.iconFS"></my-number>
							</el-col>
							<el-col :span="12">
								<div class="setOne single-color">
									<my-color v-model="infor.publicIcon.iconColor" title="背景:"></my-color>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button @click="style_public_modal = false">取 消</el-button> -->
				<el-button type="primary" @click="style_public_modal = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import myajax from '../../js/ajax'
// import { NavbarItem, SlideItem } from '@/widgets/basic_nleavemessage/components'
// import { NavbarItem, SlideItem }  from './components'
import editModule from './editmoudle'
import Vue from 'vue'
// 表单的每个字段单独的样式  分别封装在不同的组件中 根据 component进行显示
import {
  formText,
  formTextarea,
  formSelect,
  formMultipleselect,
  formRadios,
  formButton,
  formDoublebutton,
  formYzm
} from '@/view/form'


export default {
  name: 'basic_nleavemessage',
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    },
    pid: {
      type: String,
      default: ''
    },
    rowType: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      style_modal: false,
      style_public_modal: false,
      datas: {
        msg: `123123`,
        imgs: require('../../assets/logo.png'),
        imgs2: require('@/assets/logo.png'),
        yzmimg: `${this.$store.state.domain}/login-verify.html`
      },
      activeName2: 'first',
      activeName: 'first',
      tem_datas: {
        styles: {
          width: 0,
          height: 0,
          left: 0,
          top: 0
        }
      },
      targetDom: [], //在同屏幕的dom数组
      Error_amount: 1, //对齐的误差量
      Error_lock: 5, //锁定的误差
      lock: {
        transverse_lock: false, //横向锁定值
        vertical_lock: false //竖向锁定值
      }
    }
  },
  computed: {
    getTypeComponent() {
      // 类型
      let fieldtype = this.tem_datas.fieldtype
      // 是否多行下拉框
      let valtype = this.tem_datas.valtype
      if (fieldtype == 'select' && valtype == 'multiple') {
        return `form-${valtype}${fieldtype}`
      } else if (fieldtype == 'checkbox' || fieldtype == 'radio') {
        // 勾选框
        return 'form-radios'
      }

      return `form-${fieldtype}`
    },
    moduleClass() {
      return {
        width: this.infor.width + 'px',
        height: this.infor.height + 'px',
        lineHeight: this.infor.height + 'px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }
    },
    mys() {
      return {
        backgroundImage: `url("/static/image/3.jpg")`,
        backgroundSize: `100% 100%`,
        width: '200px',
        height: '60px',
        lineHeight: '60px'
      }
    }
  },
  methods: {
    initData() {
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
      let _pid = this.pid
      let _rowtype = this.rowType
      let _id = this.id

      let IndexObj = this.templet.p_find_moduleIndex({
        pid: _pid,
        type: _rowtype,
        id: _id
      })

      let rowIndex = IndexObj.row
      let moduleIndex = IndexObj.module
      let rowtype = this.rowType

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'form_all_width', moduleObj.module_width || 200)
      this.$set(this.infor, 'allwidth', moduleObj.module_width || 200)
      this.$set(this.infor, 'form_all_height', moduleObj.module_height || 200)
    },
    cancelBubles() {},
    myclose() {
      this.isShow = false
    },
    open_self_modal() {
      this.isShow = true
      this.templet.p_index_select_parts({
        partsName: '',
        moduleName: '',
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
      this.$store.state.showMyMask = true
    },
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
    },
    moves() {
      const that = this
      let is_disabled = false
      if (this.$store.state.module_name != 'basic_nleavemessage') {
        is_disabled = true //row排序后，重新渲染组件，这时拖拽应该是关闭的
      }
      // form-row-items
      let _this = this
      $(`#u${this.id} div.form-row-items`).draggable({
        containment: 'parent',
        zIndex: 100,
        snapTolerance: 10,
        disabled: is_disabled,
        start: function() {
          //对齐线开始准备//对齐线逻辑
          that.templet.aline_start(that, $(this), '.form-row-items')
        },
        drag: function(event, ui) {
          //对齐线逻辑
          var dragLeft = $(this).offset().left
          var dragTop = $(this).offset().top

          var moveLeft = ui.offset.left
          var moveTop = ui.offset.top

          var dragWidth = $(this).width()
          var dragHeight = $(this).height()
          that.templet.aline_drag(
            that,
            $(this),
            dragLeft,
            dragTop,
            dragWidth,
            dragHeight,
            moveLeft,
            moveTop
          )
        },
        stop: function(event, ui) {
          that.templet.p_remove_line()
          let num = $(this).attr('data-num')
          _this.infor.form_select_datas[num].styles.left = ui.position.left
          _this.infor.form_select_datas[num].styles.top = ui.position.top
        }
      })
    },
    resizes() {
      let _this = this

      $(`#u${this.id} div.form-row-items`).resizable({
        containment: 'parent',
        autoHide: true,
        handles: "se, s, e, es",
        stop: function(event, ui) {
          let num = $(this).attr('data-num')

          _this.infor.form_select_datas[num].styles.width = ui.size.width
          _this.infor.form_select_datas[num].styles.height = ui.size.height
        }
      })
    },
    openSelfModel(id) {
      this.edit_id = id
      this.style_modal = !this.style_modal
      this.tem_datas = this.infor.form_select_datas[id]
      this.tem_datas.inputName =
        this.tem_datas.inputName === null ? '按钮' : this.tem_datas.inputName

      $.each($('.el-dialog__header'), item => {
        $('.el-dialog__header')
          .eq(item)
          .parent()
          .draggable({ handle: 'div.el-dialog__header,div.el-dialog__footer' })
      })
    },
    editPublic: function() {
      this.style_public_modal = !this.style_public_modal
      $.each($('.el-dialog__header'), item => {
        $('.el-dialog__header')
          .eq(item)
          .parent()
          .draggable({ handle: 'div.el-dialog__header,div.el-dialog__footer' })
      })
    },
    // 单文本同步
    mobsyncInput: function() {
      var obj = this.infor.form_select_datas
      var len = Object.keys(this.infor.form_select_datas).length
      for (var i = 0; i < len; i++) {
        obj[i].styles.selfInputWidth = this.infor.publicInput.selfInputWidth
        obj[i].styles.selfInputHeight = this.infor.publicInput.selfInputHeight
        obj[
          i
        ].styles.selfInputPaddingLeft = this.infor.publicInput.selfInputPaddingLeft
        obj[i].styles.selfInputTop = this.infor.publicInput.selfInputTop
        obj[
          i
        ].styles.selfInputBorderRadius = this.infor.publicInput.selfInputBorderRadius
        obj[i].styles.selfInputBC = this.infor.publicInput.selfInputBC
        obj[
          i
        ].styles.selfInputBorderTopStyle = this.infor.publicInput.selfInputBorderTopStyle
        obj[
          i
        ].styles.selfInputBorderTopWidth = this.infor.publicInput.selfInputBorderTopWidth
        obj[
          i
        ].styles.selfInputBorderTopColor = this.infor.publicInput.selfInputBorderTopColor
        obj[
          i
        ].styles.selfInputBorderRightStyle = this.infor.publicInput.selfInputBorderRightStyle
        obj[
          i
        ].styles.selfInputBorderRightWidth = this.infor.publicInput.selfInputBorderRightWidth
        obj[
          i
        ].styles.selfInputBorderRightColor = this.infor.publicInput.selfInputBorderRightColor
        obj[
          i
        ].styles.selfInputBorderBottomStyle = this.infor.publicInput.selfInputBorderBottomStyle
        obj[
          i
        ].styles.selfInputBorderBottomWidth = this.infor.publicInput.selfInputBorderBottomWidth
        obj[
          i
        ].styles.selfInputBorderBottomColor = this.infor.publicInput.selfInputBorderBottomColor
        obj[
          i
        ].styles.selfInputBorderLeftStyle = this.infor.publicInput.selfInputBorderLeftStyle
        obj[
          i
        ].styles.selfInputBorderLeftWidth = this.infor.publicInput.selfInputBorderLeftWidth
        obj[
          i
        ].styles.selfInputBorderLeftColor = this.infor.publicInput.selfInputBorderLeftColor
        obj[i].styles.selfInputColor = this.infor.publicInput.selfInputColor
      }

      this.$notify({
        title: '单文本',
        message:
          '表单中的所有单文本样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
        type: 'success',
        duration: 3000
      })
    },
    // 标题同步
    mobsyncTitle: function() {
      var obj = this.infor.form_select_datas
      var len = Object.keys(this.infor.form_select_datas).length
      for (var i = 0; i < len; i++) {
        obj[i].styles.titleWidth = this.infor.publicTitle.titleWidth
        obj[i].styles.titleHeight = this.infor.publicTitle.titleHeight
        obj[i].styles.titleLineHeight = this.infor.publicTitle.titleLineHeight
        obj[i].styles.titleLeft = this.infor.publicTitle.titleLeft
        obj[i].styles.titleRight = this.infor.publicTitle.titleRight
        obj[i].styles.titleTop = this.infor.publicTitle.titleTop
        obj[i].styles.titleFs = this.infor.publicTitle.titleFs
        obj[i].styles.titleFontWeight = this.infor.publicTitle.titleFontWeight
        obj[i].styles.titleTextAlign = this.infor.publicTitle.titleTextAlign
        obj[i].styles.titleDisplay = this.infor.publicTitle.titleDisplay
        obj[
          i
        ].styles.titleBackgroundColor = this.infor.publicTitle.titleBackgroundColor
        obj[i].styles.titleColor = this.infor.publicTitle.titleColor
      }

      this.$notify({
        title: '标题',
        message:
          '表单中的所有标题样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
        type: 'success',
        duration: 3000
      })
    },
    // *同步
    mobsyncXing: function() {
      // console.log('图标同步1',this.infor.form_select_datas);
      var obj = this.infor.form_select_datas
      var len = Object.keys(this.infor.form_select_datas).length
      for (var i = 0; i < len; i++) {
        obj[i].styles.xingLeft = this.infor.publicXing.xingLeft
        obj[i].styles.xingTop = this.infor.publicXing.xingTop
        obj[i].styles.xingFS = this.infor.publicXing.xingFS
        obj[i].styles.xingColor = this.infor.publicXing.xingColor
        obj[i].styles.xingDisplay = this.infor.publicXing.xingDisplay
      }

      this.$notify({
        title: '*号',
        message:
          '表单中的所有*号样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
        type: 'success',
        duration: 3000
      })
    },
    // 图标同步
    mobsyncIcon: function() {
      // console.log('图标同步1',this.infor.form_select_datas);
      var obj = this.infor.form_select_datas
      var len = Object.keys(this.infor.form_select_datas).length
      for (var i = 0; i < len; i++) {
        obj[i].styles.iconLeft = this.infor.publicIcon.iconLeft
        obj[i].styles.iconTop = this.infor.publicIcon.iconTop
        obj[i].styles.iconFS = this.infor.publicIcon.iconFS
        obj[i].styles.iconColor = this.infor.publicIcon.iconColor
        obj[i].styles.iconDisplay = this.infor.publicIcon.iconDisplay
      }

      this.$notify({
        title: '图标',
        message:
          '表单中的所有图标样式同步成功，所有表单使用同一样式，可单独设置每个的样式。',
        type: 'success',
        duration: 3000
      })
    }
  },
  updated() {
    this.$nextTick(() => {
      this.moves()
      this.resizes()
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.moves()
      this.resizes()
		})

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.initData()
		}
		
  },
  components: {
    editModule,
    formText,
    formTextarea,
    formSelect,
    formMultipleselect,
    formRadios,
    formButton,
    formDoublebutton,
    formYzm
  }
}
</script>

<style  lang="scss" scoped type="text/css" >
.left {
  float: left;
}

.right {
  float: right;
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}

.clearfix {
  zoom: 1;
}

i {
  font-family: FontAwesome;
}

input[type='radio'] {
  -webkit-appearance: radio;
}
input[type='checkbox'] {
  -webkit-appearance: checkbox;
}
</style>
<style>
div.el-dialog__header,
div.el-dialog__footer {
  cursor: move;
}
</style>
