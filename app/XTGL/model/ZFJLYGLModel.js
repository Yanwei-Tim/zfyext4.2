/**
 * Created by KINKOO on 14-2-12.
 */
Ext.define('XTGL.model.ZFJLYGLModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'guid', type: "string"},
        {name: 'police_id', type: "string"},
        {name: 'police_name', type: "string"},
        {name: 'dep_code', type: "string"},
        {name: 'dep_name', type: "string"},
        {name: 'serial', type: "string"},
        {name: 'sn', type: "string"},
        {name: 'description', type: "string"},
        {name: 'capacity', type: "string"},
        {name: 'manufacturer', type: "string"},
        {name: 'product_id', type: "string"},
        {name: 'version', type: "string"},
        //{name: 'status', type: "string"},
        {name: 'last_use_time', type: "string"},
        {name: 'register_time', type: "string"},
        {name: 'import_times', type: "string"}
    ]
});

/*
     警员编号 ，外壳编号 ，硬件序列号 ，描述 ，容量 ，厂商 ，产品名称 ，型号 ，设备状态， 上次使用时间 ，注册时间 ，接入次数
 */

/*
 [
 {name: 'dev_id', type: "string"},
 {name: 'dev_type', type: "string"},
 {name: 'dev_manuf', type: "string"},
 {name: 'dev_sn', type: "string"},
 {name: 'dev_status', type: "string"},
 {name: 'dev_Capacity', type: "string"},
 {name: 'dev_UserName', type: "string"},
 {name: 'dev_orgName', type: "string"},
 {name: 'dev_UserSerial', type: "string"},
 {name: 'dev_UserOrdId', type: "string"},
 {name: 'register_time', type: "string"},
 {name: 'dev_UserId', type: "string"},
 {name: 'dev_description', type: "string"},
 {name: 'dev_UserOrdId', type: "string"}
 ]
 */