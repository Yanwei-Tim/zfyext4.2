/**
 * Created by hcowe on 14-2-20.
 */
Ext.define('TJFX.store.TJSJPWStore', {
    extend: 'Ext.data.Store',
    model: 'TJFX.model.TJSJPWModel',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url:  '/gmvcs/rest/TJSJPWController',
        reader: {
            type : 'json'
        },
        extraParams:
        {

        }
    }
});