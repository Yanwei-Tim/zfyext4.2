/**
 * Created by hansen on 14-2-11.
 */
Ext.define('XTGL.store.TYPEStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": 1, "name": "终端用户"},
        {"type": 2, "name": "后台用户"}
    ]
});