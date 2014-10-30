Ext.define('XTGL.view.ZXWJGLAddView', {
    extend: 'Share.view.PopupWindow',
    width: 335,
    height: 300,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    cls: 'xtgl_zxwjgl_addwindow',
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'form',
            id: 'xtgl_zxwjgl_add_form',
            margin: "20 20 10 20",
            layout: "border",
            defaults: {
                border: false,
                xtype: "textfield",
                labelWidth: 130,
                width: 335
            },
            items: [
                {
                    region: 'center',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "textfield",
                        labelWidth: 130,
                        width: 280
                    },
                    width: 300,
                    items:[
                        {
                            name: 'sid',
                            id: 'zxwj_add_sid',
                            fieldLabel: '编号(*)',
                            allowBlank: false,
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^\w+$)/;
                                if(value.match(reg)==null){
                                    return 'SID由数字、字母或下划线组成';
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
                            name: 'name',
                            id: 'zxwj_add_name',
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
                            name: 'ip',
                            id: 'zxwj_add_ip',
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
                        Ext.create('Ext.form.Panel', {
                            border: 0,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [{
                                format:"H:i:s",
                                labelWidth:130,
                                width:280,
                                xtype: 'timefield',
                                id: 'zxwj_add_worktime_begin',
                                name: 'worktime_begin',
                                //editable:false,//设置为false阻止直接在表单项的文本框中输入字符；
                                fieldLabel: '工作开始时间',
                                value: '00:00:00',
                                minValue: '6:00 AM',
                                maxValue: '12:00 PM',
                                increment: 30
                            }, {
                                labelWidth:130,
                                width:280,
                                format:"H:i:s",
                                xtype: 'timefield',
                                name: 'worktime_end',
                                //editable:false,//设置为false阻止直接在表单项的文本框中输入字符；
                                id: 'zxwj_add_worktime_end',
                                fieldLabel: '工作结束时间:',
                                value: '00:00:00',
                                minValue: '6:00 AM',
                                maxValue: '12:00 PM',
                                increment: 30
                            }]
                        }),
                        {
                            xtype: 'numberfield',
                            value: 0,
                            minValue: 0,
                            maxValue: 100,
                            name: 'max_speed',
                            id: 'zxwj_add_max_speed',
                            fieldLabel: '最大传输速度(MB/S)',
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
                }
            ],
            buttons: ['->', {
                id: 'xtgl_zxwjgl_addsave_btn',
                text: '保存'
            }]

        }
    ]

});


