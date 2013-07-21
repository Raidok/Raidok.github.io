---
layout: default
title: Peata torrentiklient Raspberry Pi-ga
categories: postitused
tags: raspi raspbian raspberry pi linux transmission torrent
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

    ssh pi@192.168.1.148

Kui mälukaart on suurem kui 2GB, tasub proovida järgmist:

    sudo raspi-config

Sealt valida Expand Filesystem ja jälgida juhiseid, pärast seda teha Pi-le taaslaadimine.


## Välise kõvaketta ühendamine

Selleks, et SD-kaart liiga ruttu ära ei sureks, kasutame andmete jaoks ikkagi kõvaketast. Silmas tuleks pidada seda, et kõvaketas oma toite mujalt saaks, sest Raspberry ei suuda teda piisava vooluga toita.

Kui valitud kettal on failisüsteemiks NTFS, installime ntfs-3g:

    sudo apt-get install ntfs-3g 

Kui ketas on küljes, uurime välja tema UUID:

    ls -l /dev/disk/by-uuid/

Tulemus:

    lrwxrwxrwx 1 root root 15 Jun  9 14:24 41cd5baa-7a62-4706-b8e8-02c43ccee8d9 -> ../../mmcblk0p2
    lrwxrwxrwx 1 root root 15 Jan  1  1970 5D2D-B09A -> ../../mmcblk0p1
    lrwxrwxrwx 1 root root 10 Jun  9 14:34 FC349EB6349E737E -> ../../sda1

Teeme kettale haakekoha, mina panen talle nimeks lacie:

    sudo mkdir /mnt/lacie

Mind huvitab viimane. Avame fstab faili:

    sudo nano /etc/fstab

Selle faili ülesanne on bootimisel kettad automaatselt ära mountida. Lisame sinna NTFS-failisüsteemi puhul lõppu rea:

    UUID=FC349EB6349E737E   /mnt/lacie      ntfs-3g defaults,umask=002,uid=1000,gid=1000    0       2

See rida annab kasutajale pi ja grupile pi täielikud õigused. Ülejäänutele ei anta kirjutamisõigust, kuid nad saavad faile lugeda ja käivitada.

UUID asemel oleks võinud ka seadmenime (nt /dev/sda1) kasutada, kuid see võib muutuda, kui külge on ühendatud muid mäluseadmeid.

Et muudatused jõustuksid:

    sudo mount -a

## Torrentikliendi seadistamine

Teeme allalaadimiste jaoks kausta:

    mkdir /mnt/lacie/Allalaadimised

Muudame konfiguratsioonifaili:

    sudo nano /etc/transmission-daemon/settings.json

Tehtud muudatused rasvaselt:

