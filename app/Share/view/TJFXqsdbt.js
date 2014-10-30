/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('Share.view.TJFXqsdbt', {
    extend: 'Ext.chart.Chart',
    alias:  'widget.TJFXqsdbt',
    style:  'background:#fff',
    animate: true,
    //store: store1,
    shadow: true,
    theme: 'Category1',
    legend:
    {
        position: 'right'
    },
    axes:
        [
        {
            type:       'Numeric',
            minimum:    0,
            position:   'left',
            fields:     ['data1', 'data2', 'data3'],
            //title:      'Number of Hits',
            minorTickSteps: 1,
            grid:
            {
                odd:
                {
                    opacity:    1,
                    fill:       '#ddd',
                    stroke:     '#bbb',
                    'stroke-width': 0.5
                }
            }
        },
        {
            type:       'Category',
            position:   'bottom',
            fields:     ['name']
            //title:      'Month of the Year'
        }
    ],
    series:
        [
        {
            type:   'line',
            axis:   'left',
            xField: 'name',
            yField: 'data1',

            highlight:
            {
                size:   7,
                radius: 7
            },

            markerConfig:
            {
                type:   'line',
                size:   4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight:
            {
                size:   7,
                radius: 7
            },
            axis:   'left',
            smooth: true,
            xField: 'name',
            yField: 'data2',
            markerConfig:
            {
                type:   'circle',
                size:   4,
                radius: 4,
                'stroke-width': 0
            }
        },
        {
            type: 'line',
            highlight:
            {
                size:   7,
                radius: 7
            },
            axis:   'left',
            smooth: true,
            //fill: true,
            xField: 'name',
            yField: 'data3',
            markerConfig:
            {
                type:   'circle',
                size:   4,
                radius: 4,
                'stroke-width': 0
            }
        }
    ],

    initComponent: function ()
    {
        generateData = function (n, floor)
        {
            var data = [],
                p = (Math.random() * 11) + 1,
                i;

            floor = (!floor && floor !== 0) ? 20 : floor;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Ext.Date.monthNames[i % 12],
                    data1: Math.floor(Math.max((Math.random() * 100), floor)),
                    data2: Math.floor(Math.max((Math.random() * 100), floor)),
                    data3: Math.floor(Math.max((Math.random() * 100), floor)),
                    data4: Math.floor(Math.max((Math.random() * 100), floor)),
                    data5: Math.floor(Math.max((Math.random() * 100), floor)),
                    data6: Math.floor(Math.max((Math.random() * 100), floor)),
                    data7: Math.floor(Math.max((Math.random() * 100), floor)),
                    data8: Math.floor(Math.max((Math.random() * 100), floor)),
                    data9: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };



        store1 = Ext.create('Ext.data.JsonStore', {
            fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
            data: generateData()
        });

        store1.loadData(generateData(8));
        this.store = store1;

        this.callParent(arguments);
    }

});