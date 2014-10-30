/**
 * Created by 永志 on 14-2-5.
 */
Ext.define('ZFJD.model.RCCCModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sid', type: "string"},
        {name: 'police_id', type: "string"},
        {name: 'file_thumbnail', type: "string"},
        {name: 'dep_name', type: "string"},
        {name: 'capture', type: "string"},
        {name: 'file_info', type: "string"},
        {name: 'SJDH', type: "string"},
        {name: 'SJLX', type: "string"},
        {name: 'device_serial', type: "string"},
        {name: 'KFQK', type: "int"},
        {name: 'media_quality', type: "string"},
        {name: 'unusual', type: "string"},
        {name: 'BDJG', type: "string"},
        {name: 'file_type', type: "string"},
        {name: 'file_status', type: "boolean"},
        {name: 'file_oripath', type: "string"},
        {name: 'BZLX', type: "string"},
        {name: 'police_dep', type: "string"}
    ]
});