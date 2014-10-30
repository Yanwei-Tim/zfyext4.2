/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('XTGL.store.CJGZZGLStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.CJGZZGLModel',
    pageSize: 1000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/getwsinfo',
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