/**
 * Created by hcowe on 14-1-31.
 */
Ext.define('TJFX.store.TJSJStore', {
    extend: 'Ext.data.Store',
    model: 'TJFX.model.TJSJModel',
    pageSize:1000,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url:  '/gmvcs/rest/TJSJController',
        reader: {
            type : 'json',
            root : 'result',
            successProperty :'success',
            totalProperty : 'total'
        },
        extraParams:
        {

        }
    }
});