/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.model.YJYPKqycMsgModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'MJJH', type: "string"},
        {name: 'MJMC', type: "string"},
        {name: 'JGMC', type: "string"},
        {name: 'RIQI', type: "string"},
        {name: 'CQSJ', type: "int"},
        {name: 'SPSC', type: "int"},
        {name: 'CQBL', type: "float"},
        {name: 'KFQK', type: "int"},
        {name: 'HCQK', type: "int"},
        {name: 'HCRJH', type: "string"},
        {name: 'HCRMC', type: "string"},
        {name: 'HCQK_RESULT', type: "string"},
        {name: 'HCQK_REMARK', type: "string"},
        {name: 'noMediaCutStore', type: "int"}
    ]
})


/*
 MJJH:string                          民警警号
 MJMC:string                          民警名称
 JGMC:string                          机构名称
 RIQI:string                          日期
 CQSJ:int                             出勤时间
 SPSC:int                             摄录时长
 CQBL:float                           摄录比例:如：0.90
 KFQK:int                             扣分情况
 HCQK:int                             0：未核查,1已核查
 HCRJH:string                         核查人警号
 HCRMC:string                         核查人名称
 HCQK_RESULT:int                      情况属实:1,查无此情况:2,其它原因:3
 HCQK_REMARK:string                   核查评论
 */
