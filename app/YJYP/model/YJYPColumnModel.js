/**
 * Created by qinwen on 14-2-18.
 */
Ext.define('YJYP.model.YJYPColumnModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: "string"},
        {name: 'KQYC', type: "int"},
        {name: 'noMediaCutStore', type: "int"},
        {name: 'OVER3', type: "int"}
    ]
});
