/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('RZSJ.model.YHWSRZModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'police_id', type: "string"},
        {name: 'userinfo', type: "string"},
        {name: 'user_name', type: "string"},
        {name: 'operation', type: "string"},
        {name: 'dep_name', type: "string"},
        {name: 'time', type: "string"},
        {name: 'sn', type: "string"},
        {name: 'descript', type: "string"}
    ]
});