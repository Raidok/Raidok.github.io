---
layout: post
title: AutoSSH
categories: postitused
tags: linux raspberry-pi
image: raspberrypi.png
---
AutoSSH on kaval tööriist, mida saab kasutada SSH-ühenduste automaatseks hoidmiseks.

    sudo apt-get install autossh


    autossh -M 0 -o "ServerAliveInterval 30" -o "ServerAliveCountMax 3" -R2001:localhost:22 grass@hopper -p 2222


vi /etc/systemd/system/call-home.service:

    [Unit]
    Description=AutoSSH tunnel for calling home
    After=network.target

    [Service]
    User=pi
    Group=pi
    Environment="AUTOSSH_GATETIME=0"
    ExecStart=/usr/bin/autossh -M 0 -o "ServerAliveInterval 30" -o "ServerAliveCountMax 3" -R2001:localhost:22 raspi-b2 -p 9222

    [Install]
    WantedBy=multi-user.target

Executable:

    sudo chmod +x /etc/systemd/system/call-home.service

Käivitame:

    sudo systemctl daemon-reload
    sudo systemctl start call-home.service
    sudo systemctl enable call-home.service

Proovime järgi:

    ssh grass@hopper -p 2222

Olles seal masinas sees, teeme:

    ssh pi@localhost -p 2001

Ja nüüd oleme masinas, milles seadistasime autossh. Masin ise võib olla tulemüüride taga ja kasutada dünaamilist IP-d, kuid see meid ei sega, sest ta ise "helistab" sealt mulle koju ja hoiab "toru lahti".


Allikad:

* [SSH tunneling for fun and profit](https://www.everythingcli.org/ssh-tunnelling-for-fun-and-profit-autossh/)
* [Reverse SSH Tunnel – when you cannot SSH to your host](http://home.oraculo.pt/2017/03/21/reverse-ssh-tunnel/)
