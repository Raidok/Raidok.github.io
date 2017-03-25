---
layout: post
title: Peata Raspberry Pi eelseadistamine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
Raspberry Pi jaoks mõeldud Raspian operatsioonisüsteem on vahepeal palju uuendusi saanud. Seal hulgas on natukene keerulisemaks läinud peata (ehk ilma monitorita kasutatava) Raspberry ülesseadmine, sest isegi Lite versioonil on vaikimisi seadeil SSH installitud, kuid automaatselt seda ei käivitata. Näitan kudas SSH ja ka wifi enne ära seadistada.



# SSH lubamine käivitusel

Selleks on vaja mälukaart pista mõnda teise arvutisse, navigeerida **boot** partitsioonile ning tekitada sinna tühi fail nimega `ssh`. Mäki peal käiks see nii:

    cd /Volumes/boot
    touch ssh



# Wifi eelseadistamine

Selleks tuleb jällegi navigeerida **boot** partitsioonile ja tekitada sinna fail nimega `wpa_supplicant.conf` ning talle anda teatud sisu. See võiks käia nii:

    cd /Volumes/boot
    cat << EOF > wpa_supplicant.conf
    network={
        ssid="YOUR_SSID"
        psk="YOUR_PASSWORD"
        key_mgmt=WPA-PSK
    }
    EOF

Kui väljade väärtused õigeks seada, terminali kopeerida ja veel üks reavahetus lõppu lüüa, ongi fail juba tehtud. Faili sisu on `cat` algusega ja `EOF` rea vahel.



Allikad:

* [Prepare SD card for Wifi on Headless Pi](http://raspberrypi.stackexchange.com/questions/10251/prepare-sd-card-for-wifi-on-headless-pi)
