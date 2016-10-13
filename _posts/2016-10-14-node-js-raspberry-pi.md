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

Viimati sain mina sealt versiooni v4.2.1, mis on LTS(_Long Term Support_) - väga hea!
