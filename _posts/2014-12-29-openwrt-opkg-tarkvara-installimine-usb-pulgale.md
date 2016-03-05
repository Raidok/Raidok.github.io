---
layout: post
title: Tarkvara paigaldamine välisele mäluseadmele
categories: postitused
tags: linux openwrt
image: openwrt.png
---
Eelnevalt olen kirjutanud, kuidas [kogu OpenWRT tarkvara mälupulgalt jooksutada]({% post_url 2014-08-25-openwrt-extroot %}), see kord aga üksikute pakkide installimist nii, et põhisüsteem asub endiselt sisemälus.



Paigaldame järnevad pakid:

* `kmod-usb-storage` - USB-mäluseadmete tuvastamiseks
* `kmod-fs-ext4` - ext2/3/4 failisüsteemide tugi
* `block-mount` - väliste mäluseadmete automaatseks mountimiseks

    opkg update
    opkg install kmod-usb-storage kmod-fs-ext4 block-mount

Ühendame külge mälupulga, mis oleks näiteks ext2 failisüsteemi formaaditud ja veendume, et see tuvastati `dmesg` ja/või `ls sd*` abil.



#Mäluseadmete automaatne mountimine

Järgnev tuvastab mäluseadmed ja kirjutab tulemuse fstab-faili.

    block detect > /etc/config/fstab

Avame selle faili näiteks `vi`-editoriga ja muudame alumises plokis ära `enabled` väärtuse ja lisame `fstype`, `options` ja `enabled_fsck` read, tulemuseks midagi sarnast:

    config 'global'
        option  anon_swap       '0'
        option  anon_mount      '0'
        option  auto_swap       '1'
        option  auto_mount      '1'
        option  delay_root      '5'
        option  check_fs        '0'

    config 'mount'
        option  target  '/mnt/usb'    
        #option device  '/dev/sda1'                           
        option  uuid    '59393a7a-9d3c-44f2-bfaa-b54f0bf8148f'
        option  fstype  'ext2'   
        option  options 'rw,sync'  
        option  enabled_fsck    '0'
        option  enabled '1'

Seadme adresseerimiseks võib kasutada `uuid` kui ka `device` rida, kuid mitte neid mõlemaid korraga. Seadmelink `/dev/sda1` võib mitme mäluseadme korral muutuda, seega kindlam on kasutada UUID-d, mis on igal mäluseadmel unikaalne.

Järgmiseks proovime mountida:

    /etc/init.d/fstab start

Ja et see automaatselt igal käivitusel toimuks, siis:

    /etc/init.d/fstab enable



#Profiili seadistamine

Süsteemi profiili (`/etc/profile`) on vaja sisse viia mõningased muudatused, et mälupulgale installitud tarkvara mugavalt kättesaadav oleks:

    export USB=/mnt/usb
    export PATH=$PATH:$USB/usr/bin:$USB/usr/sbin
    export LD_LIBRARY_PATH=$USB/lib:$USB/usr/lib



#OPKG sihtkoha lisamine

Selleks, et paketihaldur oskaks uut asukohta kasutada, lisame selle `opkg` sihtkohtade hulka. Selleks tuleb `/etc/opkg.conf` faili lisada järgnev rida: 

    dest usb /mnt/usb



#Pakettide installimine

Palju ei muutu, vaja vaid `-d usb` parameeter lisada, näiteks:

    opkg -d usb install screen

Et edaspidi kogemata sisemälu täis ei installiks, tasub see aliaseks teha, lisades järgnev rida `/etc/profile` faili:

    alias opkg="opkg -b usb"

Kui peaks olema vaja siiski sisemällu midagi installida, saab selle üle kirjutada määrates `-d`-le uus väärtus:

    opkg -d root install screen



Allikad:

* [Fstab Configuration](http://wiki.openwrt.org/doc/uci/fstab)
* [Installing packages into USB on TL-WDR4300 OpenWRT](http://nixorids.blogspot.com/2013/03/installing-packages-into-usb-on-tl.html)
