---
layout: post
title: SSH-tunnelid
categories: postitused
tags: linux
image: linux.png
---
SSH on väga võimas tööriist!

#SSH-ühenduste püstihoidmine

Vastumürk ühenduse katkemisele

##SSH-ühenduse

##SSH-ühenduse põhine seadistus

Ühe konkreetse ühenduse püsti hoidmine 15 minutit:

    ssh -o "ServerAliveInterval 300" -o "ServerAliveCountMax 3" kasutaja@teinemasin

##SSH-kliendi seadistus

Kõikide väljuvate inaktiivsete ühenduste püstihoidmine vähemalt 15 minutit:

    Host *
        ServerAliveInterval 300
        ServerAliveCountMax 3

##autossh

Automaatselt püsivate tunnelite püsti hoidmine `autossh` abil:

    su -s /bin/sh autossh -c 'autossh -M 0 -q -f -N -o "ServerAliveInterval 300" -o "ServerAliveCountMax 3" -R 2002:localhost:22 autossh@teinemasin'
    su -s /bin/sh autossh -c 'autossh -M 0 -q -f -N -o "ServerAliveInterval 300" -o "ServerAliveCountMax 3" -L 3306:localhost:3306 autossh@teinemasin'

Esimene teeb tagurpidi tunneli pordile 2002 masinas `teinemasin`, mis on suunatud lähtemasina pordile 22. Teine suunab lähtmasina pordi 3306 (mysql) masinasse `teinemasin` sama pordi peale, ehk tekitab olukorra, kus kauge mysql server oleks justkui samas masinas (kättesaadav localhost:3306 pealt).
