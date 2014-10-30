/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.YCLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": "0", "name": "十分钟内连续处罚"},
        {"type": "1", "name": "摄录时长低于90%"},
        {"type": "2", "name": "执法无视频"},
        {"type": "3", "name": "连续五天出现异常数据"},
        {"type": "4", "name": "连续十天出现异常数据"}
    ]
});