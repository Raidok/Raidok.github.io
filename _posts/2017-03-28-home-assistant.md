---
layout: post
title: Home Assistant
categories: postitused
tags: linux raspberry-pi koduautomaatika
image: home-assistant.png
---
Üle pika aja sattusin jälle [Home Assistant](https://home-assistant.io/) nimelist tarkvara proovima ja peab tunnistama, et tegu on päris võimeka platvormiga, mida kodu automatiseerimises kasutada võib.

    sudo apt-get install python3-pip
    sudo pip3 install homeassistant
    hass --open-ui

Automaatseks käivitumiseks tegin faili **/lib/systemd/system/home-assistant.service** sisuga:

    [Unit]
    Description=Home Assistant
    After=network.target

    [Service]
    Type=simple
    User=pi
    Group=pi
    ExecStart=/usr/local/bin/hass --open-ui
    # Use SIGINT to stop
    KillSignal=SIGINT
    # Auto restart on crash
    Restart=on-failure
    # Tag things in the log
    SyslogIdentifier=homeassistant
    StandardOutput=syslog

    [Install]
    WantedBy=multi-user.target

Peale seda:

    sudo systemctl daemon-reload
    sudo systemctl enable
    sudo systemctl start

Käivitamine võtab natukene aega. Võib vahepeal ka syslogi vaadata, et kas äkki on seal mõni viga:

    tail -f /var/log/syslog

Kui kõik paistab korras olevat, suuname brauseri aadressile [http://raspberry.pi.ip.aadress:81234](http://raspberry.pi.ip.aadress:81234).

Minul leidis ta võrgust kohe automaatselt teleka ja Chromecasti üles ja tekitas veebiliidesesse vastavad nupud ja paneelid nende juhtimiseks.



Allikad:

* [Home Assistant: Getting Started](https://home-assistant.io/getting-started/)
