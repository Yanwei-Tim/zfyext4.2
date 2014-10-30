/**
 * Created by qinwen on 14-2-13.
 */
var zhchartColumn = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff;font-size:26px',
        animate: true,
        shadow: true,
        //maximizable:false,
        id: 'yjyp_zhou_column',
        store: Ext.create('YJYP.store.YJYPColumnStore'),
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['KQYC'],
            /*label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },*/
            //title: '摄录时长低于90％ 数量',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            //title: '上周－－本周',
            label: {
                rotate: {
                    //degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                }
            }
        }],
        series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function(storeItem, item) {
                    switch (item.yField){
                        case 'KQYC':
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('KQYC'));
                            break;
                        case 'noMediaCutStore':
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('noMediaCutStore'));
                            break;
                        case 'OVER3':
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('OVER3'));
                            break;
                    }
                }
            },
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'KQYC',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'name',
            yField: 'KQYC'
        }]
    });

var zhchartLine = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        id: 'yjyp_zhou_chartline',
        store: Ext.create('YJYP.store.YJYPChartLineStore'),
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['lastKQYC', 'thisKQYC'],
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            label: {
                rotate: {
                   // degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                }
            }
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            title: '上周',
            xField: 'name',
            yField: 'lastKQYC',

            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            smooth: true,
            title: '本周',
            xField: 'name',
            yField: 'thisKQYC',

            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
    });


Ext.define('YJYP.view.YJYPkqyczhouView', {
    extend: 'Ext.container.Container',
    width: 805,
    height: 350,
    border: 0,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        bodyBorder: false,
        border: 0
    },
    layout: 'border',
    items: [{
        region:'west',
        xtype: 'panel',
        width: 300,
        collapsible: false,
        layout: 'border',
        border: 0,
        items: [{
            region: 'north',
            border: 0,
            height:40,
            items: [{
                xtype: "label",
                style: 'background:#fff;font: 14px Arial;line-height:40px;margin-left:10px',
                id: "yjyp_window_zhb",
                height: 30,
                text: "周环比"
            }]
        },{
            region:'west',
            border: 0,
            xtype: 'panel',
            width: 300,
            collapsible: false,
            layout: 'fit',
            items: zhchartColumn
        }

        ]
    },{
        region:'center',
        border: 0,
        layout: 'border',
        items: [{
            region: 'north',
            border: 0,
            height:40,
            items: [{
                xtype: "label",
                style: 'background:#fff;font: 14px Arial;line-height:40px;margin-left:10px',
                id: "yjyp_window_qszhb",
                text: "趋势周环比"
            }]
        },{
            region:'west',
            border: 0,
            xtype: 'panel',
            width: 495,
            collapsible: false,
            layout: 'fit',
            items: zhchartLine
        }]
    }]

});