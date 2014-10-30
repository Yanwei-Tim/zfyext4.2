/**
 * Created by 永志 on 14-2-5.
 */
Ext.define('MJWQ.model.RCCCModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: "int"},
        {name: 'file_thumbnail', type: "string"},
        {name: 'capture_unit', type: "string"},
        {name: 'capture', type: "string"},
        {name: 'file_info', type: "string"},
        {name: 'SJDH', type: "string"},
        {name: 'SJLX', type: "string"},
        {name: 'capture_device', type: "string"},
        {name: 'KFQK', type: "int"},
        {name: 'media_quality', type: "string"},
        {name: 'BDJG', type: "string"},
        {name: 'file_type', type: "string"},
        {name: 'file_oripath', type: "string"}
    ]
});