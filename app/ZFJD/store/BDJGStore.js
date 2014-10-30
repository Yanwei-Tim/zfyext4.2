/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.BDJGStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type":'' , "name": "不限"},
        {"type": 1, "name": "比对成功"},
        {"type": 0, "name": "比对失败"}
    ]
});