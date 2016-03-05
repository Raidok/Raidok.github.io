---
layout: post
title: Sisselogimine SSH-võtmete abil
categories: postitused
tags: raspberry-pi linux debian ssh
image: linux.png
updated: 2014-03-02
---
Arvutite vahel tihti SSH-ühendusi kasutades võib parooli sisestamine tüütuks muutuda. Lisaks ei pruugi parool alati ka kõige turvalisem lahendus olla. Saab ka ilma!

Juttu tuleb:

* sisukord
{:toc}

#Võtme genereerimine ja paigaldamine

    ssh-keygen -t rsa -C "Raido@raal"

Parameeter `-t rsa` seab krüpteerimisalgoritmiks [RSA](http://et.wikipedia.org/wiki/RSA_%28algoritm%29) ja `-C "Raido@raal"` lisab avaliku võtme lõppu kommentaari, mille abil võtit hiljem teistest lihtne eristada on. Ise panen sinna tavaliselt enda_nimi@masina_nimi, milles võtme genereerin.

Vaikimisi genereeritakse privaatvõti `~/.ssh/id_rsa` ja avalik võti `~/.ssh/id_rsa.pub`. Privaatvõti ei tohi sattuda mitte kellegi teise kätte, kuid avalikku võtit võib jagada.

Tõstame avaliku võtme arvutisse, kuhu soovime edaspidi ilma paroolita siseneda:

    ssh-copy-id -i ~/.ssh/id_rsa.pub kasutaja@server

Ja järgmistel sisselogimistel polegi vaja enam parooli sisestada. Tadaa!


#Parooliga sisenemise keelamine

Võtmega sisselogimine on mugav ja turvaline, parooliga täpselt vastupidi. Parooliga SSH-kaudu sisselogimist saab keelata, kuid sellega kaasnevad ka ohud.

Alati peab olema varuväljapääs! Näiteks võtmega ligipääs mõnest teisest usaldusväärsest masinast või mis veel parem - füüsiline ligipääs masinale. Näiteks [Digital Ocean](https://www.digitalocean.com/?refcode=66cf7e78504e)is _(referral)_ loodud virtuaalserveritele on võimalik administreerimisliidese kaudu luua konsooliühendus või Raspberry Pi-le on võimalik käsitsi avalik võti mälukaardile õigesse kohta kirjutada.

Nüüd, kui sellega on korras, asume asja kallale. Avame konfifaili.

    sudo nano /etc/ssh/sshd_config

Muudame jägnevate parameetrite väärtused "no" peale:

    ChallengeResponseAuthentication no
    PasswordAuthentication no
    UsePAM no

Laeme uue konfiguratsiooni peale:

    sudo /etc/init.d/ssh reload

Parooliga sisselogimine SSH kaudu pole enam võimalik!


#Tähelepanekud

Võtmetega sisselogimist ei tohiks kasutada ebausaldusväärsest masinast - ainult isiklikest, vähemalt parooliga kaitstud arvutitest. Kui arvuti peaks kaduma/varastatama, saab serverist `~/.ssh/authorized_keys` failist vastava rea kustutada. Selleks puhuks on kommentaar võtme järel abiks.

Kui masin on avatud Internetile, tasuks vaikimis port 22 muuta millekski vähemintuitiivsemaks. Tihti kasutatakse 2222, 2200, 2002 vms, kuid see võib olla mis iganes vahemikus 1024-65536 (parem olekski). See väldib suvalistel pahatahtlikel skännimistel avastamised ja jõuga sisenemis(kats)ed.

Loomulikult peaks ka tulemüür sees olema. _Uncomplicated Firewall_ ehk `ufw` puhul käiks 2200 pordi avamine ja tulemüüri sisselülitamine järgnevalt:

    sudo ufw allow 2200
    sudo ufw enable

Kui parooliga sisenemine on keelatud, saab võtmeid lisada vaid masinate kaudu, mis juba omavad ligipääsu serverisse. Selleks tuleb uue masina võti toimetada olemasoleva ligipääsuga masinasse ja käivitada analoogne käsk:

    ssh-copy-id -i ~/teise_masina_rsa.pub kasutaja@server
