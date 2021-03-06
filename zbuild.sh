#!/bin/bash
#打包浏览器插件
"C:\Program Files (x86)\NSIS\makensis.exe" "..\build\setup.nsi"

#生成图片缓存
zGenerateBGPic.sh

#生成版本信息
unset LANG
unset LC_CTYPE
user=`whoami | sed 's/[\]/-/g'`
date=`date`
cwd=`pwd`
revision=`svn info | sed -n -e 's/Last Changed Rev: \(.*\)/\1/p'`
url=`svn info | sed -n -e 's/URL: \(http.*\)/\1/p'`
cat >"version-info.html" <<EOF
<!--
 * Generated by src/saveVersion.sh
-->
<pre>
revision: $revision
user:     $user
date:     $date
url:      $url
</pre>
EOF
