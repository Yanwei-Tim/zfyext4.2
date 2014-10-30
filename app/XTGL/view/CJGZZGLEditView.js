Ext.define('XTGL.view.CJGZZGLEditView', {
    extend: 'Share.view.PopupWindow',
    width: 350,
    height: 345,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    cls: 'xtgl_cjgzzgl_editwindow',
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'form',
            id: 'xtgl_cjgzzgl_edit_form',
            margin: "20 20 10 20",
            layout: "border",
            defaults: {
                border: false,
                xtype: "textfield",
                labelWidth: 80,
                width: 350,
                allowBlank: false
            },
            items: [
                {
                    region: 'center',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "textfield",
                        labelWidth: 80,
                        width: 294
                    },
                    width: 320,
                    items:[
                        {
                            xtype: 'displayfield',
                            name: 'sid',
                            id: 'cjgzzgl_edit_sid',
                            fieldLabel: '编号(*)'

                        },
                        {
                            name: 'name',
                            id: 'cjgzzgl_edit_name',
                            fieldLabel: '名称(*)',
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
                            fieldLabel:"所属单位(*)",
                            xtype: 'TreeCombo',
                            editable:false

                        },
                        {
                            name: 'ip',
                            id: 'cjgzzgl_edit_ip',
                            fieldLabel: '主机地址(*)',
                            allowBlank: false,
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",50);
                                }
                            }/*,
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(\d+\.\d+\.\d+\.\d+)/;
                                if(value.match(reg)==null){
                                    return '请输入正确的IP格式';
                                }else{
                                    return true;
                                }
                            }*/

                        },
                        {
                            name: 'admin',
                            id: 'cjgzzgl_edit_admin',
                            fieldLabel: '负责人',
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
                            name: 'phone',
                            id: 'cjgzzgl_edit_phone',
                            fieldLabel: '联系电话',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^[0-9\-]{3,18}$)/;
                                if(value.match(reg)==null){
                                    return '只能是数字或者-，并且字数为3~18位';
                                }else{
                                    return true;
                                }
                            }
                        },
                        {
                            name: 'address',
                            id: 'cjgzzgl_edit_address',
                            fieldLabel: '工作站地址',
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
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",30);
                                }
                            }

                        },
                        {
                            name: 'service_phone',
                            id: 'cjgzzgl_edit_service_phone',
                            fieldLabel: '服务电话',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^[0-9\-]{3,18}$)/;
                                if(value.match(reg)==null){
                                    return '只能是数字或者-，并且字数为3~18位';
                                }else{
                                    return true;
                                }
                            }
                        }

                    ]
                }
            ],
            buttons: ['->', {
                id: 'xtgl_cjgzzgl_editsave_btn',
                text: '保存'
            }]

        }
    ]

});


