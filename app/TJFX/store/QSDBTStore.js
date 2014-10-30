/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('TJFX.store.QSDBTStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        /*{"type": '4',        "name": "异常次数(次)"},
        {"type": "5",        "name": "摄录时长低于90%数量(个)"},
        {"type": "6",       "name": "执法无视频数量(个)"},
        {"type": "7",       "name": "十分钟连续开单三起数量(次)"},
        {"type": "8",        "name": "执法数(个)"},
        {"type": "9",      "name": "执法有视频数(个)"},
        {"type": "10",        "name": "视频数(个)"},
        {"type": "11",        "name": "视频总时长(小时)"},
        {"type": "12",       "name": "高清视频数(个)"},
        {"type": "13",       "name": "高清视频总时长(小时)"},
        {"type": "14",       "name": "普清视频数(个)"},
        {"type": "15",       "name": "普清视频总时长(小时)"},
        {"type": "16",        "name": "对比成功视频数(个)"}*/
        {"type": 'YCZS',        "name": "异常次数(次)"},
        {"type": "KQYC",        "name": "摄录时长低于90%数量(个)"},
        {"type": "ZFWSP",       "name": "执法无视频数量(个)"},
        {"type": "OVER3",       "name": "十分钟连续开单三起数量(次)"},
        {"type": "CFSL",        "name": "执法数(个)"},
        {"type": "ZFYSPS",      "name": "执法有视频数(个)"},
        {"type": "SPGS",        "name": "视频数(个)"},
        {"type": "SPSC",        "name": "视频总时长(小时)"},
        {"type": "HSPGS",       "name": "高清视频数(个)"},
        {"type": "HSPSC",       "name": "高清视频总时长(小时)"},
        {"type": "LSPGS",       "name": "普清视频数(个)"},
        {"type": "LSPSC",       "name": "普清视频总时长(小时)"},
        {"type": "BDSL",        "name": "对比成功视频数(个)"}
    ]
});
