Ext.define('MJWQ.view.TESTLineChartView', {
    extend: 'Ext.chart.Chart',
    style: 'background:#fff',
    animate: true,
    store: null,
    shadow: true,
    theme: 'Category1',
    legend: {
        position: 'right'
    },
    axes: [
        {
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: '数量',
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
            fields: ['name'],
            title: '主题'
        }
    ],
    series: [
        {
            type: 'line',
            title:"统计1",
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 1
            }
        },
        {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            smooth: true,
            xField: 'name',
            yField: 'data2',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            smooth: true,
            fill: true,
            xField: 'name',
            yField: 'data3',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }
    ],
    initComponent: function () {
        this.callParent(arguments);

    }
})
;


