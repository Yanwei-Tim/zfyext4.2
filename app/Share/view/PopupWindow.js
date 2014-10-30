/**
 * Created by yongzhi.zhan on 14-2-13.
 */
Ext.define('Share.view.PopupWindow', {
    extend: 'Ext.window.Window',
    xtype: 'PopupWindow',
    title: '请替换窗口标题',
    constrain: true,
    header: {
        //titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    x: 400,
    y: 200,
    modal: true,
    width: 375,
    height: 182,
    initComponent: function () {
        this.x = 0.5 * (document.body.clientWidth - this.width);
        this.y = 0.5 * (document.body.clientHeight - this.height);
        var self = this;
        this.on('show', function (showWindow) {
            //计算显示位置
            var width = showWindow.width;
            var height = showWindow.height;
            var bodyWidth = Ext.getBody().getWidth();
            var bodyHeight = Ext.getBody().getHeight();
            if (self.id == "RCCC_BaseInfo_PopupWindow" && bodyWidth < 1050) {
                showWindow.setXY(self.x, self.y);
            } else {
                showWindow.setXY([(bodyWidth - width) / 2, (bodyHeight - height) / 2]);
            }
        });

        this.callParent(arguments);
    }

})