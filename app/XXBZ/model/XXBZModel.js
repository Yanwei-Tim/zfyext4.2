/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('XXBZ.model.XXBZModel', {
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
        {name: 'need_upload', type: "string"},
        {name: 'BDJG', type: "string"},
        {name: 'file_type', type: "string"},
        {name: 'file_status', type: "boolean"},
        {name: 'file_oripath', type: "string"}
    ]
});