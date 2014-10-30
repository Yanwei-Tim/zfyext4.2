/**
 * Created by qinwen on 14-2-13.
 */
var quchartLine = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: false,
        id: 'yjyp_qu_chartline',
        store: Ext.create('YJYP.store.YJYPChartDayStore'),
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['KQYC'],
            //title: '摄录时长低于90％ 数量',
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
            fields: ['DATE'],
            label: {
                rotate: {
                    degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                }
            }
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 4,
                radius: 4
            },
            axis: 'left',
            smooth: true,
            xField: 'DATE',
            yField: 'KQYC',
            title: '低于90％',
            markerConfig: {
                type: 'circle',
                size: 3,
                radius: 3,
                'stroke-width': 0
            }
        }]
    });


Ext.define('YJYP.view.YJYPkqycquView', {
    extend: 'Ext.container.Container',
    width: 805,
    height: 350,
    bodyBorder: false,
    border: 0,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'fit',
    items: [{
        layout: 'border',
        items: [{
            region: 'north',
            border: 0,
            height:40,
            items: [{
                xtype: "label",
                style: 'background:#fff;font: 14px Arial;line-height:40px;margin-left:10px',
                id: "yjyp_window_qst",
                text: "趋势图"
            }]
        },{
        region:'west',
        border: 0,
        xtype: 'panel',
        width: 795,
        collapsible: false,
        layout: 'fit',
        items: quchartLine
        }]
    }]

});