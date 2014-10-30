/**
 * Created by hansen on 14-4-17.
 * pData
 * String objId   被操作对象id
 * String objName  被操作对象objName
 * int operaType    日志类型： 1.用户 2.管理
 * String operation   操作类型编码
 */
Ext.define('Share.view.LogHandle', {
    xtype: 'LogHandle',
    initComponent: function () {
        var self = this;

        this.callParent(arguments);
    },
    LogHandle: function (operaType, operation, objId, objName) {
        var pData = Ext.JSON.encode({
            objId: objId,
            objName: objName,
            operaType: operaType,
            operation: operation
        })
        Ext.Ajax.request({
            url: '/gmvcs/rest/LogHandle',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                L(jsonResult)
            }
        });
    }
})