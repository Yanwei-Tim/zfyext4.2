/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.SPZLStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": '', "name": "不限"},
        {"type": "1", "name": "高清"},
        {"type": "2", "name": "普清"}
    ]
});