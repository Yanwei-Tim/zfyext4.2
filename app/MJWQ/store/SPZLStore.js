/**
 * Created by hansen on 14-2-11.
 */
Ext.define('MJWQ.store.SPZLStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": '', "name": "不限"},
        {"type": "H", "name": "高清"},
        {"type": "L", "name": "标清"}
    ]
});