/**
 * Created by hcxowe on 14-3-4.
 */

Ext.define('XTGL.view.JSGLView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults:
    {
        collapsible:    false,
        split:          false,
        bodyPadding:    0,
        border:         0
    },

    requires: ['Share.view.EditGrid', 'Share.view.ActionTextColumn'],
    layout:   'border',
    items:
    [
        {
            region: 'north',
            xtype: 'panel',


            border: false,
            items:
            [
                {
                    xtype: 'panel',
                    height: 42,
                    border: 0,
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults:
                    {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items:
                    [
                        {
                            xtype: 'button',
                            id:"xtgl_jsgl_add1",
                            width: 102,
                            text: '添加',
                            margin: '9 0 0 14'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype:  'panel',
            id:     'xtgl_jsgl_mainpaenl',
            layout: 'border',

            items:
            [
                {
                    region: 'west',
                    xtype:  'panel',
                    id:     'xtgl_jsgl_jslb',
                    cls:    'xtgl_jsgl_tree',
                    header: false,
                    border: 0,
                    layout: 'fit',
                    width:  282,
                    items:
                    [
                        {
                            xtype:      'editgrid',
                            editable:   false,
                            autoShow:   true,
                            page:       0,
                            singleSelect: true,
                            id:         'xtgl_jsgl_grid',
                            store:      Ext.create('XTGL.store.JSGLJSLBStore'),
                            columns:
                            [
                                {
                                    menuDisabled:   true,
                                    align:          'left',
                                    text:           '角色列表',
                                    sortable:       false,
                                    dataIndex:      'name',
                                    //fixed:          true,
                                    width:          150,
                                    renderer: function (value, meta, record)
                                    {
                                        var max = 15;
                                        meta.tdAttr = 'data-qtip="' + value + '"';
                                        return value.length < max ? value : value.substring(0, max - 3) + '...';
                                    }
                                },
                                {
                                    menuDisabled:   true,
                                    align:          'right',
                                    fixed:          true,
                                    sortable:       false,
                                    dataIndex:      'operate',
                                    width:          130,
                                    xtype:          'actiontextcolumn',
                                    items:
                                    [
                                        /*{
                                            text: '组成员  ',
                                            tooltip: '组成员',
                                            cls: 'actionText',
                                            handler: function (obj, rowIndex, colIndex)
                                            {
                                                this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "show");
                                            }
                                        },*/
                                        {
                                            text: '编辑  ',
                                            tooltip: '编辑',
                                            cls: 'actionText',
                                            handler: function (grid, rowIndex, colIndex)
                                            {
                                               this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "edit");
                                            }
                                        },
                                        {
                                            text: '删除  ',
                                            tooltip: '删除',
                                            //cls: 'actionText',
                                            getClass: function (v, meta, record)
                                            {
                                                var id = record.data.sid;

                                                if(("0000-0000-0000-0000-0000" != id) && ("1111-1111-1111-1111-1111" != id) && ("2222-2222-2222-2222-2222" != id))
                                                    return "actionText";

                                                record.disableSave = true;
                                                return "disablePlay";
                                            },
                                            handler: function (grid, rowIndex, colIndex)
                                            {
                                                var store = grid.getStore();
                                                var record = store.getAt(rowIndex);
                                                if (true == record.disableSave)
                                                    return;

                                               this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "delete");
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region:     'center',
                    xtype:      'panel',
                    //xtype:      'form',
                    id:         'xtgl_jsgl_qxsz',
                    header:     false,

                    layout:     'border',
                    border:     0,
                    backgroundcolor: '#236fa1',
                    items:
                    [
                        {
                            region: 'north',
                            xtype:  'panel',
                            id:     'panel_qxsz_title',
                            height: 30,
                            //bold:   false,
                            title: '权限设置'
                            //border: 0
                        },
                        {
                            region: 'center',
                            xtype:  "panel",
                            id:     'jsgl_qxsz_panel',
                            layout: 'fit'
                        }
                    ]
                }
            ]

        }
    ]
})


