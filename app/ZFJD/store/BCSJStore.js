/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.BCSJStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": 1, "name": "半年"},
        {"type": 2, "name": "一年"},
        {"type": 3, "name": "两年"}
    ]
});