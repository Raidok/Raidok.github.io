---
layout: post
title: IPv6 ja privaatsus
categories: postitused
tags: linux
image: ipv6.png
---
IPv4-tüüpi aadresside puuduse tõttu on välja mõeldud ja tasapisi ka levimas IPv6. 32-biti asemel on aadressid 128-bitised. Sellest viimased 64 bitti on seadme aadress, mis teatud juhtudel tuletatakse väga lihtsa algoritmi teel seadme füüsilisest aadressist.

IPv4 aadressiruumis kasutatakse ruuterites aadresside piiratuse tõttu tõlkimise süsteemi ([NAT](http://en.wikipedia.org/wiki/Network_address_translation)), mis annab igale sisevõrgu seadmele privaatse aadressi ja välisvõrgust on näha vaid ruuteri avalikku IP-aadressi.

IPv6 puhul on mindud teist teedpidi. Standard näeb ette, et aadressi _hosti_ osa (viimased 64 bitti) tuleks [modifitseeritud EUI-64 kodeeringu järgi genereerida](http://en.wikipedia.org/wiki/IPv6_address#Modified_EUI-64). See protsess on väga lihtsalt pööratav. See tähendab, et sõltumata võrgust, kus viibitakse, on välisvõrgust alati näha, millistesse võrkudesse seade parasjagu ühendunud on. Avalike andmebaaside abil on võimalik IP-aadress ka geograafilise asukohaga siduda.

Tasuks ka ära mainida, et IPv6 on enamus operatsioonisüsteemides juba vaikimisi stardivalmis, see tähendab, et kui seade ühendub võrku, mis toetab IPv6-e, ja ka kasutatavad veebiteenused seda toetavad, siis kasutaja ei peagi rohkem midagi tegema, see lihtsalt töötab.

Kui nüüd tagasi minna eespool nimetatud privaatsusprobleemi juurde, siis see on tegelikult juba põhilistes operatsioonisüsteemides adresseeritud ja [ajutiste IPv6-aadresside genereerimise sisselülitamine](http://superuser.com/a/243713) polegi üldse keeruline.

Linux:

    sysctl net.ipv6.conf.all.use_tempaddr=2

Mac OS X:

    sysctl -w net.inet6.ip6.use_tempaddr=1

Windows:

    netsh interface ipv6 set privacy state=enabled

Alates Mac OS X 10.7 ja Windows XP SP2 peaksid need seadistused juba vaikimisi sellised olema, kud Linuxi all tasub nimetatud käsklus korra sisse lüüa.
