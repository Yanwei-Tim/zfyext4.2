/**
 * Created by qinwen on 14-3-5.
 */
Ext.define('XTGL.view.CJGZZGLStatusView', {
    extend: 'Share.view.PopupWindow',
    width: 635,
    height: 200,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    cls: 'xtgl_cjgzzgl_statuswindow',
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'panel',
            margin: "20 20 10 20",
            layout: "border",

            defaults: {
                border: false,
                xtype: "displayfield",
                labelWidth: 110,
                width: 635,
                allowBlank: false
            },
            items: [
                {
                    region: 'west',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "displayfield",
                        labelWidth: 110,
                        width: 280
                    },
                    width: 300,
                    items:[
                        {
                            name: 'cpu',
                            id: 'cjgzz_cpu',
                            fieldLabel: 'CPU'
                        },
                        {
                            name: 'total_disk',
                            id: 'cjgzz_total_disk',
                            fieldLabel: '磁盘总空间'
                        },
                        {
                            name: 'network',
                            id: 'cjgzz_network',
                            fieldLabel: '网络流量'
                        },
                        {
                            name: 'last_alive_time',
                            id: 'cjgzz_last_alive_time',
                            fieldLabel: '上次心跳时间'
                        }
                    ]
                },{
                    region: 'center',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "displayfield",
                        labelWidth: 110,
                        width: 280
                    },
                    width: 300,
                    items:[
                        {
                            name: 'ram',
                            id: 'cjgzz_ram',
                            fieldLabel: '内存'
                        },
                        {
                            name: 'used_disk',
                            id: 'cjgzz_used_disk',
                            fieldLabel: '已用空间'
                        },
                        {
                            name: 'last_syn_time',
                            id: 'cjgzz_last_syn_time',
                            fieldLabel: '上次同步时间'
                        }
                    ]

                }


            ]

        }
    ]
});
