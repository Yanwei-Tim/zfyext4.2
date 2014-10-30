/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('XTGL.store.ZXWJGLAssignStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.CJGZZGLModel',
    pageSize: 1000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/getAssignwsinfo',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {
            user_code: Ext.LoginInfo.info.user_id
        }
    }
});