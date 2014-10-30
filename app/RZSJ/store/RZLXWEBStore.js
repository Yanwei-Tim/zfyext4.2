/**
 * Created by hansen on 14-2-11.
 */
Ext.define('RZSJ.store.RZLXWEBStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    autoLoad:false,
    data: [
        {"type": "1", "name": "常规日志"},
        {"type": "2", "name": "管理日志"}
    ]
});