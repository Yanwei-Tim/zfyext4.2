/**
 * Created by hansen on 14-2-11.
 */
Ext.define('MJWQ.store.MTLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": '', "name": "不限"},
        {"type": 1, "name": "视频"},
        {"type": 2, "name": "音频"},
        {"type": 3, "name": "图像"},
        {"type": 0, "name": "其他"}
    ]
});