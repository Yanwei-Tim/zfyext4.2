/**
 * Created by yongzhi.zhan on 14-3-5.
 */
Ext.define('XTGL.view.BMGLEditWindow', {
    extend: 'Share.view.PopupWindow',
    resizable:false,
    title: "编辑部门信息",
    width: 380,
    height: 236,
    border: 0,
    bodyBorder: false,
    layout: "fit",
    items:{
        xtype: "form",
        id: "bmgl_edit_form",
        border: 0,
        bodyBorder: false,
        padding: "20px 0 0 20px",
        defaults:{
            width: 315
        },
        items: [
            {
                xtype: 'displayfield',
                id: "xtgl_bmgl_bmbh",
                name: 'bmbh',
                fieldLabel: '部门编号'
            },
            {
                xtype: 'textfield',
                id: "xtgl_bmgl_bmmc",
                name: 'bmmc',
                fieldLabel: '部门名称',
                allowBlank: false,
                validator: function(value){
                    if(value==null||value==''){
                        return true;
                    }
                    var reg = /([?/:'*"<>|\\]+)/;
                    if(value.match(reg)!=null){
                        return "不能包含 ?/:'*\"<>|\\ ";
                    }else{
                        return true;
                    }
                },
                listeners:{
                    change:function (field) {
                        var $ = function(id){
                            return document.getElementById(id);
                        }
                        $(field.getId()+"-inputEl").setAttribute("maxLength",20);
                    }
                }
            },
            {
                fieldLabel:"父级单位",
                name:"dep_code",
                xtype: 'TreeCombo',
                showPolice:false,
                editable:false
            },
            {
                xtype: 'numberfield',
                id: "xtgl_bmgl_bmpx",
                name: 'bmpx',
                fieldLabel: '排序',
                allowBlank: false,
                value: 0,
                minValue: 0,
                negativeText:"",
                validator: function(value){
                    if(value==null||value==''){
                        return true;
                    }
                    var reg = /(^[0-9]*$)/;
                    if(value.match(reg)==null){
                        return "只能输入大于0的整数";
                    }else{
                        return true;
                    }
                },
                listeners:{
                    change:function (field) {
                        var $ = function(id){
                            return document.getElementById(id);
                        }
                        $(field.getId()+"-inputEl").setAttribute("maxLength",20);
                    }
                }
            }
        ]
    },
    buttons:[
        {
            text: "确定",
            id: "bmgl_edit_ok"
        },{
            text: "取消",
            id: "bmgl_edit_cancel"
        }
    ]
});
