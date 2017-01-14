---
layout: post
title: Raspberry Pi mälukaardi eluea pikendamine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
SD-mälukaartidele saab andmeid kirjutada ja sealt lugeda blokkide kaupa. Unixi ja Linuxi laadsed operatsioonisüsteemid aga koosnevad paljudest väikestest failidest. See on suhteliselt ebaefektiivne kooslus ja sellepärast tasuks teha kõik võimalik, et mälukaardi eluiga võimalikult pikk oleks.


## Mälukaardi ettevalmistamine

Laadisin Raspberry Pi kodulehelt alla uusima Raspbiani distro.

Kindluse mõttes kontrollisin paki terviklikkust:

    shasum 2016-09-23-raspbian-jessie-lite.zip

Tulemus oli `3a34e7b05e1e6e9042294b29065144748625bea8` ehk sama, mis kodulehel, seega allalaadimine oli edukas.

Pakime lahti:

    unzip 2016-09-23-raspbian-jessie-lite.zip

Ühendame külge SD-kaardi ja uurime, mis tema nimi on:

    df -h

Minul on see `/dev/sdb`. Kirjutame andmed kaardile:

    sudo dd bs=1M if=2016-09-23-raspbian-jessie-lite.img of=/dev/sdb

Kingston SDCA10/16GB väljund:

    1325+0 records in
    1325+0 records out
    1389363200 bytes transferred in 26.721573 secs (51994065 bytes/sec)

Samsung MB-MC16D väljund:

    1325+0 records in
    1325+0 records out
    1389363200 bytes transferred in 100.648386 secs (13804128 bytes/sec)

See võtab pisut aega ja enne lõpetamist terminali mingeid teateid ise ei väljasta. Vaheseisu saab näha cajutades CTRL+T. Peale lõpetamist ei tasu unustada mälukaart turvaliselt eemaldada.


Nüüd tuleb mälukaart ja võrgujuhe Raspberry Pi külge ühendada ja sisse logida:

    ssh pi@192.168.1.10

Teeme ära esmased uuendused ja siis restardi:



Minutike hiljem võib proovida uuesti sisse logida ja siis juba näiteks asuda [mälukaardi eluea pikendamisega tegelema](/postitused/raspberry-pi-malukaardi-eluea-pikendamine).
