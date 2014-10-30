/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.model.BMGLModel',{
    extend:'Ext.data.Model',
    fields: [
        {name: 'bmmc', type: 'string'},
        {name: 'bmbh', type: 'string'},
        {name: 'bmpx', type: 'int'},
        {name: 'pid', type: 'string'}
    ]
});
