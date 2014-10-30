/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.model.YJYPModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'DATE', type: "string"},
        {name: 'OBJBM', type: "string"},
        {name: 'OBJMC', type: "string"},
        {name: 'OBJID', type: "int"},
        {name: 'OBJTYPE', type: "int"},
        {name: 'CQSJ', type: "int"},
        {name: 'JYCF', type: "int"},
        {name: 'PECC', type: "int"},
        {name: 'QZCS', type: "int"},
        {name: 'JCJ', type: "int"},
        {name: 'SGCL', type: "int"},
        {name: 'CFSL', type: "int"},
        {name: 'OVER3', type: "string"},
        {name: 'KQYC', type: "string"},
        {name: 'JYCFSP', type: "int"},
        {name: 'PECCSP', type: "int"},
        {name: 'QZCSSP', type: "int"},
        {name: 'JCJSP', type: "int"},
        {name: 'SGCLSP', type: "int"},
        {name: 'SPSC', type: "int"},
        {name: 'SPGS', type: "int"},
        {name: 'HSPSC', type: "int"},
        {name: 'LSPSC', type: "int"},
        {name: 'HSPGS', type: "int"},
        {name: 'LSPGS', type: "int"},
        {name: 'BDSL', type: "int"},
        {name: 'BDSL_L', type: "int"},
        {name: 'SPYC', type: "int"},
        {name: 'CFSYC', type: "int"},
        {name: 'exceptionNum', type: "int"},
        {name: 'noMediaCutStore', type: "string"}

    ]
});

/*
                   OBJBM                   |string     |对象编码                         |
 |                |OBJMC                   |string     |对象名称                         |
 |                |OBJID                   |int        |对象ID                           |
 |                |OBJTYPE                 |int        |对象类型:0部门,1警员             |
 |                |CQSJ                    |int        |出勤时间                         |
 |                |JYCF                    |int        |简易处罚数量                     |
 |                |PECC                    |int        |违停拍照数量                     |
 |                |QZCS                    |int        |强制措施数量                     |
 |                |JCJ                     |int        |接处警数量                       |
 |                |SGCL                    |int        |事故处理数量                     |
 |                |CFSL                    |int        |处罚数量总数                     |
 |                |OVER3                   |int        |十分钟连续开单三起               |
 |                |KQYC                    |int        |摄录时长低于90%数量              |
 |                |JYCFSP                  |int        |有视频简易处罚数量               |
 |                |PECCSP                  |int        |有视频违停拍照数量               |
 |                |QZCSSP                  |int        |有视频强制措施数量               |
 |                |JCJSP                   |int        |有视频接处警数量                 |
 |                |SGCLSP                  |int        |有视频事故处理数量               |
 |                |SPSC                    |int        |视频总时长                       |
 |                |SPGS                    |int        |视频总个数                       |
 |                |HSPSC                   |int        |高清视频总时长                   |
 |                |LSPSC                   |int        |普清视频总时长                   |
 |                |HSPGS                   |int        |高清视频总个数                   |
 |                |LSPGS                   |int        |普清视频总个数                   |
 |                |BDSL                    |int        |比对成功数量                     |
 |                |BDSL_L                  |int        |比对成功但不是高清数量           |
 |                |SPYC		          |int        |视频时长异常人天次               |
 |                |CFSYC          	  |int        |处罚量异常人天次

 */