#!/bin/bash
module=("Main" "Login" "MJWQ" "RZSJ" "Share" "TJFX" "XTGL" "YJYP" "ZFJD")
resultFile=loadImg.js
echo > $resultFile
echo -e "setTimeout(function() {" >> $resultFile
echo -e "    var img" >> $resultFile

for var in ${module[@]}
do
	directory="app/$var/resource/imgs"
	for file in `ls $directory`
	do
		if [ -e $directory/$file ]
		then
			echo -e "    img = new Image();" >> $resultFile
			echo -e "    img.src = \"$directory/$file\"" >> $resultFile
		fi
	done
done

echo -e "}, 1000);" >> $resultFile