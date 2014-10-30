Ext.Loader.setConfig({
    enabled:true,
    disableCaching:false,
    paths:{
        'Go':'app/Share/ux/Go/'
    }
});
Ext.define('ZFJD.view.RCCCCKSPView', {
    extend: 'Share.view.PopupWindow',
    id: "RCCC_BaseInfo_PopupWindow",
    title: "查看文件",
    width: 810,
    height: 640,
    resizable: false,
    layout: "border",
    windowData: null,
    defaults: {
        border: false
    },
    requires: ["ZFJD.view.RCCCKZXXView", "ZFJD.view.PLAYFILEView","Go.form.field.DateTime"],
    items: [
        {
            xtype: "form",
            region: "north",
            cls: "navTitle",
            height: 50,
            items: [
                {
                    /*xtype: 'combo',
                     id: "rccc_pupowindow_xzsp",
                     labelStyle: "color:#fff",
                     margin: "13 0 0 10",
                     cls: "share_Combobox",
                     width: 350,
                     labelWidth: 60,
                     editable: false,
                     fieldLabel: '查看视频',
                     queryMode: 'local',
                     store: null,
                     displayField: 'name',
                     valueField: 'type',
                     value: ''*/
                    xtype: "displayfield",
                    value: '<label for="rccc_pupowindow_xzsp">&nbsp;&nbsp;查看视频:</label>' +
                        '<select id="rccc_pupowindow_xzsp" >' +
                        '</select>'

                },
                {
                    xtype: 'button',
                    id: 'zfjd_spxx_btn',
                    border: 0,
                    width: 102,
                    height: 41,
                    allowDepress: false,
                    toggleGroup: "zfjd_cksp_btn",
                    cls: 'navBtnSelected',
                    x: 560,
                    y: -42
                },
                {
                    xtype: 'button',
                    id: 'zfjd_bjxx_btn',
                    border: 0,
                    width: 102,
                    height: 41,
                    allowDepress: false,
                    toggleGroup: "zfjd_cksp_btn",
                    cls: 'navBtnSelected',
                    x: 561,
                    y: -42
                }
            ]
        },
        {
            xtype: "panel",
            id: "zfjd_cksp_west",
            region: "west",
            layout: "border",
            width: 550,
            defaults: {
                border: false
            },
            items: [
                {
                    region: "north",
                    id: 'rccc_pupowindow_bfq',
                    height: 450,
                    bodyStyle: "background:#ff0",
                    items: {
                        xtype: "PLAYFILEView"
                    }

                },
                {
                    region: "center",
                    layout: "hbox",
                    items: [
                        { xtype: 'tbfill' },
                        {
                            xtype: 'displayfield',
                            id: "rccc_pupowindow_wjdx",
                            fieldLabel: '文件大小',
                            labelWidth: 60,
                            value: '',
                            border: false,
                            margin: "10"
                        },
                        {
                            xtype: 'button',
                            id: 'zfjd_xzwj_btn',
                            border: 0,
                            width: 68,
                            height: 24,
                            hidden:(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC_SJXZ - 1) != 1),
                            margin: "10 10 0 0"
                        }
                    ]
                }

            ]
        },
        {
            xtype: "panel",
            id: 'zfjd_cksp_center',
            region: "center",
            items: [
                {
                    xtype: "panel",
                    id:'zfjd_spxx_panel',
                    border: false,
                    items: [
                        {
                            xtype: "form",
                            id: "zfjd_cksp_center_baseform",
                            defaults: {
                                margin: "0 0 0 10",
                                width: 230,
                                labelWidth: 65,
                                overflowX: "hidden"
                            },
                            border: false,
                            items: [
                                {
                                    xtype: "label",
                                    text: "基本信息",
                                    margin: "15 0 15 10",
                                    cls: 'rccc_pupowindow_jbxx'
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "capture_unit",
                                    fieldLabel: '部门',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "capture_user_name",
                                    fieldLabel: '拍摄警员',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "capture_time",
                                    fieldLabel: '文件时间',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "file_duration",
                                    fieldLabel: '文件时长',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "media_quality",
                                    fieldLabel: '视频质量',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "match_result",
                                    fieldLabel: '比对结果',
                                    value: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    name: "file_type",
                                    fieldLabel: '媒体类型',
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: "RCCCKZXXView",
                            id: "zfjd_cksp_center_kzxxform"
                        }
                    ]
                },
                {
                    xtype: "form",
                    id: "zfjd_cksp_bjxx_form",
                    defaults: {
                        margin: "5 0 0 10",
                        width: 230,
                        labelWidth: 60,
                        overflowX: "hidden",
                        xtype: "textfield"
                    },
                    border: false,
                    items: [
                        {
                            xtype: "label",
                            text: "编辑信息",
                            margin: "15 0 15 10",
                            cls: 'rccc_pupowindow_jbxx'
                        },
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            editable: false,
                            fieldLabel: '标注类型',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ["name", "type"],
                                data: [
                                    {name: "例行记录(保存3个月)", type: "00"},
                                    {name: "执法不规范(永久保存)", type: "01"},
                                    {name: "投诉不正确(永久保存)", type: "02"},
                                    {name: "投诉存疑(保存6个月)", type: "03"},
                                    {name: "执法存疑(保存6个月)", type: "04"},
                                    {name: "无效数据(优先删除)", type: "05"}
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'BZLX',
                            value: '00'
                        },
                        {
                            name: "SJLX",
                            fieldLabel: '执法类型',
                            xtype: 'combo',
                            cls: "share_Combobox",
                            editable: false,
                            queryMode: 'local',
                            store: Ext.create('ZFJD.store.SJLXStore'),
                            displayField: 'SJMC',
                            valueField: 'SJLX',
                            value: ''
                        },
                        {
                            name: "SJBH",
                            fieldLabel: '决定书号',
                            value: '',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^\w+$)/;
                                if(value.match(reg)==null){
                                    return '数据编号由数字、字母或下划线组成';
                                }else{
                                    return true;
                                }
                            },
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",32);
                                }
                            }
                        },
                        {
                            name: "CJDD",
                            fieldLabel: '采集地点',
                            value: '',
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",255);
                                }
                            }
                        },
                        {
                            name: "DSR",
                            fieldLabel: '当事人',
                            value: '',
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",32);
                                }
                            }
                        },
                        {
                            name: "HPHM",
                            fieldLabel: '号牌号码',
                            value: '',
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",32);
                                }
                            }
                        },
                        {
                            xtype: 'datetimefield',
                            name: "CJSJ",
                            fieldLabel: '采集时间',
                            editable: false,
                            format: 'Y-m-d H:i:s',
                            value: new Date(),
                            emptyText: '请选择',
                            maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1),'Y-m-d H:i:s'),
                            cls: "share_DateSelect"
                        },
                        {
                            name: "SJMS",
                            fieldLabel: '数据描述',
                            xtype     : 'textareafield',
                            grow      : true,
                            value: '',
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",255);
                                }
                            }
                        },
                        {
                            width: 70,
                            id:'zfjd_bjxx_save_btn',
                            margin: "20 10 10 10",
                            style: "float:right",
                            xtype: 'button',
                            text: '保存'
                        }
                    ]
                }
            ]
        }
    ]

});


