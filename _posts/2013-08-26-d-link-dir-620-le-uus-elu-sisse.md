---
layout: default
title: D-Link DIR-620-le uus elu sisse
categories: postitused
tags: ruuter openwrt linux
---

Pool aastat tagasi sai [D-Link DIR-620 ruuterit mobiilse kuumkohana katsetatud](http://raidok.blogspot.com/2012/02/mobiilne-internet-d-link-dir-620.html). Kaasasolev tarkvara oli 3G-ühendustega väga ebastabiilne. Isegi kui uusima peale uuendatud sai, kippus ühendus tihti katkema ja ruuter isegi hangus nii, et veebiliidesele ei pääsenud enam ligi ja aitas ainult tehase seadete taastamine. Sellele on lahendus!

[![DIR-620 eest](p-DIR-620_Front.jpg)](DIR-620_Front.jpg) [![DIR-620 tagant](p-DIR-620_Back.jpg)](DIR-620_Back.jpg)

Pildid [D-Link kodulehelt](http://www.dlink.ru/ee/products/2/1357.html).

## OpenWRT

[OpenWRT wikis](http://wiki.openwrt.org/toh/d-link/dir-620) on pühendatud informatiivne artikkel selle ruuteri kohta. Rev A1 puhul on olemas [valmiskompileerutitud OpenWRT 12.09 tarkvarapakett](http://downloads.openwrt.org/attitude_adjustment/12.09/ramips/rt305x/openwrt-ramips-rt305x-dir-620-a1-squashfs-sysupgrade.bin). Kui ruuterile on peale laetud uusim ametlik tarkvara, saab selle lihtsalt veebiliidese tarkvarauuenduse lehekülje abil peale laadida.

### Esmakäivitus

Alustuseks tuleb seadistada root-kasutaja parool. Ühenda arvuti võrgukaabli abil ruuteriga ja sisesta terminali järgmised käsud:

    telnet 192.168.1.1
    passwd

Peale seda võib ühenduse katkestada käsuga `exit` ja edaspidi pääseb ligi vaid SSH kaudu:

    ssh root@192.168.1.1

Lisalugemist [esmakäivitusest OpenWRT wikist](http://wiki.openwrt.org/doc/howto/firstlogin).

### Veebiliidese paigaldamine

Nagu Ubuntul on paketihalduriks aptitude, Fedoral yum või ArchLinuxil pacman, on OpenWRT-k opkg.

Järgnev eeldab internetiühenduse olemasolu. Ühenda netikaabel ruuteri WAN-porti. Tähele tuleb panna seda, et sealt 192.168.1.0/24 subneti aadressi ei anta, muidu tekib konflikt ja ühendust ei looda!

Pakettide nimistu uuendamiseks:

    opkg update

LuCI veebiliidese paigaldamiseks:

    opkg install luci

Sellega paigaldatakse ka uHTTPd veebiserver, mis tuleb käsitsi käivitada:

    /etc/init.d/uhttpd start

Selleks, et see igal järgneval käivitusel automaatselt juhtuks:

    /etc/init.d/uhttpd enable

### 3G-modemi tugi

Installime vajalikud paketid:

    opkg install comgt kmod-usb-ohci kmod-usb-serial kmod-usb-serial-option kmod-usb-serial-wwan usb-modeswitch usb-modeswitch-data luci-proto-3g

Viimane pakett (luci-proto-3g) on vajalik juhul, kui LuCI on paigaldatud.

Lisalugemist [3G seadistamise kohta OpenWRT wikis](http://wiki.openwrt.org/doc/recipes/3gdongle).

Olen proovinud Huawei E173 ja E1752 modemitega nii Elisa kui ka Tele2-ga. Algselt kippus ühendus siiski mõnikord katkema aga seda annab parandada. Sümpomiteks on käsu `logread` väljundis [switching seemingly failed](https://dev.openwrt.org/ticket/10475). Antud lingil on toodud ka lahendus vanemal OpenWRT versioonil. Käesoleval versioonil ei tule lisada `sleep 3` vaid muuta olemasolevat rida `sleep 1`.

