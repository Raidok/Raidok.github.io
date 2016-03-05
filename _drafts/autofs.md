---
layout: post
title: Autofs
categories: postitused
tags: linux debian ubuntu
image: linux.png
---
Võrgukettastelt andmete mugavaks kättesaamiseks on olemas vinge tööriist `autofs`!


# NFS-failisüsteemi kasutamine

Oletame, et võrguketta nimi on `nas` ja kontrollime, mis masinatele mis katalooge välja jagatakse:

    showmount -e nas

Tulemus võiks olla midagi sarnast:

    Export list for cb:
    /shares/Raido    raal.lan
    /shares/Family   192.168.1.0/24

Antud juhul on mul NFS-server seadistatud nii, et `/shares/Raido` kaustale saab `raal` kirjutamisõigusega ja `/shares/Family` kaustale kogu *subnet* lugemisõigusega ligi.


# AutoFS paigaldamine ja seadistamine

Paigaldame paketi:

    sudo apt-get install autofs

Lisame fail `/etc/auto.master` lõppu rea:

    /nfs   /etc/auto.nfs

Loome faili `/etc/auto.nfs` ja lisame sinna rea:

    Raido   -fstype=nfs,rw,hard,intr,rsize=8192,wsize=8192   nas:/shares/Raido

Esimeses veerus on nimi, mis saab olema kataloogi nimeks asukohas `/nfs`, viimases veerus on kataloogi tegelik asukoht võrgus ja keskmises veerus on *mountimiseks* vajalikud parameetrid (muuta vastavalt vajadusele). Antud juhul haagitakse `nas:/shares/Raido` asukohta `/nfs/Raido`.

Lisalugemist:

* [Autofs Ubuntu community wikis](https://help.ubuntu.com/community/Autofs)
