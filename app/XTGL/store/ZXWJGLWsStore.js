/**
 * Created by qinwe on 14-3-5.
 * 获取中心文件已分配工作站
 */
Ext.define('XTGL.store.ZXWJGLWsStore',{
    extend: 'Ext.data.Store',
    model: 'XTGL.model.CJGZZGLModel',
    pageSize: 1000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/get_cfilemgr_ws',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {
            c_sid: ""
        }
    }
})
