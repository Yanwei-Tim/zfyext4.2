/**
 * Created by qinwen on 14-2-18.
 */
Ext.define('YJYP.model.YJYPChartDayModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'DATE', type: "string"},
        {name: 'KQYC', type: "int"},
        {name: 'noMediaCutStore', type: "int"},
        {name: 'OVER3', type: "int"}
    ]
});
