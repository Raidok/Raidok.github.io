---
layout: post
title: Suurte logifailide jälgimine
categories: postitused
tags: linux unix cli
image: linux.png
---

# tail

Kuidas jälgida muutuvat logifaili. Tavaliselt teen ma seda nii:

    tail -f failinimi

Üldiselt see töötab. Välja arvatud juhul kui logifail roteerub ja tekib väike paanika, et mis mõttes logid nüüd järsku seisma jäid!? Avastasin huljuti, et selle probleemi lahenduseks on `-f` asemel `-F` kasutamine:

    tail -F failinimi

Erinevus seisneb selles, et esimene jälgib etteantud failinime taga olevat faili, teine jälgib lisaks failile ka seda, kas failinime taga olev viide muutub.

Kes sellega kokku puutunud ei ole, siis tihti kirjutavad rakendused näiteks **logifail.log.0** nimelisse faili, kuid perioodiliselt inkrementeeritakse failinime lõpus olevat numbrit (temast saab siis **logifail.log.1**) ja tekib uus **logifail.log.0** nimeline fail. Kasutades `-f` parameetrit jääb logi sellest hetkest seisma, sest uusi logisid hakati kirjutama uude faili.


# less

Aga...

    less +F


Allikad:

* [Stop using tail -f (mostly)](http://www.brianstorti.com/stop-using-tail/)