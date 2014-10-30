/**
 * Created by hcxowe on 14-3-12.
 */
Ext.define('XTGL.store.JSGLJSLBStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.JSGLJSLBModel',
    pageSize:20,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url:    '/gmvcs/rest/get_role_info',
        reader: {
            type : 'json',
            root : 'body',
            successProperty :'ret',
            totalProperty : 'total'
        },
        extraParams:
        {

        }
    }
});