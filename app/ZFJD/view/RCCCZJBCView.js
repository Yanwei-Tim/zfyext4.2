Ext.define('ZFJD.view.RCCCZJBCView', {
    extend: 'Share.view.PopupWindow',
    id: "RCCC_zjbc_PopupWindow",
    title: "证据保存",
    width: 300,
    height: 150,
    resizable: false,
    layout: "fit",
    defaults: {
        border: false
    },
    items: [
        {
            xtype: "form",
            layout: "vbox",
            id: "zfjd_zjbc_form",
            items: [
                {
                    margin:"25 50",
                    xtype: 'combo',
                    cls: "share_Combobox",
                    width: 155,
                    labelWidth: 60,
                    editable: false,
                    fieldLabel: '保存时间',
                    queryMode: 'local',
                    store: Ext.create('ZFJD.store.BCSJStore'),
                    displayField: 'name',
                    valueField: 'type',
                    name: 'type',
                    value: 1
                }
            ],
            buttons: ['->', {
                id: 'zjbc_bc',
                text: '保存'
            }]

        }
    ]

});


