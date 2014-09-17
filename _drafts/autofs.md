---
layout: post
title: Autofs
categories: postitused
tags: linux debian ubuntu
image: linux.png
---
Võrgukettastelt andmete mugavaks kättesaamiseks on olemas vinge tööriist `autofs`!

Paigaldame paketi:

    sudo apt-get install autofs

Lisame fail `/etc/auto.master` lõppu rea:

    /nfs   /etc/auto.nfs

Loome faili `/etc/auto.nfs` ja lisame sinna rea:

    Raido   -fstype=nfs,rw,hard,intr,rsize=8192,wsize=8192   nas:/shares/Raido

Esimeses veerus on nimi, mis saab olema kataloogi nimeks asukohas `/nfs`, viimases veerus on kataloogi tegelik asukoht võrgus ja keskmises veerus on *mountimiseks* vajalikud parameetrid (muuta vastavalt vajadusele). Antud juhul haagitakse `nas:/shares/Raido` asukohta `/nfs/Raido`.

Lisalugemist:

* [Autofs Ubuntu community wikis](https://help.ubuntu.com/community/Autofs)
