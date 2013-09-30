---
layout: post
title: SD-kaardi eluea pikendamine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

Raspberry Pi Raspbiani distributsioon on koostatud selliselt, et mahub napilt ära 2-gigasele mälukaardile. Tänu sisseehitatud sektorite kulumise ühtlustamise mehhanismidele võib mälukaart töötavad operatsioonisüsteemi kandes aastaid vastu pidada. See aga eeldab, et mälukaardil on piisavalt vaba ruumi. Kui mälukaardil on sama palju vaba ruumi, kui kasutatud, võib tema eluiga pikeneda enam kui kaks korda. Raspiani jaoks on väga mõistlik kasutada näiteks 8 GB SD-kaarti.


## Swappimine

Raspbian swap-partitsiooni ei kasuta, küll aga luuakse käivitusel siiski 100 MB suurune swap-fail. Eemaldame selle funktsionaalsuse:

    sudo apt-get remove dphys-swapfile


## Lipuke 'noatime'

Failist `/etc/fstab` tasub kontrollida, kas põhipartitsioonil on `noatime` lipuke määratud.

    sudo nano /etc/fstab
    
Seal peaks olema umbes sarnane rida:

    /dev/mmcblk0p2  /               ext4    defaults,noatime        0       1

Mida see teeb, on see, et ei lase failisüsteemil igat faili avamise aega talletada, hoides kokku kirjutamistsüklite pealt.


## RAM-failisüsteemid

Linuxilistel on failisüsteemis kaks kataloogi, mida kasutatakse päris tihedalt. Need on `/tmp` ajutiste failide jaoks ja `/var/log` logifailide pidamiseks. Esimese neist võiks julgelt RAM-failisüsteemile paigutada, teisega kaasneb üks risk - nimelt ei ole selle sisu peale taaskäivitust enam alles. Igatahes, nende loomine käib lihtsalt. Tuleb avada jällegi avada `/etc/stab`:

    sudo nano /etc/fstab

ja sinna lisada:

    tmpfs           /tmp            tmpfs   nodev,nosuid,size=50M   0       0
    tmpfs           /var/log        tmpfs   nodev,nosuid,size=50M   0       0
