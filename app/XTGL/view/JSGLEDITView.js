/**
 * Created by kinkoo on 14-3-5.
 */
Ext.define('XTGL.view.JSGLEDITView',{
    extend: 'Share.view.PopupWindow',
    width:      400,
    height:     240,
    minHeight:  240,
    minWidth:   400,
    hidden:     false,
    maximizable:false,
    title:      '编辑角色',
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
                    id:     'jsgl_edit_Edit',
                    //anchor: "80%",
                    enableKeyEvents: true,
                    allowBlank: false,
                    maxLength: 32,
                    width:   200,
                    x:100,
                    y:67
                },
                {
                    xtype:  "button",
                    text:   "确  定",
                    id:     'jsgl_edit_OKBtn',
                    width:  80,
                    x:100,
                    y:120
                },
                {
                    xtype:  "button",
                    text:   "取  消",
                    id:     'jsgl_edit_CancelBtn',
                    width:  80,
                    x:      220,
                    y:      120
                }
            ]

    }
});