/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.store.YHCZLXStore', {
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
            pData: "webUser"
        }
    }
    /*data: [
        {"type": "", "name": "不限"},
        {"type": "50", "name": "查看文件"},
        {"type": "51", "name": "编辑文件"},
        {"type": "52", "name": "下载文件"},
        {"type": "53", "name": "删除文件"},
        {"type": "54", "name": "导出文件"},
        {"type": "55", "name": "用户登录"},
        {"type": "56", "name": "用户登出"}
    ]*/
});