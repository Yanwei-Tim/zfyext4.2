/**
 * Created by qinwen on 14-3-5.
 */
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'app/Share/ux');
Ext.require([
    'Ext.form.Panel',
    'Ext.ux.form.ItemSelector',
    'Ext.tip.QuickTipManager',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

Ext.define('XTGL.view.ZXWJGLAssignView', {
    extend: 'Share.view.PopupWindow',
    width: 702,
    height: 428,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    autoScroll: true,
    cls: 'xtgl_zxwjgl_statuswindow',
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'form',
            id: 'xtgl_zxwjgl_assign_form',
            margin: "20 20 10 20",
            layout: "border",
            defaults: {
                border: false,
                xtype: "displayfield",
                labelWidth: 120,
                width: 650,
                allowBlank: false
            },
            items: [
                {
                    region: 'north',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "displayfield",
                        labelWidth: 80,
                        width: 650
                    },
                    width: 650,
                    items: [
                        {
                            name: 'sid',
                            id: 'zxwj_assign_name',
                            fieldLabel: '服务器编号'
                        }/*,
                        {
                            xtype: 'textfield',
                            readOnly:true,
                            name: 'wsname',
                            id: 'zxwj_assign_wsname',
                            fieldLabel: '已分配工作站名'
                        }*/
                    ]
                },
                {
                    region: 'center',
                    layout: 'border',
                    xtype: 'panel',
                    width: 700,  //Ext.create('XTGL.view.ZXWJGLAssignDnDView')
                    items:Ext.widget('form', {
                        width: 650,
                        bodyPadding: 10,
                        height: 280,
                        layout: 'fit',
                        border: 0,
                        items:[{
                            xtype: 'itemselector',
                            buttons: ['add', 'remove'],
                            name: 'itemselector',
                            id: 'zxwj_itemselector-field',
                            anchor: '100%',
                            imagePath: 'app/XTGL/resource/imgs/',
                            store: Ext.create('XTGL.store.ZXWJGLAssignStore'), //存放的是所有工作站的列表
                            displayField: 'sidname',
                            valueField: 'sid',
                            //value: ["hc_test_sid_1","hc_test_sid_4","hc_test_sid_5","hc_test_sid_6"],
                            //allowBlank: false,
                            msgTarget: 'side',
                            fromTitle: '未分配到本服务器的工作站',
                            toTitle: '已分配到本服务器的工作站'
                        }]
                    })
                },
                {
                    region: 'south',
                    xtype: 'panel',
                    border: false,
                    width: 650,
                    html: "<div style='color: red'>（注：  请拖动、双击或者选中按->实现工作站分配到本服务器）</div>"
                }


            ],
            buttons: ['->', {
                id: 'xtgl_zxwjgl_assign_btn',
                text: '保存'
            }]

        }
    ]
});
