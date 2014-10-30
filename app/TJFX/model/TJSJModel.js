/**
 * Created by hcxowe on 14-2-18.
 */
Ext.define('TJFX.model.TJSJModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'OBJBM', type: "string"},
        {name: 'OBJMC', type: "string"},//部门名称
        {name: 'workstation_count', type: "int"},//工作站个数
        {name: 'user_count', type: "int"},//警员个数
        {name: 'device_count', type: "int"},//执法仪数目
        {name: 'YCZS', type: "int"},//异常总数
        {name: 'KQYC', type: "int"},//摄录时长低于90%数量
        {name: 'ZFWSP', type: "int"},//执法无视频数量
        {name: 'OVER3', type: "int"},//十分钟连续开单三起数量
        {name: 'CFSL', type: "int"},//处罚数量总数（执法数）
        {name: 'ZFYSPS', type: "int"},//执法有视频数
        {name: 'SPGS', type: "int"},//视频数
        {name: 'SPSC', type: "int"},//视频总时长
        {name: 'HSPGS', type: "int"},//高清视频数
        {name: 'HSPSC', type: "int"},//高清视频总时长
        {name: 'LSPGS', type: "int"},//普清视频数
        {name: 'LSPSC', type: "int"},//普清视频总时长
        {name: 'BDSL', type: "int"}//对比成功视频数
    ]
});