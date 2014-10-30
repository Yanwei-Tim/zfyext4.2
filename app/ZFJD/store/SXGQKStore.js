/**
 * Created by 永志 on 14-1-31.
 */
Ext.define('ZFJD.store.SXGQKStore', {
    extend: 'Ext.data.Store',
    model: 'ZFJD.model.SXGQKModel',
    pageSize: 20,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/OnOffDuty',
        reader: {
            type: 'json',
            root: 'ITEMS',
            successProperty: 'success',
            totalProperty: 'TOTAL'
        },
        extraParams: {}
    }
});