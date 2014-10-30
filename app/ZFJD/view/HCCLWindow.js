Ext.define('ZFJD.view.HCCLWindow', {
    extend: 'Share.view.PopupWindow',
    resizable:false,
    title: "核查处理",
    width: 448,
    height: 380,
    border: 0,
    bodyBorder: false,
    layout: "fit",
    items:[
        {
            xtype: "form",
            border: 0,
            bodyBorder: false,
            layout: "absolute",
            items: [
                {
                    xtype: "label",
                    text: "核查情况",
                    x: 11,
                    y: 15
                },{
                    xtype: "radiofield",
                    id:"zfjd_ycjd_hccl_qkss",
                    boxLabel  : '情况属实',
                    name      : 'HCQK',
                    inputValue: '1',
                    x: 30,
                    y: 37
                },{
                    xtype: "radiofield",
                    id:"zfjd_ycjd_hccl_qkpc",
                    boxLabel  : '情况排除',
                    name      : 'HCQK',
                    inputValue: '2',
                    x: 30 + 97,
                    y: 37
                },{
                    xtype: "radiofield",
                    id:"zfjd_ycjd_hccl_qtyy",
                    boxLabel  : '其他原因',
                    name      : 'HCQK',
                    inputValue: '3',
                    x: 30 + 97 + 97,
                    y: 37
                },{
                    xtype: "label",
                    text: "核查评论",
                    x: 11,
                    y: 68
                },{
                    xtype: "textarea",
                    id:"zfjd_ycjd_hccl_hcpl",
                    x: 11,
                    y: 88,
                    width: 413,
                    height: 219
                },{
                    xtype: "button",
                    id:"zfjd_ycjd_hccl_save",
                    text: "保存",
                    x: 11 + 413 - 45,
                    y: 88 + 219 + 4,
                    width: 47,
                    height: 23
                }
            ]
        }
    ]
});