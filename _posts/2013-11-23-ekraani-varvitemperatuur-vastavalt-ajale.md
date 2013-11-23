---
layout: post
title: Ekraani värvitemperatuur vastavalt kellaajale
categories: postitused
tags: linux
image: redshift.png
---
[Redshift](http://jonls.dk/redshift/) muudab pikad arvutikasutamised silmasõbralikumaks, sujuvalt ekraani värvitemperatuuri vastavalt päikese asukohale reguleerides. Kuna Eestis on valge aega väga vähe, on see väga mõistlik programmike arvutiga töötavatele inimestele. Päikese loojumisel muutub ekraan sujuvalt punakamaks, et üleminek oleks silmadele pehmem. Päevasel ajal omandab pilt sinaka tooni, et kompenseerida ümbritseva keskkonna valgustugevust.

Lingid:
* [Redshift projekti kodulehekülg](http://jonls.dk/redshift/)
* [Redshift projektileht Launchpadis](https://launchpad.net/redshift)
* [Redshift 1.7-1 käsurea rakendus (Ubuntu 12.04 x64)](https://launchpad.net/ubuntu/+source/redshift/1.7-1ubuntu2/+build/3255560/+files/redshift_1.7-1ubuntu2_amd64.deb)
* [Redshift 1.7-1 graafiline liides (Ubuntu x64)](https://launchpad.net/ubuntu/precise/amd64/gtk-redshift/1.7-1ubuntu2)

Kui tundub, et programm ei oska asukohta ise väga täpselt ennustada, siis näiteks [Tallinna koordinaatidega](http://tools.wmflabs.org/geohack/geohack.php?pagename=Tallinn&params=59_26_14_N_24_44_43_E_type:city_region:EE) käsurealt kävitamiseks sobiks järnev käsklus:

    redshift -l 59.437222:24.745278

