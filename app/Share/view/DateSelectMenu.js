/**
 * Created by yongzhi.zhan on 14-2-11.
 */
Ext.define('Share.view.DateSelectMenu', {
    extend: 'Ext.menu.Menu',
    plain: true,

    items: [{
        xtype: 'datepicker',
        maxDate: new Date
    }],

    initComponent: function(){
        this.callParent(arguments);
        this.addEvents("onDateSelect");
        var dateSelect = this.items.first();
        dateSelect.on("select", function(obj, date, eOpts){
            this.fireEvent("onDateSelect", obj, date, eOpts);
            this.hide();
        }, this);
    }
});