---
layout: post
title: Peata torrentiklient Raspberry Pi-ga
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

Tekkis tahtmine torrentite jagamine keskseks ja mugavaks teha ilma, et peaks suurt arvutit selleks pidevalt töös hoidma. Samas võiks olla ka keskne koht, kus pilte ja videosid hoida ja neid vajadusel telekasse striimida. Raspberry Pi tundub selle jaoks hea lahendusena.



## Torrentiklient

Paigaldame torrentikliendi:

    sudo apt-get install transmission-daemon

Teeme allalaadimiste jaoks kausta:

    mkdir /mnt/lacie/Allalaadimised

Seame grupiks `disk` ja teeme nii, et uued failid saaksid ka sama grupi:

    sudo chgrp disk /mnt/lacie/Allalaadimised
    sudo chmod g+s /mnt/lacie/Allalaadimised

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
    <b><u>"rpc-whitelist-enabled": false,</u></b>
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
    <b>"umask": 2,</b>
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

    sudo apt-get install -y --no-install-recommends git python-setuptools python-cheetah python-lxml python-dev libffi-dev libssl-dev python3-pip
    sudo pip install --upgrade pyopenssl



### Couch Potato

Loome spetsiaalse kasutaja:

    sudo useradd --system --user-group --create-home couchpotato

Loome kausta ja kloonime repo:

    cd /opt
    sudo mkdir couchpotato
    sudo chown couchpotato:couchpotato couchpotato
    sudo su -s /bin/bash couchpotato
    git clone --depth=1 https://github.com/CouchPotato/CouchPotatoServer.git couchpotato
    exit

Kopeerimie init-skripti:

    sudo cp /opt/couchpotato/init/ubuntu /etc/init.d/couchpotato

Muudame pisut sisu:

    sudo nano /etc/init.d/couchpotato

Veendume, et seal oleksid järgnevad read:

    CP_APP_PATH=${APP_PATH-/opt/couchpotato/}
    CP_RUN_AS=${RUN_AS-couchpotato}

Teeme skripti käivitatavaks:

    sudo chmod +x /etc/init.d/couchpotato

Lisame käivitatavate rakenduste hulka:

    sudo update-rc.d couchpotato defaults

Elu lihtsustamiseks:

    sudo su - couchpotato

Ava lemmikeditoriga `~/.couchpotato/settings.conf` ja muuda:

    url_base = couchpotato
    port = 8081

Peale seda CTRL+d või `exit`.

Käivitame:

    sudo /etc/init.d/couchpotato start

Vaikimisi asukoht on `localhost:5050` aga eelmises punktis sai see muudetud `localhost:8081/couchpotato` peale (Miks? Loe edasi). Soovitan NZB-d välja lülitada ja siduda ära Transmissioniga.




### Sick Beard

Loome spetsiaalse kasutaja:

    sudo useradd --system --user-group --create-home sickbeard

Loome kausta ja kloonime repo:

    cd /opt
    sudo mkdir sickbeard
    sudo chown sickbeard:sickbeard sickbeard
    sudo su -s /bin/bash sickbeard
    git clone --depth=1 https://github.com/junalmeida/Sick-Beard.git sickbeard
    exit

Kopeerime init-skipti:

    sudo cp /opt/sickbeard/init.ubuntu /etc/init.d/sickbeard

Teeme skripti käivitatavaks:

    sudo chmod +x /etc/init.d/sickbeard

Lisame käivitatavate rakenduste hulka:

    sudo update-rc.d sickbeard defaults

Elu lihtsustamiseks muudame faili `/opt/sickbeard/config.ini` (NB! Sickbeard ei tohi töötada samal ajal, muidu muudatused ei jää püsima):

    web_root = "/sickbeard"
    web_port = 8082

Käivitame:

    sudo /etc/init.d/sickbeard start

Vaikimisi asukoht on `localhost:8081` aga eelmises punktis sai see muudetud `localhost:8082/sickbeard` peale (Miks? Loe edasi).



### Heaphones

Loome spetsiaalse kasutaja:

    sudo useradd --system --user-group --create-home headphones

Loome kausta ja kloonime repo:

    cd /opt
    sudo mkdir headphones
    sudo chown headphones:headphones headphones
    sudo su -s /bin/bash headphones
    git clone --depth=1 https://github.com/rembo10/headphones.git headphones
    exit

Tekitame faili, kus headphones oma konfiguratsiooni hoidma hakkab:

    sudo touch /etc/default/headphones

Teeme skripti käivitatavaks:

    sudo chmod +x /opt/headphones/init-scripts/init.ubuntu

Teeme init-skriptist symlingi:

    sudo ln -s /opt/headphones/init-scripts/init.ubuntu /etc/init.d/headphones

Lisame käivitatavate rakenduste hulka:

    sudo update-rc.d headphones defaults

Elu lihtsustamiseks muuda failis `/opt/headphones/config.ini`:

    http_root = /headphones/
    http_port = 8083

Käivitame:

    sudo /etc/init.d/headphones start

Vaikimisi asukoht on `localhost:8181` aga eelmises punktis sai see muudetud `localhost:8083/headphones` peale (Miks? Loe edasi).



#Elu lihtsustamise kokkuvõte

Paigaldame nginx-i *reverse proxy* funktsionaalsust täitma:

    sudo apt-get install --no-install-recommends -y nginx

Raspbian default repodest tuli märts 2015 seisuga versioon 1.6.2.

[gist](https://gist.github.com/Raidok/b244b6a61d918ea1d931)

Loome faili `/etc/nginx/sites-available/custom` ja määrame ta sisuks midagi sellist:

    server {

        listen 80;
        listen [::]:80;
        access_log off;

        location /couchpotato/ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://localhost:8081;
        }

        location /sickbeard/ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://localhost:8082;
        }

        location /headphones/ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://localhost:8083;
        }

    }

Deaktiveerime *dfault* konfi ja aktiveerime uue:

    sudo rm /etc/nginx/sites-available/default
    sudo ln -s /etc/nginx/sites-available/custom /etc/nginx/sites-enabled/custom
    sudo /etc/init.d/nginx restart

Nüüd peaksid kõik kolm teenust
