/**
 * Created by hcxowe on 14-2-21.
 */
Ext.define('TJFX.model.QSTModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'DATE', type: "string"},
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
        {name: 'BDSL', type: "int"},//对比成功视频数
        {name: 'tipvalue', type: "int"},
        {name: 'Tipdata0', type: "int"},
        {name: 'Tipdata1', type: "int"},
        {name: 'Tipdata2', type: "int"},
        {name: 'Tipdata3', type: "int"},
        {name: 'Tipdata4', type: "int"},
        {name: 'Tipdata5', type: "int"},
        {name: 'Tipdata6', type: "int"},
        {name: 'Tipdata7', type: "int"},
        {name: 'Tipdata8', type: "int"},
        {name: 'Tipdata9', type: "int"},
        {name: 'Tipdata10', type: "int"},
        {name: 'Tipdata11', type: "int"},
        {name: 'TipDate0', type: "string"},
        {name: 'TipDate1', type: "string"},
        {name: 'TipDate2', type: "string"},
        {name: 'TipDate3', type: "string"},
        {name: 'TipDate4', type: "string"},
        {name: 'TipDate5', type: "string"},
        {name: 'TipDate6', type: "string"},
        {name: 'TipDate7', type: "string"},
        {name: 'TipDate8', type: "string"},
        {name: 'TipDate9', type: "string"},
        {name: 'TipDate10', type: "string"},
        {name: 'TipDate11', type: "string"}
    ]
});