/**
 * Created by qinwen on 14-2-19.
 */
Ext.define('YJYP.model.YJYPChartLineModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: "string"},
        {name: 'lastKQYC', type: "int"},
        {name: 'lastnoMediaCutStore', type: "int"},
        {name: 'lastOVER3', type: "int"},
        {name: 'thisKQYC', type: "int"},
        {name: 'thisnoMediaCutStore', type: "int"},
        {name: 'thisOVER3', type: "int"}
    ]
});
