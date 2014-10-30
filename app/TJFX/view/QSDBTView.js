/**
 * Created by hcxowe on 14-2-11.
 */

/**
 * ovrride 'Ext.chart.LegendItem'
 */

Ext.override(Ext.chart.LegendItem, {
    updatePosition: function (relativeTo) {
        var me = this, items = me.items, ln = items.length, i = 0, item;
        if (!relativeTo) {
            relativeTo = me.legend;
        }

        // modify start
        if (me.legend.height > 0 && me.y > me.legend.maxY) {
            var r = Math.ceil((me.y - me.legend.maxY) / me.legend.offsetY);
            me.x += me.legend.columnWidth * r;
            me.y -= me.legend.offsetY * r;
        }

        // modify end
        for (; i < ln; i++) {
            item = items[i];
            switch (item.type) {
                case 'text' :
                    item.setAttributes({
                        x: 20 + relativeTo.x + me.x,
                        y: relativeTo.y + me.y
                    }, true);
                    break;

                case 'rect' :
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y - 6
                        }
                    }, true);
                    break;

                default :
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y
                        }
                    }, true);
            }
        }
    }
});


Ext.override(Ext.chart.Legend, {
    createItems: function () {
        var me = this, chart = me.chart, surface = chart.surface, items = me.items, padding = me.padding, itemSpacing = me.itemSpacing, spacingOffset = 2, maxWidth = 0, maxHeight = 0, totalWidth = 0, totalHeight = 0, vertical = me.isVertical, math = Math, mfloor = math.floor, mmax = math.max, index = 0, i = 0, len = items ? items.length : 0, x, y, spacing, item, bbox, height, width;
        if (len) {
            for (; i < len; i++) {
                items[i].destroy();
            }
        }
        items.length = [];
        chart.series.each(function (series, i) {
            if (series.showInLegend) {
                Ext.each([].concat(series.yField), function (field, j) {
                    item = Ext.create('Ext.chart.LegendItem', {
                        legend: this,
                        series: series,
                        surface: chart.surface,
                        yFieldIndex: j
                    });
                    bbox = item.getBBox();
                    width = bbox.width;
                    height = bbox.height;
                    if (i + j === 0) {
                        spacing = vertical ? padding + height / 2 : padding;
                    } else {
                        spacing = itemSpacing / (vertical ? 2 : 1);
                    }
                    item.x = mfloor(vertical ? padding : totalWidth + spacing);
                    item.y = mfloor(vertical ? totalHeight + spacing : padding + height / 2);
                    totalWidth += width + spacing;
                    totalHeight += height + spacing;
                    maxWidth = mmax(maxWidth, width);
                    maxHeight = mmax(maxHeight, height);
                    items.push(item);
                }, this);
            }
        }, me);
        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
        if (vertical && items.length === 1) {
            spacingOffset = 1;
        }
        me.height = mfloor((vertical ? totalHeight - spacingOffset * spacing : maxHeight) + (padding * 2));
        me.itemHeight = maxHeight;
        // modify start
        var outerHeight = me.chart.height - 20;
        if (items.length >= 2 && me.height > outerHeight) {
            var row = math.floor((outerHeight - padding * 2) / (items[1].y - items[0].y));
            if (row > 0) {
                me.columnWidth = me.width;
                me.width *= math.ceil(items.length / row);
                me.height = outerHeight;
                me.offsetY = items[row].y - items[0].y;
                me.maxY = items[row - 1].y;
            }
        }
        // modify end
    }
});

Ext.define('TJFX.view.QSDBTView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    height: 400,
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
            border: 0,
            items: [
                {
                    xtype: 'form',
                    cls: 'conditionPanel',
                    id: 'tjfx_qsdbt_search_form',
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
                            id: 'tjfx_qsdbt_org',
                            editable:false
                        }),
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            format: 'Y-m-d',
                            editable: false,
                            id: 'qsdbtfromDate',
                            value: new Date(),
                            emptyText: '请选择',
                            cls: 'share_DateSelect',
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'qsdbttoDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            format: 'Y-m-d',
                            editable: false,
                            labelSeparator: '',
                            id: 'qsdbttoDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: 'share_DateSelect',
                            value: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'qsdbtfromDate'
                        },
                        {
                            xtype: 'combo',
                            cls: 'share_Combobox',
                            width: 300,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '对比项',
                            queryMode: 'local',
                            store: Ext.create('TJFX.store.QSDBTStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'qsdbt_dbx',
                            value: 'YCZS'
                        },
                        {
                            xtype: 'button',
                            id: 'tjfx_qsdbt_search_btn',
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
            id: 'qsdbt_panel',
            layout: 'fit',
            bodyBorder: false,
            border: 0,
            items: [
                {
                    region: 'center',
                    xtype: 'chart',
                    height: 400,
                    id: 'tjfx_qsdbt_chart',
                    bodyBorder: false,
                    border: 0,
                    //animate: true,
                    theme: 'Category1',
                    //shadow: true,
                    store: Ext.create('TJFX.store.QSDBTChartStore'),
                    layout: 'fit',
                    legend: {
                        position: 'right'
                    },
                    axes: [
                        {
                            type: 'Numeric',
                            position: 'left',
                            minorTickSteps: 1,
                            fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10',
                                , 'data11', 'data12', 'data13', 'data14', 'data15', 'data16', 'data17', 'data18', 'data19', 'data20'
                                , 'data21', 'data22', 'data23', 'data24', 'data25', 'data26', 'data27', 'data28', 'data29', 'data30'
                                , 'data31', 'data32', 'data33', 'data34', 'data35', 'data36', 'data37', 'data38', 'data39', 'data40'
                                , 'data41', 'data42', 'data43', 'data44', 'data45', 'data46', 'data47', 'data48', 'data49', 'data50'],

                            //minimum:        0,
                            //minorTickSteps: 1,
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

                            label: {
                               // font: '微软雅黑',
                                rotate: {
                                    degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                                }
                            }
                        }
                    ],

                    series: [
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data1',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data2',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data3',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data4',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data5',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data6',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data7',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data8',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data9',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data10',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data11',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data12',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data13',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data14',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data15',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data16',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data17',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data18',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data19',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data20',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data21',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data22',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data23',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data24',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data25',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data26',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data27',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data28',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data29',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data30',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data31',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data32',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data33',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data34',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data35',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data36',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data37',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data38',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data39',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data40',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data41',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data42',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data43',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data44',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data45',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data46',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data47',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data48',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data49',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            axis: 'left',
                            xField: 'DATE',
                            yField: 'data50',
                            showInLegend: false,

                            highlight: {
                                size: 5,
                                radius: 5
                            },

                            markerConfig: {
                                type: 'circle',
                                size: 3,
                                radius: 3,
                                'stroke-width': 0
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


