/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.controller.TESTController', {
    extend: 'Ext.app.Controller',
    pages: {},
    testLineChartView: Ext.create("MJWQ.view.TESTLineChartView", {
        id: 'testLineChart',
        store: Ext.create("MJWQ.store.TESTStore")
    }),
    init: function () {
        //this.addEvents(['editRow', 'deleteRow', 'addRow', 'actionItemClick']);
        this.control({
            '#mjwq_test_search_btn': {
                boxready: this.initFt,
                click: this.onSearch
            },
            '#mjwq_test_redraw_btn': {
                click: this.redraw

            },
            '#testLineChart': {
                'boxready': function () {
                    L(1)
                }
            }

        });
    },
    redraw: function (obj) {
        var store  =this.testLineChartView.getStore();
        store.on('loadData',function(){
            L(2)
        })
        var data = this.createData();
        store.loadData(data);
      //  this.testLineChartView.refresh()

    },
    initFt: function (obj) {
        obj.fireEvent("click", obj);
    },
    onSearch: function (obj) {
        var data = this.createData();
        var test_linechar_center = Ext.getCmp("test_linechar_center");
        test_linechar_center.add(this.testLineChartView);
        this.testLineChartView.getStore().loadData(data);

    },
    createData: function () {
        var data = [];
        var floor = (!floor && floor !== 0) ? 20 : floor;
        for (var i = 0; i < 10; i++) {
            data.push({
                name: "items" + i,
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            })
        }
       // L(data)
        return data;
    }

})