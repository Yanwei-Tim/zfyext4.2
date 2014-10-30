/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.store.YHWSCZLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    autoLoad:true,
    proxy: {
        type: 'rest',
        url : '/gmvcs/rest/LogHandle',
        reader: {
            type : 'json'
        },
        extraParams:
        {
            pData: "wsUser"
        }
    }/*,
    data: [
        {"type": "", "name": "不限"},
        {"type": "101", "name": "数据导入"},
        {"type": "102", "name": "数据导出"},
        {"type": "103", "name": "数据删除"},
        {"type": "104", "name": "数据查看"},
        {"type": "105", "name": "关机"},
        {"type": "106", "name": "重启"},
        {"type": "107", "name": "安全配置"}
    ]*/
});
