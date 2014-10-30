/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.store.GLWSCZLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    autoLoad:true,
    proxy: {
        type: 'rest',
        url : '/gmvcs/rest/LogHandle',
        reader: {
            type : 'json'
        },
        extraParams:
        {
            pData: "wsDevice"
        }
    }
    /*data: [
        {"type": "", "name": "不限"},
        {"type": "1", "name": "开机"},
        {"type": "2", "name": "关机"},
        {"type": "3", "name": "开始录像"},
        {"type": "4", "name": "结束录像"},
        {"type": "5", "name": "开始录音"},
        {"type": "6", "name": "结束录音"},
        {"type": "7", "name": "拍照"},
        {"type": "8", "name": "USB联机"},
        {"type": "9", "name": "usb断开链接"},
        {"type": "10", "name": "回放"}
    ]*/
});