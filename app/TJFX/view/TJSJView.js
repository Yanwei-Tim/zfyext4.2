/*
 * Created by hcxowe on 14-2-11.
 */
Ext.define('TJFX.view.TJSJView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults:
    {
        collapsible:    false,
        split:          false,
        bodyPadding:    0,
        border:         0
    },
    requires: ['Share.view.EditGrid'],
    layout:   'border',
    items:
    [
        {
            region: 'north',
            xtype:  'panel',
            items:
            [
                {
                    xtype:  'form',
                    cls:    'conditionPanel',
                    layout: 'hbox',
                    id:     'tjfx_tjsj_search_form',
                    height: 42,
                    border: 0,
                    bodyBorder: false,


                    defaults:
                    {
                        labelStyle: 'font-weight:bold',
                        margin:     '0 10 0 0'
                    },
                    items:
                    [
                        {
                            xtype:  'label',
                            cls:    'condition_label',
                            text:   '单位：'

                        },
                        Ext.create('Share.view.TreeCombo', {
                            id: 'tjfx_tjsj_org',
                            editable:false
                        }),
                        {
                            xtype:      'datefield',
                            width:      160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            format:     'Y-m-d',
                            editable:   false,
                            id:         'TJSJfromDate',
                            value:      new Date(),
                            emptyText:  '请选择',
                            cls:        "share_DateSelect",
                            name:       'start_date',
                            vtype:      'daterange',
                            toDateId:   'TJSJtoDate'
                        },
                        {
                            xtype:      'datefield',
                            width:      135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            format:     'Y-m-d',
                            editable:   false,
                            labelSeparator: '',
                            id:         'TJSJtoDate',
                            name:       'end_date',
                            emptyText:  '请选择',
                            cls:        "share_DateSelect",
                            value:      new Date(),
                            vtype:      'daterange',
                            fromDateId: 'TJSJfromDate'

                        },
                        {
                            xtype:  'button',
                            id:     'tjfx_tjsj_search_btn',
                            width:  70,
                            text:   '查询',
                            margin: '0 0 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype:  'panel',
            layout: 'fit',
            items:
            [
                {
                    xtype:      'editgrid',
                    editable:   false,
                    id:         'tjfx_tjsj_grid',
                    store:      Ext.create('TJFX.store.TJSJStore'),
                    columns:
                    [
                        {
                            header:     '序号',
                            align:      'center',
                            dataIndex:  'OBJMC',
                            menuDisabled: true,
                            width:      80,
                            minWidth:   60,
                            xtype:      'rownumberer'
                        },
                        {
                            header:     '部门/警员名称',
                            align:      'center',
                            dataIndex:  'OBJMC',
                            menuDisabled: true,
                            width:      120,
                            minWidth:   100
                        },
                        {
                            header:     '工作站个数(个)',
                            align:      'center',
                            id:         'GZZColumn',
                            dataIndex:  'workstation_count',
                            menuDisabled: true,
                            width:      150,
                            minWidth:   130,
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;

                                if(!bottom1org && !bottom2org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom2org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth == 1)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 2) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '警员个数(个)',
                            dataIndex:  'user_count',
                            id:         'JYColumn',
                            align:      'center',
                            menuDisabled: true,
                            width:      140,
                            minWidth:   120,
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org && !bottom2org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom2org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth == 1)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 2) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '执法仪个数(个)',
                            align:      'center',
                            id:         'ZFYColumn',
                            dataIndex:  'device_count',
                            menuDisabled: true,
                            width:      150,
                            minWidth:   130,
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org && !bottom2org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom2org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth == 1)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 2) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '异常总数(次)',
                            align:      'center',
                            dataIndex:  'YCZS',
                            menuDisabled: true,
                            width:      140,
                            minWidth:   120,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '摄像时长低于90%(次)',
                            align:      'center',
                            dataIndex:  'KQYC',
                            menuDisabled: true,
                            width:      200,
                            minWidth:   180,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";
*/
                                return value;
                            }
                        },
                        {
                            header:     '执法无视频(次)',
                            align:      'center',
                            dataIndex:  'ZFWSP',
                            menuDisabled: true,
                            width:      150,
                            minWidth:   130,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '十分钟内连续开单三起以上(次)',
                            align:      'center',
                            dataIndex:  'OVER3',
                            menuDisabled: true,
                            width:      250,
                            minWidth:   220,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '执法数(次)',
                            align:      'center',
                            dataIndex:  'CFSL',
                            menuDisabled: true,
                            width:      120,
                            minWidth:   100,
                            flex:       1,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '执法有视频数(次)',
                            align:      'center',
                            dataIndex:  'ZFYSPS',
                            menuDisabled: true,
                            width:      180,
                            minWidth:   160,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '视频总数(个)',
                            align:      'center',
                            dataIndex:  'SPGS',
                            menuDisabled: true,
                            width:      140,
                            minWidth:   120,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '视频总时长(小时)',
                            align:      'center',
                            dataIndex:  'SPSC',
                            menuDisabled: true,
                            width:      160,
                            minWidth:   140,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '高清视频数(个)',
                            align:      'center',
                            dataIndex:  'HSPGS',
                            menuDisabled: true,
                            width:      150,
                            minWidth:   130,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '高清视频总时长(小时)',
                            align:      'center',
                            dataIndex:  'HSPSC',
                            menuDisabled: true,
                            width:      200,
                            minWidth:   190,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '普清视频数(个)',
                            align:      'center',
                            dataIndex:  'LSPGS',
                            menuDisabled: true,
                            width:      150,
                            minWidth:   130,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '普清视频总时长(小时)',
                            align:      'center',
                            dataIndex:  'LSPSC',
                            menuDisabled: true,
                            width:      180,
                            minWidth:   170,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        },
                        {
                            header:     '对比成功视频数(个)',
                            align:      'center',
                            dataIndex:  'BDSL',
                            menuDisabled: true,
                            width:      170,
                            minWidth:   160,
                            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                            renderer:function(value,meta,record,rowindex)
                            {
                                var bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
                                var bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;
                                if(!bottom1org)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((bottom1org) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                /*var depth = Ext.getCmp('tjfx_tjsj_org').org_val.get("depth");
                                if(depth <= 2)
                                    return "<div style='cursor: pointer'>"+ value +"</div>";

                                if((depth == 3) && (rowindex == 0))
                                    return "<div style='cursor: pointer'>"+ value +"</div>";*/

                                return value;
                            }
                        }
                    ]

                }
            ]
        }
    ],

    initComponent: function ()
    {
        Ext.apply(Ext.form.VTypes,
            {
            daterange: function (val, field)
                {
                if (field.fromDateId)
                    {
                    if (Ext.getCmp(field.fromDateId).rawValue > val)
                        {
                        return false;
                        }
                    };

                if (field.toDateId)
                    {
                    if (Ext.getCmp(field.toDateId).rawValue < val)
                        {
                        return false;
                        }
                    };

                return true;
                },

            daterangeText: '开始时间不能大于结束时间'
            });

        this.callParent(arguments);
    }

});


