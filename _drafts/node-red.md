---
layout: post
title: Node-RED
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Kontrollime versiooni:

    node -v

Seisuga mai 2016 tuli default Raspian repodest versioon v4.2.1, 4.x seeria on LTS, mis on väga hea.

Installime (Node-Red)[http://nodered.org/docs/hardware/raspberrypi#install-node-red]:

    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-start -O /usr/bin/node-red-start
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-stop -O /usr/bin/node-red-stop
    sudo chmod +x /usr/bin/node-red-st*
    sudo systemctl daemon-reload

Et ta automaatselt käivituks:

    sudo systemctl enable nodered.service



