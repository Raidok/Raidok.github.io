---
layout: post
title: Kiire koduvõrk soodsa raha eest
categories: postitused
tags: openwrt linux ruuter
image: openwrt.png
---
Kui vanal koduruuteril hakkas võrgupesasid väheks jääma ja juhtmevabasid seadmeid aina enam juurde tekkis, hakkas võrguühendusega aina enam probleeme tekkima. Tellisingi siis ära ruuteri [TP-Link TL-WR1043ND](http://www.tp-link.com.au/products/details/?model=TL-WR1043ND) ja switchi [TP-Link TL-SG1008D](http://www.tp-link.com.au/products/details/?categoryid=&model=TL-SG1008D).

###Ruuter TP-Link TL-WR1043ND
[![TL-WR1043ND pilt TP-Link kodulehelt](p-TL-WR1043ND-01.jpg)](TL-WR1043ND-01.jpg)
[![TL-WR1043ND pilt TP-Link kodulehelt](p-TL-WR1043ND-04.jpg)](TL-WR1043ND-04.jpg)
* Atheros AR9132@400MHz
* 8 MB flash-mälu
* 32MB RAM
* 5x Gigabit Ethernet pesa
* 802.11b/g/n wifi
* USB 2.0 pesa

Kuna see ruuter on koos paljude teistega [pikas ruuterite turvaaukude nimekirjas](http://www.routerpwn.com), siis konsulteerisin [TL-WR1043ND OpenWRT lehega](http://wiki.openwrt.org/toh/tp-link/tl-wr1043nd). Esialgu proovisin ühte _bleeding-edge_ IPv6 valmidusega _buildi_, kud see oli ebastabiilne - wifiga oli probleeme ja tarkvara ise ka hangus. Siis [laadisin alla OpenWRT 12.09 ametliku _buildi_](http://downloads.openwrt.org/attitude_adjustment/12.09/ar71xx/generic/openwrt-ar71xx-generic-tl-wr1043nd-v1-squashfs-factory.bin). Wikis v1.08 mudeliga esinenud WAN-pesa probleeme ei esinenud ja ruuter on siiani väga stabiilne olnud.

###Switch TP-Link TL-SG1008D
[![TL-SG1008D pilt TP-Link kodulehelt](p-TL-SG1008D-01.jpg)](TL-SG1008D-01.jpg)
[![TL-SG1008D pilt TP-Link kodulehelt](p-TL-SG1008D-04.jpg)](TL-SG1008D-04.jpg)
* 8x Gigabit Ethernet pesa
* 9K jumbo frame
