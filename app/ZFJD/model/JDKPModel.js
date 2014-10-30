/**
 * Created by 永志 on 14-2-5.
 */
Ext.define('ZFJD.model.JDKPModel', {
    extend: 'Ext.data.Model',

fields: [
        {name: 'name', type: "string"},
        {name: 'RCCC', type: "int"},
        {name: 'ZFWSP', type: "int"},
        {name: 'DY90', type: "int"},
        {name: 'TOT', type: "int"}
    ]
});