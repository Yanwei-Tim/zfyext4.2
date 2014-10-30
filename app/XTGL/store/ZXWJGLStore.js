/**
 * Created by qinwe on 14-3-5.
 */
Ext.define('XTGL.store.ZXWJGLStore',{
    extend: 'Ext.data.Store',
    model: 'XTGL.model.ZXWJGLModel',
    pageSize: 1000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/getcenterfilemgr',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {

        }
    }
})
