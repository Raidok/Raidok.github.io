---
layout: post
title: Ilmajaam
categories: postitused
tags: x
image: x.png
---
Ammu olen mõelnud, et huvitav oleks teada, mis ilm tegelikult väljas on. Sihikule said võetud WS1080 ja WS3080 mudelid (mujal maailmas tuntud ka kui WH1080 ja WH3080), sest neil on USB-liides, mille kaudu saab andmeid välja lugeda.



## Seiklused ilmajaama valikul

Ilmajaam WS1080

- [Oomipood](https://www.oomipood.ee/product/ws1080_ilmajaam_tuul_rohk_sademed_jne_usb_puutetundlik_ekraan) - 169€
- [Ronex](http://www.ronex.ee/Tootekataloog/Ilmajaamad/puutetundliku_tabloo_ja_arvutiliidesega_ilmajaam_ws1080) - 164.05€

Ilmajaam WS3080

- [Oomipood](https://www.oomipood.ee/product/ws3080_ilmajaam_tuul_rohk_sademed_jne_usb_paikese_patareiga_andur) - 239.00€
- [Ronex](http://www.ronex.ee/Tootekataloog/Ilmajaamad/arvutiliidesega_ilmajaam_paikesepaneeliga_varustatud_saatja_moodul_ws3080) - 203.29€


Kui välja jätta saatjamoodul koos õhutemperatuuri, -niiskuse jms anduritega ning mastikinnituste, siis nendesse komplektidesse kuuluvad ka järgmised andurid:

Vihmasensor WS1080/RM

- [Oomipood](https://www.oomipood.ee/product?product_id=109849) - 13.67€
- [Ronex](http://www.ronex.ee/Tootekataloog/Ilmajaamade_tarvikud/spare_rain_sensor_for_ws1080_ws1080_rm) - 14.06€

Tuule kiiruse andur WS1080/WS

- [Oomipood](https://www.oomipood.ee/product?product_id=109853) - 10.10€
- [Ronex](http://www.ronex.ee/Tootekataloog/Ilmajaamade_tarvikud/tuulekiiruse_andur_mudelile_ws1080_ws1080_ws) - 10.36€

Tuule suuna andur WS1080/WD

- [Oomipood](https://www.oomipood.ee/product?product_id=109852) - 40.46€
- [Ronex](http://www.ronex.ee/Tootekataloog/Ilmajaamade_tarvikud/tuule_suuna_andur_mudelile_ws1080_ws1080_wd) - 41.61€

Põhimõtteliselt samadest viimastest anduritest koosneb ka järgnev komplekt aga siin on ka mast kaasas: [Sparkfun Weather Meters](https://www.sparkfun.com/products/8942) - $76.95. Selle komplekti toimimasaamiseks tuleb ette võtta päris tõsine programmeerimisülesanne, mis sisaldaks _interrupt_-e.

Hiinast saab terve välitingimustesse käiva komplekti ~40-50€ eest, kuid saatmine on veel kaks korda samapalju: https://www.aliexpress.com/store/product/1-set-of-Spare-part-outdoor-unit-for-Professional-Wireless-Weather-Station/103916_1214985366.html. Sellele oleks vastuvõtja vaja ise ehitada aga kuna täpse protokolli kohta leiab infot vähe, siis esialgu oleks lihtsam, kui terve komplekt olemas oleks, teeks _reverse engineeringu_ lihtsamaks.

Lõpuks leidsin ühe hea pärli Inglismaalt: http://www.ebay.co.uk/itm/291755327684. Põhimõtteliselt on tegu mudeliga WS3080, lihtsalt mingi teine brändinimi on eraani korpusele peale trükitud ja selle ma ka ära ostsin.


## Andmete lugemine


Eeldused:

    sudo apt-get update
    sudo apt-get install python-pip python-dev build-essential
    sudo pip install --upgrade pip
    sudo pip install libusb1
    sudo pip install pywws

Nüüd peaks ilmajaam kättesaadav olema, testimiseks:

    pywws-testweatherstation

Tulemuseks peaks olema hulk numbreid:

    20:04:06:pywws.Logger:pywws version 16.08.0, build 1361 (ca4543e)
    0000 55 aa ff ff ff ff 15 01 01 12 00 16 10 10 12 08 1e 20 02 20 09 00 00 00 02 00 00 b3 01 00 e8 22
    0020 dc 27 58 28 00 00 00 00 00 00 00 16 10 16 00 03 41 23 c8 00 00 00 46 2d 2c 01 64 80 c8 00 00 00
    0040 64 00 64 80 a0 28 80 25 a0 28 80 25 00 b4 00 00 68 01 00 0a 00 f4 01 09 00 c0 c6 2d 07 00 f4 1d
    0060 00 00 47 19 47 1c 03 01 d5 00 14 01 d0 00 14 01 d0 00 db 00 32 00 58 28 92 27 dc 27 59 27 2c 00
    0080 52 00 51 00 51 00 93 00 00 00 93 00 00 15 01 01 12 00 16 10 15 19 37 15 01 01 12 00 16 10 15 19
    00a0 36 15 01 01 12 03 16 10 09 05 10 15 01 01 12 00 16 10 09 06 25 15 01 01 12 00 16 10 09 06 25 15
    00c0 01 01 12 00 16 10 13 22 43 16 10 16 00 01 15 01 01 12 00 16 10 16 00 01 16 10 08 05 37 15 01 01
    00e0 12 02 16 10 08 16 24 16 10 07 09 00 16 10 08 00 00 16 10 09 00 00 15 01 01 12 00 16 10 07 08 32



## Skriptide jooksutamine ilma _root_ õigusteta

Selleks on vaja luua üks _udev_ reegel ehk fail nimega **/etc/udev/rules.d/39-weather-station.rules** ja sisuks:

    ACTION!="add|change", GOTO="weatherstation_end"
    SUBSYSTEM=="usb", ATTRS{idVendor}=="1941", ATTRS{idProduct}=="8021", GROUP="weatherstation"
    LABEL="weatherstation_end"

Seejärel luua **weatherstation** kasutajate grupp ja lisada see pywws skripte jooksutav kasutaja gruppide hulka:

    sudo addgroup weatherstation
    sudo usermod -a -G weatherstation pi

Muudatuste jõustumiseks tuleb ilmajaama USB korra lahti ühendada (et udev reegel rakenduks) ja välja ning uuesti sisse logida (et grupp rakenduks).


## MQTT

    sudo pip install paho-mqtt



## Kell

Peale seda kui Weather Underground sa ära seadistatud, muutus kodulehel olek punaselt roheliseks, kuid andmeid ei näidanud. Vaadates logidest, mis päringuid tehti, siis seal oli sees mingi eelmise aasta kuupäev.

Selleks, et kell õigeks saada ja õige püsiks:

    sudo apt-get install ntp




Allikad:

- [How to get started with pywws](http://pywws.readthedocs.io/nl/latest/guides/getstarted.html)
    