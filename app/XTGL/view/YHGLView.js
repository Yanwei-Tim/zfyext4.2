/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.YHGLView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid', 'XTGL.view.YHGLTree', 'XTGL.view.YHGLPageGrid'],
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'panel',
                    cls: 'conditionPanel',
                    height: 42,
                    border: 0,
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults: {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id:"xtgl_yhgl_adduser",
                            text: '添加新用户',
                            margin: '0 0 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'panel',
            layout: 'border',

            items: [
                {
                    region: 'west',
                    xtype: 'xtgl_yhgl_tree',
                    id: 'xtgl_yhgl_tree',
                    title:'架构',
                    cls: 'xtgl_yhgl_tree',
                    layout: 'fit',
                    width: 280
                },
                {
                    region: 'center',
                    xtype:"xtgl_yhgl_rightgrid",
                    id:'xtgl_yhgl_rightgrid',
                    layout: 'fit'
                   // minWidth : 800
                }
            ]

        }
    ]




});


