---
layout: post
title: Piltide manipuleerimine ImageMagickuga
categories: postitused
tags: linux
image: linux.png
---
Blogipostitustes teksti kõrvale pilte lisades vähendan nende suuruseid tavaliselt [ImageMagick Convert tööriista](http://www.imagemagick.org/script/convert.php) abil.

Paketi installimiseks teeme nii:

    sudo apt-get install imagemagick

Pisipiltide genereerimine on sama lihtne kui:

    for file in *.jpg; do convert $file -resize 300x -quality 85 p-$file; done

Kui kaustas peaks olema pildifaile, mille laiendid on "jpg" asemel näiteks "JPG", siis sobib see:

    for file in *.JPG; do mv $file ${file%%.JPG}.jpg; done

Selgitame mõned `convert` lipud lahti ka:
* `$file` lähtefaili nimi, mis saadakse for-tsüklist
* `-resize 300x` määrab pildi laiuseks 300px, kõrgust muudetakse proportsionaalselt (`300x300` näiteks teeks pildi pikima külje 300-piksliseks)
* `-quality 85` vähendab kvaliteeti 15% võrra
* `p-$file` määrab uue faili nime võttes lähtefaili ja liites sellele ette "p-"

Nipid pärinevad artiklist [Become an ImageMagick Ninja: Doing Things in Batches](http://www.openlogic.com/wazi/bid/188098/).
