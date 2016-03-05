---
layout: post
title: Raspberry Pi mälujaotus
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

Kuna Raspberry Pi võimekus pole just kiita, vaatamata tema üsna heale graafikakiirendile, siis enamus ajast töötab ta mul "peata" ehk siis ilma monitori, hiire ja klaviatuurita. Samas on minu mudel veel vanemat tüüpi, millel on 256 MB mälu. Sellisel juhul võib üsna kiiresti puudu jääda mälumahust ja mõistlik on CPU ja GPU mälujaotust muuta.

Avame `raspi-config` utiliidi.

    sudo raspi-config

Valime 8. valiku ehk "Advanced Options", sealt "A3 Memory Split". Avaneb võimalus GPU-le eraldatava mälu hulga muutmiseks. Algselt on seal 128. Väikseim lubatud (ja toimiv) väärtus on 16.

Minu puhul käskluse `free` väljund enne muutmist:

<pre>
            total       used       free
Mem:        188880     117832      71048
</pre>

Ja pärast muutmist:

<pre>
            total       used       free
Mem:        237648     134548     103100
</pre>

Täpsemat lugemist `raspi-config` utiliidi kohta [Raspberry Pi kodulehel](http://www.raspberrypi.org/documentation/configuration/raspi-config.md).