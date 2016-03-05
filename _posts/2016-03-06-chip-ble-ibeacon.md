---
layout: post
title: CHIP ja iBeacon
categories: postitused
tags: linux chip ble
image: linux.png
---
Sain juba mõnda aega tagasi 9-dollarise mikroarvuti [CHIP](http://getchip.com/) kätte ja kuna tal on Bluetoot Low Energy sisse ehitatud, siis esimene asi, mida ma sellega proovisin oli iBeacon protokolli matkimine.

Internetis leidub palju õpetusi Raspberry Pi jaoks, õnneks on sobivad paljud õpetused mõlemale, sest nii Raspbian kui ka ChipOS põhinevad Debianidel.

Bluetoothi juhtimiseks on väga levinud projekt Bluez ja aptist saab selle mingisuguse 5.x versiooni installida. Paraku sellega mul iBeaconit broadcastima saada ei õnnestunud. Õnneks 4.x perekonna viimane versioon töötab päris edukalt:

    wget https://www.kernel.org/pub/linux/bluetooth/bluez-4.101.tar.xz
    tar xfv bluez-4.101.tar.xz
    cd bluez-4.101

Installime vajaminevad sõltuvused:

    sudo apt-get update
    sudo apt-get install libbluetooth-dev libudev-dev libdbus-1-dev libglib2.0-dev build-essential git

Ehitame bluez'i:

    ./configure
    make
    sudo make install

Nüüd peaks järgmise käsu jooksutamine muuhulgas ütleba "UP RUNNING":

    sudo hciconfig

Kui ei, siis aitab:

    sudo hciconfig hci0 up

Ja iBeacon signaali levitamiseks (alumine rida selgitab, milleks mingi osa vajalik on):

    sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 B9 3D CF 84 E2 45 11 E5 97 30 9A 79 F0 6E 94 78 00 00 00 00 C8 00
    # hcitool spetsiifiline osa käsust  | Apple iBeacon spetisiifika  |                 128-bitine UUID               |major|minor|tx

Millegipärast oli vaja ka järgmist käsku ja peale seda oli signaal leitav:

    sudo hciconfig hci0 leadv
