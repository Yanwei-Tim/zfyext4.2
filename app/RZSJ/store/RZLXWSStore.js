/**
 * Created by hasnen on 14-2-11.
 */
Ext.define('RZSJ.store.RZLXWSStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    autoLoad:false,
    data: [
        {"type": "1", "name": "用户日志"},
        {"type": "2", "name": "设备日志"}
    ]
});