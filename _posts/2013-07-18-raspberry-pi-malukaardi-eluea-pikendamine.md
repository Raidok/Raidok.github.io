---
layout: post
title: SD-kaardi eluea pikendamine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
updated: 2016-10-14
---
Raspberry Pi Raspbiani distributsioon on koostatud selliselt, et mahub napilt ära 2-gigasele mälukaardile. Mälukaartidele on küll üldselt tema sektorite kulumise ühtlustamiseks loodud mehhanism, mis tihedasti kirjutatavaid sektorid aeg-ajalt ümber tõstab, kuid see eeldab, et mälukaardil on piisavalt vaba ruumi. Kui mälukaardil on sama palju vaba ruumi, kui seda on kasutuses, võib tema eluiga pikeneda enam kui kaks korda. Raspiani jaoks on väga mõistlik kasutada vähemalt 8 GB SD-kaarti.


## Swappimine

Raspbian swap-partitsiooni ei kasuta, küll aga luuakse käivitusel siiski 100 MB suurune swap-fail. Eemaldame selle funktsionaalsuse:

    sudo dphys-swapfile swapoff
    sudo apt-get remove dphys-swapfile



## RAM-failisüsteemid

Linuxilistel on failisüsteemis mitmeid katalooge, kuhu kirjutatakse päris tihti. Need on näiteks `/tmp` ajutiste failide jaoks ja `/var/log` logifailide pidamiseks. Esimese neist võiks julgelt RAM-failisüsteemile paigutada, teisega kaasneb üks risk - nimelt ei ole selle sisu peale taaskäivitust enam alles. Selleks tuleb need asukohad paigutada ajutisse, mälus töötavasse failisüsteemi. Seda seadistatakse failis `/etc/default/tmpfs`. Veendu, et järgnevatel ridadel seal failis ei oleks ees #-märki ja et nende väärtused oleksid sellised nagu all toodud on.

    RAMLOCK=yes
    RAMSHM=yes
    RAMTMP=yes
    TMPFS_SIZE=10%VM
    RUN_SIZE=10M
    LOCK_SIZE=5M
    SHM_SIZE=10M
    TMP_SIZE=25M

Teeme paar sissekannet `/etc/fstab` faili:

    tmpfs   /var/log                tmpfs   size=20M,defaults,noatime,mode=0755 0 0
    tmpfs   /var/cache/apt/archives tmpfs   size=100M,defaults,noexec,nosuid,nodev,mode=0755 0 0

Ja tekitabe skripti `/etc/init.d/prepare-dirs`, mis igal käivitusel `/var/log` kausta vajalikud kaustad ja failid valmis teeks:

      #!/bin/bash
      #
      ### BEGIN INIT INFO
      # Provides:          prepare-dirs
      # Default-Start:     2 3 4 5
      # Default-Stop:      0 1 6
      # Required-Start:
      # Required-Stop:
      # Short-Description: Create needed directories on /var/log/ for tmpfs at startup
      # Description:       Create needed directories on /var/log/ for tmpfs at startup
      ### END INIT INFO
      # needed Dirs
      DIR[0]=/var/log/nginx
      DIR[1]=/var/log/cups
      DIR[2]=/var/log/apt
      DIR[3]=/var/log/ConsoleKit
      DIR[4]=/var/log/fsck
      DIR[5]=/var/log/news
      DIR[6]=/var/log/ntpstats
      DIR[7]=/var/log/samba
      DIR[8]=/var/log/lastlog
      DIR[9]=/var/log/exim
      DIR[10]=/var/log/watchdog
      case "${1:-''}" in
        start)
              typeset -i i=0 max=${#DIR[*]}
              while (( i < max ))
              do
                      mkdir  ${DIR[$i]}
                      chmod 755 ${DIR[$i]}
                      i=i+1
              done
              # set rights
              chown www-data.www-data ${DIR[0]}
          ;;
        stop)
          ;;
        restart)
         ;;
        reload|force-reload)
         ;;
        status)
         ;;
        *)
         echo "Usage: $SELF start"
         exit 1
         ;;
      esac

Teeme selle skripti käivitatavaks ka:

    sudo chmod 755 /etc/init.d/prepare-dirs
    sudo update-rc.d prepare-dirs defaults 01 99


Allikad:

* [How can I extend the life of my SD card?](http://raspberrypi.stackexchange.com/questions/169/how-can-i-extend-the-life-of-my-sd-card)
