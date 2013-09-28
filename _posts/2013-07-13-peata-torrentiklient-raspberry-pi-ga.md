---
layout: post
title: Peata torrentiklient Raspberry Pi-ga
categories: postitused
tags: raspbian raspberrypi linux transmission torrent
---

Tekkis tahtmine torrentite jagamine keskseks ja mugavaks teha ilma, et peaks suurt arvutit selleks pidevalt töös hoidma. Samas võiks olla ka keskne koht, kus pilte ja videosid hoida ja neid vajadusel telekasse striimida. Raspberry Pi tundub selle jaoks hea lahendusena.


## Välised kõvakettad

Selleks, et SD-kaart liiga ruttu ära ei sureks, kasutame andmete jaoks ikkagi kõvaketast. Silmas tuleks pidada seda, et kõvaketas oma toite mujalt saaks, sest Raspberry ei suuda teda piisava vooluga toita.

Näiten ühendan kaks ketast - üks NTFS ja teine ext2 failisüsteemiga.

NTFS failisüsteemi puhul on vaja installida ntfs-3g:

    sudo apt-get install ntfs-3g 

Kui andmekandjad on külge ühendatud, uurime välja UUID-d:

    ls -l /dev/disk/by-uuid/

Tulemus:

    lrwxrwxrwx 1 root root 15 Jun  9 14:24 41cd5baa-7a62-4706-b8e8-02c43ccee8d9 -> ../../mmcblk0p2
    lrwxrwxrwx 1 root root 15 Jan  1  1970 5D2D-B09A -> ../../mmcblk0p1
    lrwxrwxrwx 1 root root 10 Jun  9 14:34 FC349EB6349E737E -> ../../sda1
    lrwxrwxrwx 1 root root  9 Jun  9 14:34 8927e762-8675-4604-b7a4-fe17724df4ec -> ../../sdb

Teeme kettastele haakekohad:

    sudo mkdir /mnt/lacie
    sudo mkdir /mnt/pata

Mind huvitab viimane. Avame fstab faili:

    sudo nano /etc/fstab

Selle faili ülesanne on bootimisel kettad automaatselt ära mountida. Lisame sinna NTFS-failisüsteemi puhul lõppu rea:

    UUID=FC349EB6349E737E                       /mnt/lacie  ntfs-3g   defaults,umask=002,uid=1000,gid=6       0       2
    UUID=8927e762-8675-4604-b7a4-fe17724df4ec   /mnt/pata   ext2      defaults                                0       2

Kuna NTFS ei toeta kasutajate õiguste määramist, tuleb need mountimisel määrata. Nende lipukestega antakse kasutajale pi ja grupile disk täielikud õigused. Ülejäänutele ei anta kirjutamisõigust, kuid nad saavad faile lugeda ja käivitada.

UUID asemel oleks võinud ka seadmenime (nt /dev/sda1) kasutada, kuid see võib muutuda, kui külge on ühendatud muid mäluseadmeid.

Vaikimisi on Debian seadistatud nii, et kui käivitamisel fstab-i seatud kettaid ühendatud pole või on nende failisüsteem viga saanud, jäädakse kasutaja sisestust ootama (Ctrl+D). Kuna nagu artikli pealkiri ütleb, on tegu peata seadistusega ehk siis ta peab ise hakkama saama ja võimaldama SSH kaudu ligi pääseda. Selleks tuleb muuta ühte faili:

    sudo nano /etc/init.d/checkfs.sh

Seal tuleb `FSCKFIX=no` muuta `FSCKFIX=yes`-iks ehk 17. rida peaks saama selliseks:

    [ "$FSCKFIX" ] || FSCKFIX=yes

Et muudatused jõustuksid:

    sudo mount -a


## Torrentiklient

Paigaldame torrentikliendi:

    sudo apt-get install transmission-daemon

Teeme allalaadimiste jaoks kausta:

    mkdir /mnt/lacie/Allalaadimised

Konfiguratsioonifaili on mõttekas muuta ainult siis, kui deemon ei tööta, sest peatumisel kirjutatakse seadistuste fail üle.

    sudo service transmission-daemon stop
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
    <b>"download-dir": "/mnt/lacie/Allalaadimised",</b>
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
    <b>"rpc-authentication-required": false,</b>
    "rpc-bind-address": "0.0.0.0",
    "rpc-enabled": true,
    "rpc-password": "{9e28ec9ed22406ac4f3adcb39c08e148b95385d9IsVXyXVd",
    "rpc-port": 9091,
    "rpc-url": "/transmission/",
    "rpc-username": "transmission",
    "rpc-whitelist": "127.0.0.1",
    <b>"rpc-whitelist-enabled": false,</b>
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

    sudo usermod -G disk debian-transmission

