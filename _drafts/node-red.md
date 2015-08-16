---
layout: post
title: Node-RED
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

    sudo apt-get install --no-install-recommends -y nodejs npm

Seisuga märts 2015 tuli default Raspian repodest versioon v0.10.29.

    cd /opt
    sudo useradd --system --user-group --create-home node-red
    sudo mkdir node-red
    sudo chown node-red:node-red node-red
    cd node-red
    sudo su -s /bin/bash node-red

    wget https://github.com/node-red/node-red/archive/0.10.4.tar.gz
    tar -xvf 0.10.4.tar.gz
    rm 0.10.4.tar.gz
    mv node-red-0.10.4/* .
    rm -r node-red-0.10.4
    npm install

Kasutaja `node-red` alt väljumiseks CTRL+d või `exit`.

    sudo vi /etc/init.d/node-red
    sudo touch /var/log/node-red.log
    sudo chown node-red:adm /var/log/node-red.log

Võtame siit init-skripti ja paigutame selle faili `/etc/init.d/node-red`. Enne salvestamist muudame ära järgmised read:

    USER=node-red
    SCRIPT_DIR='/opt/node-red/'
    DAEMON=/usr/bin/nodejs

    sudo chmod +x /etc/init.d/node-red
    sudo update-rc.d node-red defaults
    sudo /etc/init.d/node-red start


