Ext.define('XTGL.view.ZFJLYGLAssignView', {
    extend: 'Share.view.PopupWindow',
    width: 340,
    height: 190,
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
                    name: 'dev_name',
                    fieldLabel: '设备名称',
                    allowBlank: false  // requires a non-empty value

                },
                {
                    fieldLabel:"所属机构",
                    xtype: 'TreeCombo',
                    editable:false
                }

            ],
            buttons: ['->', {
                text: '确定'
            }]

        }
    ]

});


