---
layout: post
title: Node.js paigaldamine Raspberry Pi peale
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
NodeJS on väga populaarne platvorm. Kuidas seda Raspberry Pi peal jooksutada? Kohe saame teada!

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Kontrollime versiooni:

    node -v

Viimati sain mina sealt versiooni v4.2.1, mis mõnda aega tagasi oli veel LTS(_Long Term Support_) aga aeg lendab kiiresti. Mugavaks versiooni uuendamiseks installime paketi `n`:

    sudo npm install -g n

Sellega on node versiooni uuendamine imelihtne. Installime praegu LTS-iks kuulutatud versiooni nii:

    sudo n lts

Sellega saab ka konkreetsemaid versioone installida, näiteks kui on vaja mingi vanem projekt käima ajada, mis nõuab node versiooni 0.12, siis tuleks "lts" asemele panna "v0.12".
