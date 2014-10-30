/*
 * Created by hcowe on 14-2-21.
 */
Ext.define('TJFX.store.QSDBTChartStore', {
    extend: 'Ext.data.Store',
    model: 'TJFX.model.QSDBTChartModel',
    pageSize:1000,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url : '/gmvcs/rest/QSDBTChartController',
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