<pre>
{
    "alt-speed-down": 50,
    "alt-speed-enabled": false,
    "alt-speed-time-begin": 540,
    "alt-speed-time-day": 127,
    "alt-speed-time-enabled": false,
    "alt-speed-time-end": 1020,
    "alt-speed-up": 50,
    "bind-address-ipv4": "0.0.0.0",
    "bind-address-ipv6": "::",
    "blocklist-enabled": false,
    "blocklist-url": "http://www.example.com/blocklist",
    "cache-size-mb": 4,
    "dht-enabled": true,
    "download-dir": "/mnt/lacie/Allalaadimised",
    "download-limit": 100,
    "download-limit-enabled": 0,
    "download-queue-enabled": true,
    "download-queue-size": 5,
    "encryption": 1,
    "idle-seeding-limit": 30,
    "idle-seeding-limit-enabled": false,
    "incomplete-dir": "/root/Downloads",
    "incomplete-dir-enabled": false,
    "lpd-enabled": false,
    "max-peers-global": 200,
    "message-level": 2,
    "peer-congestion-algorithm": "",
    "peer-limit-global": 240,
    "peer-limit-per-torrent": 60,
    "peer-port": 51413,
    "peer-port-random-high": 65535,
    "peer-port-random-low": 49152,
    "peer-port-random-on-start": false,
    "peer-socket-tos": "default",
    "pex-enabled": true,
    "port-forwarding-enabled": false,
    "preallocation": 1,
    "prefetch-enabled": 1,
    "queue-stalled-enabled": true,
    "queue-stalled-minutes": 30,
    "ratio-limit": 2,
    "ratio-limit-enabled": false,
    "rename-partial-files": true,
    "rpc-authentication-required": false,
    "rpc-bind-address": "0.0.0.0",
    "rpc-enabled": true,
    "rpc-password": "{9e28ec9ed22406ac4f3adcb39c08e148b95385d9IsVXyXVd",
    "rpc-port": 9091,
    "rpc-url": "/transmission/",
    "rpc-username": "transmission",
    "rpc-whitelist": "127.0.0.1",
    "rpc-whitelist-enabled": false,
    "scrape-paused-torrents-enabled": true,
    "script-torrent-done-enabled": false,
    "script-torrent-done-filename": "",
    "seed-queue-enabled": false,
    "seed-queue-size": 10,
    "speed-limit-down": 100,
    "speed-limit-down-enabled": false,
    "speed-limit-up": 100,
    "speed-limit-up-enabled": false,
    "start-added-torrents": true,
    "trash-original-torrent-files": false,
    "umask": 18,
    "upload-limit": 100,
    "upload-limit-enabled": 0,
    "upload-slots-per-torrent": 14,
    "utp-enabled": true
}
</pre>

Transmission töötab kasutajanime debian-transmission alt. Selleks, et Transmission saaks kettale midagi kirjutada, lisame ta gruppi pi:

    sudo usermod -G pi debian-transmission

Et muudatused rakenduksid:

    sudo service transmission-daemon reload

Teenus on nüüd võrgu kaudu kättesaadav pordilt 9091, näiteks `http://192.168.1.148:9091`.

Alternatiivina on loodud ka klientprogramm põhilisemate platvormide jaoks - Transmission Remote GUI. 

Nii poolikud kui ka lõpetanud torrentid asuvad eespoolmääratud kaustas. Uurisin, et kas oleks kuidagi võimalik torrenteid ka grupeerida ja selle põhjal skripte jooksutada, mis lõpetades nad sobivasse kohta ümber liigutaks ja jätkaks jagamist sealt. Näiteks videote gruppi määratud torrent võiks peale lõpetamist automaatselt kausta "Videod" sattuda. Selle kohta on 4 aastat tagasi üks ticket avatud ning ka patch tehtud, kuid lõppversiooni see veel jõudnud kahjuks pole.


## Failide jagamine kohalikus võrgus

### NFS-server:

Raspberry Pi-le installime paki nfs-kernel-server:

    sudo apt-get install nfs-kernel-server

Asukoha jagamiseks tuleb muuta faili /etc/exports:

    sudo nano /etc/exports

Lisame sinna midagi sellist:

    /mnt/lacie 192.168.1.0/24(rw,no_subtree_check,async)

Muudatuste rakendamiseks jooksutame järgmised käsud:

    sudo exportfs -av
    sudo service nfs-kernel-server restart
    sudo service rpcbind restart

Klientarvutis on vaja jooksutada järgmised käsud:

    sudo apt-get install nfs-common
    sudo mkdir /mnt/lacie


Lisame kausta kohta fstabi näiteks sellise rea:

    192.168.1.148:/mnt/lacie        /mnt/lacie      nfs     rsize=8192,wsize=8192,timeo=14,intr


### DLNA-server:

Tahaks telekaga ka faile otse Raspberryst striimida. Pole probleemi!

    sudo apt-get install minidlna

Meediakataloogide lisamiseks avame konfifaili:

    sudo nano /etc/minidlna.conf

Skännimise alustamiseks:

    sudo service minidlna force-reload

Skännimise progressi saab vaikimis jälgida pordi 8200 kaudu: `http://192.168.1.148:8200`

