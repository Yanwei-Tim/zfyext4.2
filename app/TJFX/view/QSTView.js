/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('TJFX.view.QSTView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },

    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    cls: 'conditionPanel',
                    id: 'tjfx_qst_search_form',
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
                            xtype: 'label',
                            cls: 'condition_label',
                            text: '单位：'

                        },
                        Ext.create('Share.view.TreeCombo', {
                            id: 'tjfx_qst_org',
                            editable:false
                        }),
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            format: 'Y-m-d',
                            editable: false,
                            id: 'qstfromDate',
                            value: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'qsttoDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            format: 'Y-m-d',
                            editable: false,
                            labelSeparator: '',
                            id: 'qsttoDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'qstfromDate'

                        },
                        {
                            xtype: 'button',
                            id: 'tjfx_qst_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'panel',
            id: 'qst_boby_panel',
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'panel',
                    width: 300,
                    border: 0,

                    layout: {
                        type: 'vbox',
                        defaultMargins: {left: 10},
                        padding: 10
                    },

                    //defaultType: 'radiofield',

                    items: [
                        {
                            name: 'count',
                            id: 'qst_YCZS',
                            inputValue: 'YCZS',
                            checked: true,
                            boxLabel: '异常次数',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_KQYC',
                            inputValue: 'KQYC',
                            boxLabel: '摄像时长低于90%(次)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_ZFWSP',
                            inputValue: 'ZFWSP',
                            boxLabel: '执法无视频(次)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_OVER3',
                            inputValue: 'OVER3',
                            boxLabel: '十分钟内连续开单三起以上(次)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_CFSL',
                            inputValue: 'CFSL',
                            boxLabel: '执法数(次)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_ZFYSPS',
                            inputValue: 'ZFYSPS',
                            boxLabel: '执法有视频数(次)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_SPGS',
                            inputValue: 'SPGS',
                            boxLabel: '视频总数(个)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_SPSC',
                            inputValue: 'SPSC',
                            boxLabel: '视频总时长(小时)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_HSPGS',
                            inputValue: 'HSPGS',
                            boxLabel: '高清视频数(个)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_HSPSC',
                            inputValue: 'HSPSC',
                            boxLabel: '高清视频总时长(小时)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_LSPGS',
                            inputValue: 'LSPGS',
                            boxLabel: '普清视频数(个)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_LSPSC',
                            inputValue: 'LSPSC',
                            boxLabel: '普清视频总时长(小时)',
                            xtype: 'radio'
                        },
                        {
                            name: 'count',
                            id: 'qst_BDSL',
                            inputValue: 'BDSL',
                            boxLabel: '对比成功视频数(个)',
                            xtype: 'radio'
                        }

                    ]
                },
                {
                    region: 'center',
                    xtype: 'chart',
                    id: 'tjfx_qst_chart',
                    animate: true,
                    shadow: true,
                    store: Ext.create('TJFX.store.QSTStore'),
                    axes: [
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: 'YCZS',

                            minimum: 0,
                            minorTickSteps: 1,
                            grid: {
                                odd: {
                                    opacity: 1,
                                    fill: '#ddd',
                                    stroke: '#bbb',
                                    'stroke-width': 0.5
                                }
                            }
                        },
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['DATE'],
                            minorTickSteps: 10,
                            label: {
                               // font: '微软雅黑',
                                rotate: {
                                    degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                                }
                            }
                        }
                    ],

                    background: {
                        gradient: {
                            id: 'backgroundGradient',
                            angle: 45,
                            stops: {
                                0: {
                                    color: '#ffffff'
                                },
                                100: {
                                    color: '#eaf1f8'
                                }
                            }
                        }
                    },
                    series:
                    [
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'YCZS',

                            highlight: {
                                size: 7,
                                radius: 7
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            },

                            tips:
                            {
                                trackMouse: false,
                                width: 580,
                                height: 340,
                                id:     'qst_tip_panel',
                                layout: 'fit',
                                items:
                                [
                                    {
                                    xtype: 'container',
                                    layout: 'fit',
                                    items:
                                    [
                                        {
                                            xtype: 'chart',
                                            id: 'tjfx_qstTip_chart',
                                            animate: true,
                                            shadow: true,
                                            store: Ext.create('TJFX.store.QSTStore'),
                                            //store: Ext.create('Ext.data.Store'),

                                            axes:
                                            [
                                                {
                                                    type: 'Numeric',
                                                    position: 'left',
                                                    fields: 'tipvalue',

                                                    minimum: 0,
                                                    minorTickSteps: 1,
                                                    grid: {
                                                        odd: {
                                                            opacity: 1,
                                                            fill: '#ddd',
                                                            stroke: '#bbb',
                                                            'stroke-width': 0.5
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Category',
                                                    position: 'bottom',
                                                    fields: 'DATE',
                                                    minorTickSteps: 10,
                                                    label: {
                                                        rotate: {
                                                            degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                                                        }
                                                    }
                                                }
                                            ],
                                            series:
                                            [
                                                {
                                                    type: 'line',
                                                    axis: 'left',
                                                    xField: 'DATE',
                                                    yField: 'tipvalue',

                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },

                                                    markerConfig:
                                                    {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                    }
                                ],
                                renderer: function (klass, item)
                                {
                                    var storeItem = item.storeItem;

                                    var data = [];
                                    for(var i=0; i<12; ++i)
                                    {
                                        var tipdate  = "TipDate" + i;
                                        var tipdata  = "Tipdata" + i;
                                        var datestr  = storeItem.get(tipdate);
                                        if(datestr.length == 0)
                                        {
                                            if(i <= 1)
                                            {
                                            this.width  = 100;
                                            this.height = 22;

                                            this.setTitle(item.value[1].toString());

                                            //this.hide();
                                            return;
                                            }

                                            break;
                                        }

                                        data[i] = {};
                                        data[i].DATE     = storeItem.get(tipdate);
                                        data[i].tipvalue = storeItem.get(tipdata);
                                    }

                                    this.setTitle("详细信息-日期:" + storeItem.get('DATE'));
                                    this.width  = 580;
                                    this.height = 340;
                                    var Tipstore = Ext.getCmp("tjfx_qstTip_chart").getStore();
                                    Tipstore.loadData(data);
                                    return;
                                }
                            }
                        }
                    ]
                }

            ]

        }
    ],
    initComponent: function () {
        Ext.apply(Ext.form.VTypes, {
            daterange: function (val, field) {
                if (field.fromDateId) {
                    if (Ext.getCmp(field.fromDateId).rawValue > val) {
                        return false;
                    }
                }
                ;
                if (field.toDateId) {
                    if (Ext.getCmp(field.toDateId).rawValue < val) {
                        return false;
                    }
                }
                ;
                return true;
            },
            daterangeText: '开始时间不能大于结束时间'
        });
        this.callParent(arguments);
    }

});


