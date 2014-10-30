/*
 * Created by hcowe on 14-2-21.
 */
Ext.define('TJFX.store.QSTStore', {
    extend: 'Ext.data.Store',
    model: 'TJFX.model.QSTModel',
    pageSize: 1000,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url : '/gmvcs/rest/QSTController',
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