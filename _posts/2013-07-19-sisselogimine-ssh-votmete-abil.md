---
layout: default
title: Sisselogimine SSH-võtmete abil
categories: postitused
tags: raspi raspbian raspberry pi linux ssh
---
Kui parooli ei viitsi igakord sisse trükkida ssh-kaudu kuskile ühendudes, on võimalik see samm ka ära jätta.

Selleks tuleb genereerida enda ssh-võti:

    ssh-keygen -t rsa

Ja tõsta see ümber arvutisse, kuhu soovite edaspidi ilma paroolita siseneda. Juhul, kui sinna masinasse sellele kasutajale pole veel teiste public key-sid lisatud, siis sobib järgnev käsk:

    scp .ssh/id_rsa.pub pi@192.168.1.10:/home/pi/.ssh/authorized_keys

Kui seal failis juba on mõni ssh-võti, siis järgneva käsuga saab neid sinna juurde lisada.

    cat .ssh/id_rsa.pub | ssh pi@192.168.1.10 "cat >> /home/pi/.ssh/authorized_keys"

Ja järgmistel sisselogimistel polegi vaja enam parooli sisestada. Tadaa!
