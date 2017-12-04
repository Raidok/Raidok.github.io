---
layout: post
title: Node-RED
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
Internet of Things on selle kümnendi hittsõna. Sellega seoses on turule tekkinud meeletus koguses erinevaid seadmeid, mis omavahel väga hästi suhelda ei oska. Oleks vaja midagi, mis andurite poolt toodetavaid andmeid kuidagi kasulikult ära kasutada oskaks. Appi tuleb Node-RED!


# Node.js

Kuna Node-RED töötab Node.js platvormil, siis kõigepealt tuleb alustada selle installimisest. [Juhend Node.js paigaldamiseks on siin]({{site.url}}/postitused/node-js-raspberry-pi/).

![]({{site.url}}/{{page.url}}install.png)

# Node-RED

[Node-RED](http://nodered.org/docs/hardware/raspberrypi#install-node-red)-i enda installimine on väga lihtsaks tehtud:

    sudo apt-get install build-essential python-rpi.gpio
    bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

Käivitamiseks polegi nüüd muud vaja kui jooksutada `node-red-start` ja sulgemiseks vajutada Ctrl+C.

Kui aga tahta Node-REDi taustal jooksutada, siis on vaja teha nii:

    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
    sudo systemctl daemon-reload

Nüüd saab Node-REDi taustale tööle panna tehes nii:

    sudo systemctl start nodered.service

Kui on soov, et ta käivituks koos Rasberry Pi-ga, siis on vaja see lubada:

    sudo systemctl enable nodered.service

Node-REDi kasutajaliides on nüüd alati kättesaadav Raspberry Pi IP-aadressil pordil 1880.
