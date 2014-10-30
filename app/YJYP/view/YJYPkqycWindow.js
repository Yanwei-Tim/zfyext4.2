/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPkqycWindow',{
    extend: 'Share.view.PopupWindow',
    title: '摄录时长低于90％',
    width: 805,
    height: 440,
   // draggable: false, //弹窗不可拖动
    resizable: false,  //弹窗不可拉伸
    id: "yjyp_yjyp_kqyc_window",
    border:0,
    windowData: null,
    items: [
        {
            region: 'north',
            border:0,
            cls: "navTitle",
            height: 49,
            layout: 'absolute',
            defaults: {
                border:0,
                width:102,
                height: 41,
                allowDepress: false,
                toggleGroup: "yjyp_kqyc_nav_btn"
            },
            items:[{
                xtype: 'button',
                id: 'yjyp_yjyp_kqyc_zhou_btn',
                cls: 'navBtnSelected',
                x: 11,
                y: 11
            }, {
                xtype: 'button',
                id: 'yjyp_yjyp_kqyc_yue_btn',
                cls: 'navBtnUnSelected',
                x: 11 + 102 + 1,
                y: 11
            }, {
                xtype: 'button',
                    id: 'yjyp_yjyp_kqyc_nian_btn',
                    cls: 'navBtnUnSelected',
                    x: 11 + 102 + 102 + 1,
                    y: 11
            }, {
                xtype: 'button',
                id: 'yjyp_yjyp_kqyc_qu_btn',
                cls: 'navBtnUnSelected',
                x: 11 + 102 + 102 + 102 + 1,
                y: 11
            }, {
                xtype: 'button',
                id: 'yjyp_yjyp_kqyc_msg_btn',
                cls: 'navBtnUnSelected',
                x: 11 + 102 + 102 + 102 + 102 + 1,
                y: 11
            }
            ]
        },{
            xtype: "panel",
            region: 'center',
            margins: '10 10 10 15',
            border: 0,
            id: 'yjyp_kqyc_center',
            layout: 'fit'
        }
    ]
});