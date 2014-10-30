/**
 * Created by qinwen on 14-3-5.
 */
Ext.define('XTGL.model.ZXWJGLModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: "string"},
        {name: 'sid', type: "string"},
        {name: 'ip', type: "string"},
        {name: 'line_status', type: "string"},
        {name: 'worktime_begin', type: "string"},
        {name: 'worktime_end', type: "string"},
        {name: 'max_speed', type: "string"},
        {name: 'status', type: "string"},
        {name: 'speed', type: "string"},
        {name: 'last_alive_time', type: "string"},


        {name: 'display_name', type: "string"},
        {name: 'admin', type: "string"},
        {name: 'phone', type: "string"},
        {name: 'address', type: "string"},
        {name: 'product_name', type: "string"},
        {name: 'service_phone', type: "string"},
        {name: 'del_threshold_mb', type: "string"},
        {name: 'numberfield', type: "string"},
        {name: 'syntime', type: "string"}  //未全
    ]
})
