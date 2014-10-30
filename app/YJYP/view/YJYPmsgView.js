/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPmsgView', {
    extend: 'Ext.container.Container',
    title: '摄录时长低于90％',
    width: 805,
    height: 350,
    // draggable: false, //弹窗不可拖动
    resizable: false,  //弹窗不可拉伸
    id: "yjyp_yjyp_xxxxmsg",
    border:0,
    windowData: null,
    layout: 'border',
    items: [{
            xtype: "panel",
            region: 'center',
            border: 0,
            id: 'yjyp_xxxxmsg_center',
            layout: 'fit'
        }
    ]
});