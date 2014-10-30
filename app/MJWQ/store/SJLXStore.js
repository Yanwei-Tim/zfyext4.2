/**
 * Created by hansen on 14-2-11.
 */
Ext.define('MJWQ.store.SJLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": '', "name": "不限"},
        {"type": "JYCF", "name": "简易处罚"},
        {"type": "PECC", "name": "违停拍照"},
        {"type": "JCJ", "name": "接处警"},
        {"type": "JYSG", "name": "简易事故"},
        {"type": "QZCS", "name": "强制措施"}
    ]
});