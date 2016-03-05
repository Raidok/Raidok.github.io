---
layout: post
title: OpenWRT süsteemilogide serverisse saatmine
categories: postitused
tags: linux ubuntu openwrt ruuter
image: openwrt.png
---
Üldiselt on ressursipuudulikkuse tõttu ruuteritel süsteemilogi ehk *syslog* lahendatud mälus asuva ringpuhvrina, mis on teatud olukordades väga tülikas, sest vanad logiread kaovad sealt üsna kiiresti, et uutele ruumi teha.

Just selle jaoks tuleb appi eemalasuva syslog-serveri, näiteks [Syslog-NG](http://www.syslog-ng.org/), kasutamine. OpenWRT-l on syslog-klient, mis logisid võrgu kaudu ära saata suudab, juba baasvarustuses. Seda tuleb pisut konfida. Vaja oleks vaid serverit, kuhu logisid koguda. Mina kasutasin selleks [kodustatud LaCie CloudBoxi](/postitused/lacie-cloudbox-kodustamine/).


#Syslog-NG paigaldamine

See on üldiselt paketihaldurites saadaval. CloudBoxi või mõne muu *embedded* linuxilisel saab selle `ipkg` abil:

    ipkg install syslog-ng

Ubuntu puhul ilmselt apt-getist:

    apt-get install syslog-ng


#Syslog-NG seadistamine

Konfifail asub iseenesest `/opt/etc/syslog-ng/syslog-ng.conf` või `/etc/syslog-ng/syslog-ng.conf`, vastavalt platvormile.

Eeldusel, et failis eksisteerib analoogne rida:

    source net { udp(); };

Tuleks lisada näiteks järgnevad read:

    destination kohalikud { file("/opt/var/log/kohalikud/messages"); };
    filter f_kohalikud { netmask(192.168.1.1/255.255.255.0); };
    log { source(net); filter(f_kohalikud); destination(kohalikud); };

Mida need read teevad, on see, et kohalikust võrgust ehk siis 192.168.1.1/24 *subnetist* tulevad standardsed *syslog* sõnumid kirjuttakse faili `/opt/var/log/kohalikud/messages`. Tuleks muidugi ka veenduda, et see kaust olemas oleks:

    mkdir /opt/var/log/kohalikud

Võib asja loomulikult veel keerulisemaks teha ja rakendada teisigi filtreid, kuid minu jaoks oli põhiline, et need logid vähemalt kuskil olemas oleksid.

Pikemas perspektiivis oleks mõistlig ka `logrotate` seadistada, kuid see pole antud postituse skoobis.

#Syslogi kliendi seadistamine OpenWRT-s

Selleks tuleb avada fail `/etc/config/system` ja lisada `config system` plokki järgnevad read:

    option conloglevel '8'
    option log_ip '192.168.1.100'

Esimene neist seab logimismahukuse vahemikus 0-8, kus 8 on kõige jutukam, teine on Syslog-NG logiserveri IP (minu puhul siis CloudBoxi IP).

Allikad:

* [Debugging OpenWRT routers by shipping logs to a remote syslog server
](http://feeding.cloud.geek.nz/posts/debugging-openwrt-routers-by-shipping/)
* [Getting syslog-ng to filter messages by source IP address](http://prefetch.net/blog/index.php/2010/03/02/getting-syslog-ng-to-filter-messages-by-source-ip-address/)