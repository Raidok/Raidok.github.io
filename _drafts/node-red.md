---
layout: post
title: Node-RED
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
Internet of Things on selle kümnendi hittsõna. Sellega seoses on turule tekkinud meeletus koguses erinevaid seadmeid, mis omavahel väga hästi suhelda ei oska. Oleks vaja midagi, mis andurite poolt toodetavaid andmeid kuidagi kasulikult ära kasutada oskaks. Appi tuleb Node-RED!

Raspberry Pi peale installimiseks vajame alustuseks Node.js-i:

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Kontrollime versiooni:

    node -v

Viimati sain ma sealt versiooni 4.2.1 mis on LTS(_Long Term Support_) perekonnast, ehk peaks olema suhteliselt stabiilne.

Installime [Node-RED](http://nodered.org/docs/hardware/raspberrypi#install-node-red)-i:

    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-start -O /usr/bin/node-red-start
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-stop -O /usr/bin/node-red-stop
    sudo chmod +x /usr/bin/node-red-st*
    sudo systemctl daemon-reload

Et ta automaatselt käivituks:

    sudo systemctl enable nodered.service

Käivitamiseks:

    sudo systemctl start nodered.service
