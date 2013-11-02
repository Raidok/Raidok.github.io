---
layout: post
title: Arvuti komponentide andmete lugemine
categories: postitused
tags: linux ubuntu debian
image: debian.png
---
Vanasti sai microsofti operatsioonisüsteemil kasutatud selliseid programme nagu Everest, AIDA, SpeedFan ja teisigi, et arvuti komponentide kohta hea ülevaade saada. Nüüd, kui mu põhiliseks keskkonnaks on Linux, otsisin välja ja panin kokku väikese tüki, kus nimetan mõned võimalused sarnaste tulemuste saavutamiseks.


##Üldine info

Lühidat nimekirja kõikidest seadmetest annab käsk `lspci`.

Väga laia hulga infot arvuti kohta saab kuvada nii:
    sudo lshw

Sellele on olemas ka graafiline liides, paki nimi on `lshw-gtk`.


##Protsessor

Kõikvõimalik teave protsessori kohta:
    cat /proc/cpuinfo


##Graafikakaart

Üsna asjalikku infot suudab kuvata näiteks Google Chrome brauser, liikudes aadressile `about:gpu`.

NVIDIA graafikakaartide kohta saab infot programmiga `nvclock`:
    sudo apt-get install nvclock
    sudo nvclock -i

ATI graafikakaartide jaoks peaks draiveritega kaasa tulema programm `aticonfig`, sellelt saab pärida näiteks infot vasavalt töösageduste ja -temperatuuride kohta nii:
    aticonfig --odgc
    aticonfig --odgt


##Sensorite lugemine

Installime vajaliku paki:
    sudo apt-get install lm-sensors

Tuvastame sensorid:
    sudo sensors-detect

Enamjaolt saab enterit klõbistades läbi, lõpuks kuvab midagi analoogset:
    To load everything that is needed, add this to /etc/modules:
    #----cut here----
    # Adapter drivers
    nvidia
    # Chip drivers
    adt7475
    coretemp
    it87
    #----cut here----
    If you have some drivers built into your kernel, the list above will
    contain too many modules. Skip the appropriate ones!

    Do you want to add these lines automatically to /etc/modules? (yes/NO)

Kui sellele vastata "yes", tehakse seadistused automaatselt, kasutajal tarvitseb veel sisestada vaid järgnev:
    sudo service module-init-tools start

Ja nüüd saab edaspidi juba tulemusi lugeda käsklusega:
    sensors

Selleks, et mugavam jälgida oleks, võib kirjutada väikese skriptikese:
    while true; do sensors; sleep 1; done


