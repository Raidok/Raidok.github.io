---
layout: post
title: TP-Link WR703N ruuteri GPIO klemmid
categories: postitused
tags: openwrt linux arduino avr tp-link tlwr703n wr703n
---
Nüüdseks kasutult seisma jäänud WR703N ruuterile rakendusvõimalusi otsides avastasin, et üsna kerge vaevaga saab sellele lisaks jadapordile ka kaks GPIO klemmi tekitada. Hoiatan ette, et see on päris täpne töö ja mina ei vastuta, kui Teil midagi valesti peaks minema. Head häkkimist! :)

Järgnev pilt pärineb [OpenWRT	wikist](http://wiki.openwrt.org/toh/tp-link/tl-wr703n):
[![TL-WR703N emaplaat](tl-wr703n_top.jpg)](tl-wr703n_top.jpg)

## Jadaport
Sisseehitatud jadapordile saab ligipääsu ühendudes klemmide TP_IN ja TP_OUT külge, mis on vastavalt RX ja TX. Need klemmid on üsna õrnad ja tulevad kergesti plaadi küljest lahti, seepärast on parem idee joota juhtmed külge C57 ja C55 külge, seal on juba tinaplönnidki olemas. Hea mõte on kasutada võimalikult peenikest juhet ja see eelnevalt näiteks Super Attakiga plaadi külge sobivasse kohta kinni liimida.

Sealt kaudu pääseb ruuteri konsoolile ligi root kasutajana. Selle kaudu saab näiteks tarkvara taastada kui peaks midagi halvaks minema. Mul on see juba vähemalt korra kasuks tulnud :)

## GPIO-klemmid
Emaplaadil, peakiibist pisut vasakul on vertiaalselt reas kolm takistit - R15, R16 ja R17. Neist kahte on võimalik ohutult kasutada GPIO-klemmidena, jootes juhtmed alumiste otste külge. R15 ja R17 näol on tarkvaraliselt tegu vastavalt GPIO-klemmidega 7 ja 29.

Näiteks GPIO-klemmi 7 on võimalik kasutamiseks valmis seada nii (kas siis telnet,ssh või sisemise jadapordi kaudu):

    cd /sys/class/gpio
    echo '7' > export

Klemmile kirjutades on vaja esiteks paika panna suund ja siis sinna kirjutada kas "1" või "0".

    cd gpio7
    echo 'out' > direction
    echo '1' > value

Analoogselt saab käituda ka GPIO29 puhul.

## Init-skript
Selleks, et GPIO-klemmid alati kasutatavad oleksid, kirjutasin skripti `/etc/init.d/gpio.sh`:

    #!/bin/sh /etc/rc.common
    
    START=10
    
    start() {
      echo "seadistab GPIO-klemmid"
      echo '7' > /sys/class/gpio/export
      echo 'out' > /sys/class/gpio/gpio7/direction
      #kirjutab vaikeväärtuse
      echo '1' > /sys/class/gpio/gpio7/value

      echo '29' > /sys/class/gpio/export
      echo 'out' > /sys/class/gpio/gpio29/direction
      #kirjutab vaikeväärtuse
      echo '0' > /sys/class/gpio/gpio29/value
    }

Tähelepanu tasuks pöörata sellele, et GPIO7 vaikimisi väärtus on 1 ja GPIO29 oma 0. See tähendab seda, et ilma midagi `value` failidesse kirjutamata on nende väärtused just sellised.

Mõõtsin ka Arduino abiga nende analoogtasemeid. 0-tase, nagu arvata võib on üldiselt alla 100 mV, 1-tase umbes 2,7 V juures.

Skripti käivitumiseks koos ruuteriga on vaja teha järgmist:

    /etc/init.d/gpio.sh enable


