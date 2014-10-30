/**
 * Created by hcxowe on 14-2-20.
 */

Ext.define('TJFX.view.TJSJPWView', {
    extend: 'Share.view.PopupWindow',
    width: 1000,
    height: 700,
    minHeight: 400,
    minWidth: 550,
    hidden: false,
    maximizable: false,
    titleAlign: 'left',
    title: '统计分析',
    autoShow: false,
    layout: 'fit',
    items: {
        xtype: 'chart',
        id: 'tjfx_tjsjpw_chart',
        animate: true,
        shadow: true,
        store: Ext.create('TJFX.store.TJSJPWStore'),
        style: {
            color: "#99CCFF",
            size: 20
        },
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: 'data',

                grid: true,
                minimum: 0
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                label: {
                    rotate: {
                        degrees: 315//x轴 旋转 坐标的字体显示 ：斜体
                    }
                }
            }
        ],

        series: [
            {
                xPadding: 10,
                type: 'column',
                axis: 'middle',
                highlight: true,

                tips: {
                    trackMouse: true,
                    //width: 300,
                    height: 25,
                    renderer: function (storeItem, item) {
                        this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
                        this.width = (storeItem.get('name') + ': ' + storeItem.get('data')).length * 13;
                    }
                },
                label: {
                    display: 'insideEnd',
                    field: 'data',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'left'
                },

                xField: 'name',
                yField: 'data'
            }
        ]
    }

});