/**
 * Created by qinwen on 14-3-25.
 */
Ext.define('XTGL.view.BMGLAddWindow', {
    extend: 'Share.view.PopupWindow',
    resizable:false,
    title: "添加部门信息",
    width: 380,
    height: 236,
    border: 0,
    bodyBorder: false,
    layout: "fit",
    items:{
        xtype: "form",
        id: "bmgl_add_form",
        border: 0,
        bodyBorder: false,
        padding: "20px 0 0 20px",
        defaults:{
            width: 315
        },
        items: [
            {
                xtype: 'textfield',
                name: 'bmbh',
                allowBlank: false,
                fieldLabel: '部门编号',
                validator: function(value){
                    if(value==null||value==''){
                        return true;
                    }
                    var reg = /(^\w+$)/;
                    if(value.match(reg)==null){
                        return '部门编号由数字、字母或下划线组成';
                    }else{
                        return true;
                    }
                },
                listeners:{
                    change:function (field) {
                        var $ = function(id){
                            return document.getElementById(id);
                        }
                        $(field.getId()+"-inputEl").setAttribute("maxLength",12);
                    }
                }
            },
            {
                xtype: 'textfield',
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
                xtype: 'numberfield',
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
            id: "bmgl_add_ok"
        },{
            text: "取消",
            id: "bmgl_add_cancel"
        }
    ]
});
