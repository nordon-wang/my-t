import StyleList from './style_list_config';
import Store from '../vuex/store';

//生成一个row的类
class OneRow {
  constructor({id,widgets_id,children=[],rowType = Store.state.editing_block, data = JSON.parse(JSON.stringify(StyleList['layout_row']))}){
    this.name = 'layout_row';
    this.pid = 0;
    this.widgets_id = widgets_id;
    this.data = data;
    /*if(Store.state.pagewidth){
        this.data.infor.module_width = Store.state.pagewidth;
    }*/
    this.rowType = rowType;
    this.children = children;
    this.isShow = true;
  }
}

export default OneRow;
