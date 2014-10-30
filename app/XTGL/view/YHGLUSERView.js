Ext.define('XTGL.view.YHGLUSERView', {
    extend: 'Share.view.PopupWindow',
    width: 340,
    height: 330,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'form',
            margin: "20 20 10 20",
            layout: "vbox",
            defaults: {
                border: false,
                xtype: "textfield",
                labelWidth: 60,
                width: 280,
                allowBlank: false
            },
            items: [
                {
                    name: 'police_id',
                    fieldLabel: '用户警号',
                    //vtype:"alphanum",
                    //stripCharsRe: /(^\s+|\s+$)/g,
                   // stripCharsRe: /(^\d+|\s+$)/g,
                    allowBlank: false,
                    validator: function(value){
                        if(value==null||value==''){
                            return true;
                        }
                        var reg = /(^\w+$)/;
                        if(value.match(reg)==null){
                            return '用户编号由数字、字母或下划线组成';
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
                    name: 'name',
                    fieldLabel: '用户姓名',
                    //vtype:"trimBlank",
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
                    name: 'gender',
                    fieldLabel: '性别',
                    xtype:'combo',
                    emptyText:'请选择',
                    displayField: 'name',
                    valueField: 'type',
                    editable:false,
                    store:Ext.create("XTGL.store.SEXStore"),
                    allowBlank: false  // requires a non-empty value

                },
                {
                    name: 'position',
                    fieldLabel: '职位',
                    //vtype:"trimBlank",
                    //stripCharsRe: /(^\s+|\s+$)/g,
                    allowBlank: true,
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
                    fieldLabel:"所属机构",
                    xtype: 'TreeCombo',
                    name:"dep_code",
                    editable:false
                },

                {
                    name: 'role_sid',
                    xtype:'combo',
                    store:Ext.create("XTGL.store.ROLEStore"),
                    displayField: 'name',
                    valueField: 'sid',
                    fieldLabel: '角色',
                    editable:false,
                    emptyText:'请选择',
                    allowBlank: false  // requires a non-empty value

                },
                {
                    name: 'type',
                    xtype:'combo',
                    store:Ext.create("XTGL.store.TYPEStore"),
                    displayField: 'name',
                    valueField: 'type',
                    fieldLabel: '用户类型',
                    editable:false,
                    emptyText:'请选择',
                    allowBlank: false  // requires a non-empty value

                }

            ],
            buttons: ['->', {
                action:'save',
                text: '保存'
            }]

        }
    ]

});


