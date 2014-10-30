/**
 * Created by hansen on 14-2-11.
 */
Ext.define('XTGL.store.SEXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": "0", "name": "男"},
        {"type": "1", "name": "女"}
    ]
});