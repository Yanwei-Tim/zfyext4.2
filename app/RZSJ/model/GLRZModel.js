/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('RZSJ.model.GLRZModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'police_id', type: "string"},
        {name: 'userinfo', type: "string"},
        {name: 'time', type: "string"},
        {name: 'name', type: "string"},
        {name: 'orgname', type: "string"},
        {name: 'operation', type: "string"},
        {name: 'descript', type: "string"}
    ]
});