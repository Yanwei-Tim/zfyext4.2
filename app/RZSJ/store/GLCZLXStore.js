/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.store.GLCZLXStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    autoLoad: true,
    proxy: {
        type: 'rest',
        url : '/gmvcs/rest/LogHandle',
        reader: {
            type : 'json'
        },
        extraParams:
        {
            pData: "webAdmin"
        }
    }
    /*data: [
        {"type": "", "name": "不限"},
        {"type": "50", "name": "添加部门"},
        {"type": "56", "name": "编辑部门"},
        {"type": "51", "name": "删除部门"},
        {"type": "52", "name": "添加用户"},
        {"type": "53", "name": "删除用户"},
        {"type": "54", "name": "用户登录"},
        {"type": "55", "name": "用户登出"}
    ]*/
});