Jaa käivitame:

    sudo service transmission-daemon start

Teenus on nüüd võrgu kaudu kättesaadav pordilt 9091, näiteks `http://192.168.1.10:9091`.

Alternatiivina on loodud ka klientprogramm põhilisemate platvormide jaoks - Transmission Remote GUI. 

Nii poolikud kui ka lõpetanud torrentid asuvad eespoolmääratud kaustas. Uurisin, et kas oleks kuidagi võimalik torrenteid ka grupeerida ja selle põhjal skripte jooksutada, mis lõpetades nad sobivasse kohta ümber liigutaks ja jätkaks jagamist sealt. Näiteks videote gruppi määratud torrent võiks peale lõpetamist automaatselt kausta "Videod" sattuda. Selle kohta on 4 aastat tagasi üks ticket avatud ning ka patch tehtud, kuid lõppversiooni see veel jõudnud kahjuks pole.


## Failide jagamine

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

    192.168.1.10:/mnt/lacie        /mnt/lacie      nfs     rsize=8192,wsize=8192,timeo=14,intr


### DLNA-server:

Tahaks telekaga ka faile otse Raspberryst striimida. Pole probleemi!

    sudo apt-get install minidlna

Meediakataloogide lisamiseks avame konfifaili:

    sudo nano /etc/minidlna.conf

Skännimise alustamiseks:

    sudo service minidlna force-reload

Skännimise progressi saab vaikimis jälgida pordi 8200 kaudu: `http://192.168.1.10:8200`


## Automatiseerimine :)

Kontrollime, et git oleks paigaldatud:

    sudo apt-get install git-core

### Couch Potato

Kloonime repositooriumi:

    cd ~ && git clone https://github.com/RuudBurger/CouchPotatoServer.git

Liigutame kohta, kus ta ette ei jää:

    sudo mv CouchPotatoServer/ /opt/couchpotato/

Liigume ise järgi:

    cd /opt/couchpotato/

Teeme eraldi kasutaja:

    sudo useradd --system --user-group --no-create-home couchpotato
    sudo usermod -G disk couchpotato

Määrame õigused:

    sudo chown -R couchpotato:couchpotato /opt/couchpotato

Kopeerimie init-skripti:

    sudo cp init/ubuntu /etc/init.d/couchpotato

Muudame pisut sisu:

    sudo nano /etc/init.d/couchpotato

Viime sisse järgmise muudatuse:

    CP_APP_PATH=${APP_PATH-/opt/couchpotato/}
    CP_RUN_AS=${RUN_AS-couchpotato}

Teeme skripti käivitatavaks:

    sudo chmod +x /etc/init.d/couchpotato

Lisame käivitatavate rakenduste hulka:

    sudo update-rc.d couchpotato defaults

Käivitame:

    sudo service couchpotato start

Ava brauseris `localhost:5050` ja asu seadistama. Soovitan NZB-d välja lülitada ja siduda ära Transmissioniga.

### Sick Beard

Kloonime repositooriumi:

    cd ~ && git clone https://github.com/xbianonpi/Sick-Beard-TPB.git

Liigutame ära:

    sudo mv Sick-Beard-TPB/ /opt/sickbeard/

Liigume järgi:

    cd /opt/sickbeard/

Teeme rakenduse jaoks eraldi kasutaja:

    sudo useradd --system --user-group --no-create-home sickbeard
    sudo usermod -G disk sickbeard

Määrame omanikuks:

    sudo chown -R sickbeard:sickbeard /opt/sickbeard
    sudo chmod ug+rw /opt/sickbeard/autoProcessTV/

Kopeerime init-skipti:

    sudo cp init.ubuntu /etc/init.d/sickbeard

Teeme skripti käivitatavaks:

    sudo chmod +x /etc/init.d/sickbeard

Lisame käivitatavate rakenduste hulka:

    sudo update-rc.d sickbeard defaults

Rakenduse toimimiseks on vajalikud veel mõningad pakid:

    sudo apt-get -y install python2.6 python-cheetah python-openssl par2

PID-kausta õigused:

    sudo chgrp sickbeard /var/run/sickbeard
    sudo chmod g+w /var/run/sickbeard

Käivitame:

    sudo service sickbeard start


