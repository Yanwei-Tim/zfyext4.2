Ext.define('XTGL.view.YHGLSCOPEView', {
    extend: 'Share.view.PopupWindow',
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    items: [
        {
            xtype: 'form',

         // margin: "20 20 10 20",
            layout: "fit",
            items: [
                Ext.create("XTGL.view.YHGLCKTREEView", {
                    border:false,
                    id: 'xtgl_yhgl_cktree'
                })
            ],
            buttons: ['->', {
                action:'save',
                text: '保存'
            }]
        }
    ]

})


