---
layout: post
title: OpenWRT püsimälu suurendamine ExtRoot meetodil
categories: postitused
tags: openwrt linux cli
image: openwrt.png
---
Üritades ruuteritele uut elu sisse puhuda, olen end aeg-ajalt leidnud olkorrast, kus flash-mälu täis saab. USB-draiverid iseenesest võtavad juba üsna palju ruumi ära. Kui sinna juurde ka veel veebiliides ja midagi veel lisada, on väiksema mäluga ruuteritel mõõt täis. Selle vastu aitab kui sisemise flash-mälu asemel kasutada nt USB-mälupulka.

Ühendame külge mälupulga ja käivitame järgmise käsu:

    ls /dev/sd*

Tühi tulemus peaks andma kinnitust, et USB-draiverid ja/või failisüsteemiga seonduv tarkvara on puudu. Nende hankimiseks teeme nii:

    #uuendame pakkide nimekirja
    opkg update

    #paigaldame pakid
    opkg install kmod-usb-storage kmod-fs-ext4 block-mount

Siinkohal mäluseadmeid juurde tekkinud polnud, logist (`logread`) leidsin järgmiseid ridu:

    kmod: failed to insert /lib/modules/3.10.49/sd_mod.ko
    kmod: failed to insert /lib/modules/3.10.49/ext4.ko

Nende vastu aitas `reboot`.

Peale käivitumist proovisin taaskord mäluseadmeid reastada:

    ls /dev/sd*

Õnnestus! Põhipartitsiooni nimi on mul `/dev/sda2`, mille nüüd haagime asukohta `/mnt`:

    mount /dev/sda2 /mnt

Seejärel teostades rida käsklusi kopeeritakse puhas OpenWRT failisüsteem mälupulgale:

    mkdir -p /tmp/cproot
    mount --bind / /tmp/cproot
    tar -C /tmp/cproot -cvf - . | tar -C /mnt/sda1 -xf -
    umount /tmp/cproot
    umount /mnt

Peale `reboot`-i käivitub ruuter mälupulgalt, kui see on ühendatud. Ilma mälupulgata laeb ta seadistused üles sisemälust.

NB! SSH-ligipääs on peale seda taas kinni keeratud. Ligi pääseb `telnet` abil, kus saab `passwd` käsuga seadistada parooli, mis omakorda lülitab sisse Dropbear SSH-serveri. Edaspidi pääseb ligi juba SSH, mitte telneti kaudu.

