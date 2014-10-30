/**
 * Created by kinkoo on 14-3-5.
 */
Ext.define('XTGL.view.JSGLADDView',{
    extend: 'Share.view.PopupWindow',
    width:      400,
    height:     240,
    minHeight:  240,
    minWidth:   400,
    hidden:     false,
    maximizable:false,
    title:      '添加角色',
    autoShow:   false,
    layout:     'fit',
    resizable:  false,
    items:
    {
        xtype:          "panel",
        title:          "",
        //width:          400,
        //height:         200,
        unstyled:       false,
        animCollapse:   true,
        layout:         "absolute",
        items:[
            {
                xtype:  "label",
                text:   "角色名称:",
                x:40,
                y:70
            },
            {
                xtype:  "textfield",
                id:     'jsgl_add_Edit',
                //anchor: "80%",
                width:   200,
                allowBlank: false,
                enableKeyEvents: true,
                maxLength: 32,
                x:100,
                y:67
            },
            {
                xtype:  "button",
                text:   "确  定",
                id:     'jsgl_add_OKBtn',
                width:  80,
                x:100,
                y:120
            },
            {
                xtype:  "button",
                text:   "取  消",
                id:     'jsgl_add_CancelBtn',
                width:  80,
                x:      220,
                y:      120
            }
        ]

    }
});