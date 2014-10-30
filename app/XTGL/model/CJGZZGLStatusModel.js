/**
 * Created by KINKOO on 14-2-12.
 */
Ext.define('XTGL.model.CJGZZGLStatusModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ws_name', type: "string"},
        {name: 'ws_address', type: "string"},
        {name: 'dev_manuf', type: "string"},
        {name: 'ws_ip', type: "string"},
        {name: 'ws_mac', type: "string"},
        {name: 'ws_cpu', type: "string"},
        {name: 'ws_ram', type: "string"},
        {name: 'ws_totalDisk', type: "string"},
        {name: 'ws_usedDisk', type: "string"},
        {name: 'ws_org', type: "string"},
        {name: 'ws_admin', type: "string"},
        {name: 'ws_tel', type: "string"},
        {name: 'ws_network', type: "string"},
        {name: 'ws_status', type: "string"},
        {name: 'ws_streamserver', type: "string"},
        {name: 'ws_download', type: "string"},
        {name: 'ws_upload', type: "string"}
    ]
});

/*
 1.名称（textfield）name
 2.SID（textfield）sid
 3.IP地址（textfield）ip_address
 4.流媒体ROOT（textfield）streammedia_root
 5.下载ROOT（textfield）download_root
 6.所属部门（textfield） display_name
 7.管理员名称（textfield）admin
 8.管理员电话（textfield）phone
 9.工作站地址（textfield）address
 10.管理员部门（textfield）display_name
 11.产品名称（textfield）product_name
 12.服务电话（textfield）service_phone
 13.删除数据阀值（textfield）del_threshold_mb
 14.是否上传所有原文件（combobox）
 15.是否上传所有转码文件（combobox）
 16.是否上传所有缩略图（combobox）
 17.转码质量(spinnerfield 1-50) numberfield
 18.转码实例数(spinnerfield 1-10)
 19.同步间隔（秒）(textfield)syntime

 */


/*

 {name: 'ws_name', type: "string"},
 {name: 'ws_address', type: "string"},
 {name: 'dev_manuf', type: "string"},
 {name: 'ws_ip', type: "string"},
 {name: 'ws_mac', type: "string"},
 {name: 'ws_cpu', type: "string"},
 {name: 'ws_ram', type: "string"},
 {name: 'ws_totalDisk', type: "string"},
 {name: 'ws_usedDisk', type: "string"},
 {name: 'ws_org', type: "string"},
 {name: 'ws_admin', type: "string"},
 {name: 'ws_tel', type: "string"},
 {name: 'ws_network', type: "string"},
 {name: 'ws_status', type: "string"},
 {name: 'ws_streamserver', type: "string"},
 {name: 'ws_download', type: "string"},
 {name: 'ws_upload', type: "string"}


 |				|{[						|			|				                 	|
 |				|ws_name:      			|string		|工作站名称							|
 |				|ws_address:			|string		|工作站地址							|
 |				|ws_ip:					|string		|工作站IP							|
 |				|ws_mac:				|string		|工作站MAC							|
 |				|ws_cpu:				|string		|工作站CPU							|
 |				|ws_ram:				|string		|工作站内存							|
 |				|ws_totalDisk:			|string		|工作站磁盘总容量					|
 |				|ws_usedDisk:			|string		|工作站磁盘使用量					|
 |				|ws_org:				|string		|工作站所属部门						|
 |				|ws_admin				|string		|管理员								|
 |				|ws_tel					|string		|联系电话							|

 |				|ws_network				|int		|网络使用情况						|
 |				|ws_status				|string		|工作站状态							|
 |				|ws_streamserver		|string		|流媒体服务ROOT						|
 |				|ws_download			|string		|下载文件ROOT						|
 |				|ws_upload				|string		|上传文件ROOT						|

 |               |]}						|			|注：返回的是一个数组
 */


