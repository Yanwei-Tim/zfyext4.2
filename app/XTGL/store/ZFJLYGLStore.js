/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('XTGL.store.ZFJLYGLStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.ZFJLYGLModel',
    pageSize: 20,
    autoLoad:false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/getdevice',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {

        }
    }
});