---
layout: post
title: Node-RED
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
asd

    sudo apt-get update
    sudo apt-get install git build-essential fakeroot devscripts autoconf dh-autoreconf
    git clone https://github.com/rscada/libmbus
    cd libmbus
    ./build-deb.sh
    ./configure
    make
    sudo make install



    $ sudo mbus-serial-scan
    mbus-serial-scan: error while loading shared libraries: libmbus.so.0: cannot open shared object file: No such file or directory



    sudo ln -s /usr/local/lib/libmbus.so.0 /usr/lib/libmbus.so.0






Allikad:

* http://bends.se/?page=anteckningar/automation/m-bus/libmbus
