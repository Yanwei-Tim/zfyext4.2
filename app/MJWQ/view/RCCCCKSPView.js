Ext.define('MJWQ.view.RCCCCKSPView', {
    extend: 'Share.view.PopupWindow',
    id: "MJWQ_BaseInfo_PopupWindow",
    title: "查看文件",
    width: 810,
    height: 640,
    resizable: false,
    layout: "border",
    windowData: null,
    defaults: {
        border: false
    },
    requires: ["MJWQ.view.RCCCKZXXView","MJWQ.view.PLAYFILEView"],
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
                    xtype:"displayfield",
                    value:'<label for="mjwq_pupowindow_xzsp">&nbsp;&nbsp;查看视频:</label>' +
                        '<select id="mjwq_pupowindow_xzsp" >' +
                        '</select>'

                },
                {
                    xtype: 'button',
                    id: 'mjwq_spxx_btn',
                    border: 0,
                    width: 102,
                    height: 41,
                    allowDepress: false,
                    toggleGroup: "mjwq_cksp_btn",
                    cls: 'navBtnSelected',
                    x: 560,
                    y: -42
                }
            ]
        },
        {
            xtype: "panel",
            id:"mjwq_cksp_west",
            region: "west",
            layout: "border",
            width: 550,
            defaults: {
                border: false
            },
            items: [
                {
                    region: "north",
                    id:'mjwq_pupowindow_bfq',
                    height: 450,
                    bodyStyle: "background:#ff0",
                    items:{
                        xtype:"PLAYFILEView"
                    }

                },
                {
                    region: "center",
                    layout: "hbox",
                    items: [
                        { xtype: 'tbfill' },
                        {
                            xtype: 'displayfield',
                            id: "mjwq_pupowindow_wjdx",
                            fieldLabel: '文件大小',
                            labelWidth:60,
                            value: '',
                            border: false,
                            margin: "10"
                        },
                        {
                            xtype: 'button',
                            id: 'mjwq_xzwj_btn',
                            border: 0,
                            width: 68,
                            height: 24,
                            margin: "10 10 0 0"
                        }
                    ]
                }

            ]
        },
        {
            xtype: "panel",
            id: 'mjwq_cksp_center',
            region: "center",
            items: [
                {
                    xtype: "form",
                    id: "mjwq_cksp_center_baseform",
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
                            margin: "15 0 5 10",
                            cls: 'mjwq_pupowindow_jbxx'
                        },
                        {
                            xtype: 'displayfield',
                            name: "capture_unit",
                            fieldLabel: '部门',
                            value: ''
                        },
                        {
                            xtype: 'displayfield',
                            name: "capture_user",
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
                    id: "mjwq_cksp_center_kzxxform"
                }
            ]
        }
    ]

});


