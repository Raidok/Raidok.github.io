---
layout: post
title: Mugava meediakeskuse otsinguil
categories: postitused
tags: raspberry-pi xbmc kodi linux ubuntu meedia
image: xbmc.png
---
Olen kuid püüdnud leida meediaplatvormi televiisorile, millest oleks mugav näiteks filme vaadata. Kunagi aastaid tagasi jäi mulle silma [XBMC](http://xbmc.org/). Tegu on avatud lähtekoodiga ja suure kommuuniga meediakeskuse tarkvaraga. Asusin katsetama.

![Pilt XBMC-st](xbmc_about.jpg)

Pilt [XBMC kodulehelt](http://xbmc.org/about/).

## Raspberry Pi

Spetsiaalset PC-d mul selle jaoks loovutada pole, kuid olemas on [Raspberry Pi](http://www.raspberrypi.org/). Katsetasin kahte distributsiooni: [Raspbmc](http://www.raspbmc.com/) ja [OpenELEC](http://openelec.tv/).

Kumbki ei jätnud eriti head muljet. OpenELEC tundus pisut kiirem, kuid üldiselt menüüdes liikumine oli vaevarikas ja uimane. TV3 saadete striimimine läbi XBMC ametlikus repositooriumis oleva lisaprogrammiga oli õudus. Video avamine võttis kohati aega kuni 10 sekundit ning kui lõuks mängima hakkas, ei olnud heli ja pilt sünkroonis. Seda mõlema distributsiooniga. Ilmselgelt on mõlemad projektid Raspberry peal veel lapsekingades ja tuleb teha veel tohutult optimeerimist, et see mugavaks ja stabiilseks ükskord saaks.

Selles võib muidugi süüdistada riistvara ka. Raspberry Pi näol on tegemist küll võimeka graafikaprotsessoriga, kuid põhiprotsessor on nõrgemavõitu. Kuna graafikakiirendust kasutavad väga vähesed rakendused, langeb enamus tegevustest protsessorile. Sellel hetkel tundus Raspberry Pi tupikteena ja ma ei usu, et üldse väga paraneb, seega asusin otsima uut lahendust.

## Apple TV

![Apple TV](appletv.jpg)

Pilt [MacOSx86 blogist](http://www.macgeekblog.com/blog/archive/category/appletv).

Juhtusin sellise tasapisi ajaloo hõlma vajuva seadme otsa nagu Apple TV. Sellest on nüüdseks juba teine ning ka kolmas põlvkond välja tulnud, mis on vanimast kordades pisemad, kuid riistava poolest on sisuliselt tegu ekraanita iPod Touchidega.

Pildiloleval mudelil on aga 1GHz Pentium M protsessor, 256 MB muutmälu, nvidia graafikakaart 64MB videomäluga ja 40 või 160 GB mahuga PATA kõvaketas. Lugesin ka, et sisemine WiFi-kaart on võimalik asendada Broadcomi CrystalHD kaardiga, ning suurem osa videote mängimisest tulevast koormusest protsessori pealt ära võtta.

Sobiva katsealuse leidsingi [Hinnavaatluse foorumist](http://foorum.hinnavaatlus.ee/), kus sellel hetkel just müüdi Apple TV-d koos CrystalHD lisakaardiga. Suure tuhinaga sai alguses kohe värske [OpenELEC](http://openelec.tv/)-i versioon XBMC-st USB-mälupulga abil peale laetud ja internetist ägedaid lisaprogramme otsima hakatud, mis aga ei läinud kuigi sujuvalt. Mitmeid lisasid ja kolmandate osapoolte repositooriume lisades sain veateate, et kataloogi installitava zip-arhiivi struktuur pole õige. Suure hädaga sain nad lõpuks küll käsitsi paigaldatud, kuid probleeme tekkis veel. Uurisin alternatiive.

Leidsin [Crystalbuntu](http://www.crystalbuntu.com/). Tegu on just sellele kooslusele (Apple TV 1G + CrystalHD) mõeldud Ubuntu distributsiooniga.	Detailsete [Wiki](http://www.crystalbuntu.com/wiki/user/) artiklite abil sai see sisemisele kõvakettale OpenELECi asemele paigaldatud. Pluginate paigaldamisel ei tekkinud mingeid komplikatsioone, kasutajaliideses on juures mõned kellad-viled ja tundub pisut kiiremgi olevat.

### Update: XBMC -> Kodi upgrade

Järgnev on pärit [OSMC foorumist](http://forum.osmc.tv/showthread.php?tid=16811). Proovisin ka ise järgi ja perfoormans paranes OLULISELT!


Logime atv-sse sisse ja peatame xbmc:

    sudo initctl stop xbmc

Tõmbame Kodi alla ja pakime lahti:

    sudo wget https://dl.dropboxusercontent.com/u/27641650/Kodi.14.1.RC1.CHD.tar.gz
    sudo tar xzvf Kodi.14.1.RC1.CHD.tar.gz -C /

Paigaldame sõltuvused (siinkohal tänud foorumikasutajale Kraqh3d):

    sudo apt-get install libxss1
    wget https://launchpad.net/~team-xbmc/+archive/ubuntu/ppa/+files/libsdl2_2.0.3%2Bz4~20140315-8621-1ppa1precise1_i386.deb
    sudo dpkg -i libsdl2* && sudo rm libsdl2_2.0.3+z4~20140315-8621-1ppa1precise1_i386.deb

Teeme igaks juhuks kasutaja konfist tagavara koopia:

    cp -a /home/atv/.xbmc   /home/atv/.xbmc.backup

Tõe hetk - käivitus:

    sudo initctl start xbmc

Kui millegipärast ei meeldinud, siis sellega saab Kodi peatada:

    sudo initctl stop xbmc

Ja XBMC peale tagasi minemiseks:

    sudo tar xzvf xbmc.tar.gz -C /
    sudo mv /home/atv/.xbmc.backup  /home/atv/.xbmc
    sudo initctl start xbmc


#### Troubleshooting:

Kui tundub, et miski ei tööta nii nagu võiks, võib proovida Kodi käsurealt käima panna nii:

    sudo xinit /usr/xbmc/bin/kodi --standalone &

Kui viskab vigu seoses `libcurl.so.4`, proovi järgnevat:

    sudo rm /usr/lib/libcurl.so.4
    sudo ln -s /usr/lib/i386-linux-gnu/libcurl-gnutls.so.4.2.0 /usr/lib/libcurl.so.4



### Jõudlus

Seadsin Raspberry Pi võrku ja tema külge ühe NTFS ja ühe ext2 failisüsteemiga ketta, milliste peal asusid mõningad erineva kvaliteediga filmid. Üle võrgu jagasin faile NFS-i abil, millest oli juttu [Raspberry Pi seadistamise artiklis](/postitused/peata-torrentiklient-raspberry-pi-ga/). Ühendusin kolmandast masinast mõlemasse neisse SSH kaudu ja käivitasin koormuse jälgimiseks programmi `top`.

720p NTFS kettalt:
 - Raspberry Pi: põhikoormust tekitas NTFS-failisüsteemi lahtitõlgendamine, keskmiselt võttis see kuskil 30% protsessori ressursist. Sinna juurde veel ~10% NFS-deemonile
 - AppleTV: keskmiselt ~30% ulatuses hõivatud

720p ext2 kettalt:
 - Raspberry Pi: Põhiliselt vaid NFS-deemon ~10%
 - AppleTV: samamoodi ~30%, tema jaoks ei muutunud ju miskit :)

1080p ext2 kettalt:
 - Raspberry Pi: protsessori kasutus 15% ringis
 - AppleTV: umbes 50%

Videote mahamängimine ning ka edasi-tagasi kerimine on sujuvad. Ainukene õrn koht on käivitus. Esimestel sekunditel, eriti 1080p puhul, on üldjuhul kuulda ainult heli, mõned sekundid tuleb ka pilt, mis kiirelt helile järgi kerib ja ülejäänud aja ilusti sünkroonis püsib.

Proovisin korra ka teisi rakendusi tasutale tööle panna - halb mõte. Üksikudki katkumised video esituses on häirivad ja rikuvad filmielamust. Raspberry Pi seevastu sobib taustatoiminguteks piisavalt hästi. ;)

### Lisad XBMC-le

Järgnevalt toon välja mõningad lisad, mis olen paigaldanud, et elu lihtsamaks teha:

- [Bello teema](http://forum.xbmc.org/showthread.php?tid=158577&pid=1358910) (ametlik repo) - väga kena ja võimekas
- TV3Play (ametlik repo) - TV3-e saated
- ERR, ETV arhiiv, Delfi videod, Kanal2 ([Üllar Pajus-e XBMC repo](https://github.com/yllar/yllar-xbmc-repo/tree/master/repo/repository.yllar)) - mitteametlikud pluginad, millega saab mugavalt vaadata videosid, mis nimetatud veebilehtedelgi üleval on
- [xbmx-wiimote](https://github.com/paulvt/xbmc-wiimote) - võimaldab Wii puldiga XBMC-d juhtida (kiirem, rohkem nuppe, ei vaja otsenähtavust sest ühendub bluetoothiga)
- [play-to-xbmc](https://chrome.google.com/webstore/detail/play-to-xbmc/fncjhcjfnnooidlkijollckpakkebden/related) Chrome plugin


