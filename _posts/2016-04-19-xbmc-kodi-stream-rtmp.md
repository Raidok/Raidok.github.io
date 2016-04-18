---
layout: post
title: Live streamide vaatamine Kodi/XBMC-ga
categories: postitused
tags: linux raspberry-pi xbmc linux
image: xbmc.png
---
Kuna hetkel istuvad linnud pesadel ja munevad või hauduvad mune, siis tekkis tahtmine seda telekasse striimida. Telekas koos Raspbery Pi-ga, kus jookseb [OSMC](http://osmc.tv), on iseenesest olemas ja selle koosluse kasutamine osutus õnneks üsna lihtsaks.

Kui võtta lahti [merikotka](http://pontu.eenet.ee/player/merikotkas.html) lehe lähtekood, siis sealt leiduvast infost on meile kasulikud andmed jwplayer ja need järgmised read:

    'streamer': 'rtmp://193.40.133.138/live',
    'file': 'merikotkas',

Kui nende põhjal kokku panna `rtmpdump` käsk, saab midagi sellist:

    rtmpdump -r "rtmp://193.40.133.138/live" -a "live" -W "http://pontu.eenet.ee/player/jwplayer.js" -p "http://pontu.eenet.ee/player/merikotkas.html" --live -y "merikotkas" -o test

Kui numbrid jooksma hakkavad, siis võib CTRL+C-ga selle ära katkestada ja proovida tekkinud test-nimelist faili näiteks VLC-ga avada - peaks töötama.

Nüüd tuleb see XBMC/Kodi jaoks söödavasse formaati viia.

Selleks tuleb luua näiteks `~/Videos/merikotkas.strm` fail, mille sisuks:

    rtmp://193.40.133.138/live pageURL=http://pontu.eenet.ee/player/merikotkas.html playpath=merikotkas swfUrl=http://pontu.eenet.ee/player/jwplayer.js app=live live=true

Allolevas tabelis on toodud `rtmpdump` parameetrite vastavus strm-faili omadele:

|  rtmpdump  | strm     |
|:----------:|:--------:|
| -r         | URL ise, esimese asjana failis |
| -y | playpath= |
| -W | swfUrl= |
| -p | pageURL= |
| -a | app= |
| --live | live=true |




# Mõned näited


## [pontu.eenet.ee](http://pontu.eenet.ee)

merikotkas.strm:

    rtmp://193.40.133.138/live pageURL=http://pontu.eenet.ee/player/merikotkas.html playpath=merikotkas swfUrl=http://pontu.eenet.ee/player/jwplayer.js app=live live=true

kakk.strm:

    rtmp://193.40.133.138/live pageURL=http://pontu.eenet.ee/player/kakk.html playpath=kakk swfUrl=http://pontu.eenet.ee/player/jwplayer.js app=live live=true

Ehk nagu näha, taandub see järnevale skriptile, kus esimeseks parameetriks sobib "hiireviu", "kalakotkas" või näiteks "must-toonekurg":

    #!/bin/bash
    echo "rtmp://193.40.133.138/live pageURL=http://pontu.eenet.ee/player/$1.html playpath=$1 swfUrl=http://pontu.eenet.ee/player/jwplayer.js app=live live=true" > $1.strm


## [err](http://etv.err.ee/otse)

etv.strm:

    rtmp://striimid.err.ee/live pageURL=http://etv.err.ee/otse playpath=etv swfUrl=http://etv.err.ee/Content/player/swf/flowplayer.swf app=live live=true

etv2.strm:

    rtmp://striimid.err.ee/live pageURL=http://etv.err.ee/otse playpath=etv2 swfUrl=http://etv.err.ee/Content/player/swf/flowplayer.swf app=live live=true

Ehk nagu näha, taandub see järnevale skriptile, kus esimeseks parameetriks sobib "raadio2", "vikerraadio" või näiteks "klassikaraadio":

    #!/bin/bash
    echo "rtmp://striimid.err.ee/live pageURL=http://etv.err.ee/otse playpath=$1 swfUrl=http://etv.err.ee/Content/player/swf/flowplayer.swf app=live live=true" > $1.strm


Kui keegi teab mingeid striime, mida võiks ka strm-failiks ümber teisendada, andke teada näiteks all kommentaariumis!

Allikad:

* [HOW-TO Play Live TV/Internet Video in XBMC (including some sample streams!)](http://forum.kodi.tv/showthread.php?tid=93280)