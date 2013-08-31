---
layout: post
title: Raspberry Pi mälujaotus
categories: postitused
tags: raspi raspbian raspberry pi linux
---

Kuna Raspberry Pi võimekus pole just kiita, vaatamata tema üsna heale graafikakiirendile, siis enamus ajast töötab ta mul "peata" ehk siis ilma monitorita, hiire ja klaviatuurita. Samas on minu mudel veel vanemat tüüpi, millel on 256 MB mälu. Sellisel juhul võib üsna kiiresti puudu jääda mälumahust ja mõistlik on CPU ja GPU mälujaotust muuta.

Avame `raspi-setup` utiliidi.

    sudo raspi-setup

Valime 8. valiku ehk "Advanced Options", sealt "A3 Memory Split". Avaneb võimalus GPU-le eraldatava mälu hulga muutmiseks. Algselt on seal 64 MB. Väikseim variant on 16 MB. Saab ka muid arve sinna sisestada, kuid 16-st väiksemaks see tegelikult ei lähe.

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
