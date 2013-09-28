---
layout: post
title: Peata torrentiklient Raspberry Pi-ga
categories: mustandid
tags: raspberry-pi linux debian
---

Tekkis tahtmine torrentite jagamine keskseks ja mugavaks teha ilma, et peaks suurt arvutit selleks pidevalt töös hoidma. Samas võiks olla ka keskne koht, kus pilte ja videosid hoida ja neid vajadusel telekasse striimida. Raspberry Pi tundub selle jaoks hea lahendusena.

## Mälukaardi ettevalmistamine

Laadisin Raspberry Pi kodulehelt alla uusima Raspbiani distro.

Kindluse mõttes kontrollisin paki terviklikkust:

    shasum 2013-05-25-wheezy-raspbian.zip

Tulemus oli `131f2810b1871a032dd6d1482dfba10964b43bd2` ehk sama, mis kodulehel, seega allalaadimine oli edukas. 

Pakime lahti:

    unzip 2013-05-25-wheezy-raspbian.zip

Ühendame külge SD-kaardi ja uurime, mis tema nimi on:

    df -h

Minul on see `/dev/sdb`. Kirjutame andmed kaardile:

    sudo dd bs=1M if=2013-05-25-wheezy-raspbian.img of=/dev/sdb

See võtab pisut aega ja enne lõpetamist terminali mingeid teateid ei väljasta. Peale lõpetamist ei tasu unustada mälukaart turvaliselt eemaldada.


Nüüd tuleb mälukaart ja võrgujuhe Raspberry Pi külge ühendada ja sisse logida:

    ssh pi@192.168.1.10

Kui mälukaart on suurem kui 2GB, tasub proovida järgmist:

    sudo raspi-config

Sealt valida Expand Filesystem ja jälgida juhiseid, pärast seda teha Pi-le taaslaadimine.

