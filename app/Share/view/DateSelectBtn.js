/**
 * Created by yongzhi.zhan on 14-2-11.
 */
Ext.define('Share.view.DateSelectBtn', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.dateSelectBtn',
    cls: "share_DateSelect",
    maxValue: new Date(),
    editable: false,
    emptyText : '请选择',
    format: 'Y-m-d',
    width: 99,
    height: 22
});