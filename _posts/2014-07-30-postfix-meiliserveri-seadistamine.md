---
layout: post
title: Postfix meiliserveri seadistamine
categories: postitused
tags: linux ubuntu cli
image: linux.png
---
Mõnikord on mugav kui server teatud sündmuste peale teateid saadaks, et saaks kiiresti reageerida. Selle seadistamine pole üldse keeruline.


#Meiliserver

Installime Postfix meiliserveri:

    sudo apt-get install postfix

Konfifailis tuleb üle vaadata mõningad seadistused, seega:

    sudo nano /etc/postfix/main.cf

Ära tuleks määrata `myhostname` enda domeenile vastavaks:

    myhostname = domeen.ee

Tuleks ka kontrollida, et sama väärtus oleks ka `mailname`-failis

    sudo nano /etc/mailname

Kindlasti tuleks kontrollida, et `mynetwork` viitaks localhostile, ehk midagi sellist:

    mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128

Nüüd võib Postfixile konfifailide taaslaadimise teha:

    sudo /etc/init.d/postfix reload


#Meiliaadresside lisamine

Kui on soov luua isiklik postkast, siis tuleb muuta järgnevat faili:

    sudo nano /etc/aliases

Formaat on `meiliaadress: kasutajanimi`, kui meiliaadressis pole domeeni, lisatakse sinna automaatselt faili `mailname` sisu ehk "kasutaja" või "kasutaja@domeen.com" teeb sama välja, kuid domeeninime muutmise korral on lihtsalt tööd rohkem:

    peakasutaja: root
    kasutaja: kasutaja

Eelnev tekitab olukorra, kus aadressile peakasutaja@domeen.com saadetud meilid jõuavad root-kasutaja postkasti ja kasutaja@domeen.com meilid kasutaja postkasti.

Muudatuste pealelaadimiseks tuleb teha nii:

    sudo postalias /etc/aliases

Sissetulevad meilid asuvad järmises failis:

    /var/mail/kasutaja

Meili saabumisest teavitatakse ka kasutaja konsoolis.


#DNS-kirjete suunamine

Selleks, et meile vastu võtta, peab olema nimeserveri MX-kirje serverile suunatud. Olemasoleva domeeni puhul soovitan [DigitalOceani nimeserverite haldamise liidest](https://www.digitalocean.com/community/articles/how-to-set-up-a-host-name-with-digitalocean).

#Meilide saatmine

Meilide saatmine on `sendmail` käsu abil üsna lihtne:

    sendmail minu@email.ee

Peale reavahetust saab kirjutada sisu, kirja lõppu veel üks reavahetus ja CTRL+D. Valmis!
