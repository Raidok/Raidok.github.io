---
layout: post
title: LibCEC
categories: postitused
tags: linux
image: linux.png
---

Installime lib-cec
https://nyxi.eu/blog/2013/04/15/raspbian-libcec/

Installime nodejs
http://nodered.org/docs/hardware/raspberrypi.html

Installime node-red
http://nodered.org/docs/getting-started/installation.html


#lib-cec

Teegi kompileerimiseks on vajalikud mitmed pakikesed:

    sudo apt-get install cmake libudev-dev libxrandr-dev python-dev swig

Kloonime koodi:

    git clone --depth=1 git://github.com/Pulse-Eight/libcec.git
    //
    git clone --depth=1 -b release --single-branch git://github.com/Pulse-Eight/libcec.git

Kompileerime ja paigaldamine:

    mkdir libcec/build
    cd libcec/build
    cmake ..
    make -j4
    sudo make install
    sudo ldconfig


./bootstrap
./configure --with-rpi-include-path=/opt/vc/include --with-rpi-lib-path=/opt/vc/lib --enable-rpi
make
sudo make install

Lingime teegid, et cec-client nad leiaks:

    sudo ldconfig

Testimiseks jooksuta käsk: cec-client -l:

    Found devices: 1

    device:           1
    com port:     RPI
    vendor id:        2708
    product id:       1001
    firmware version: 1
    type:         Raspberry Pi

To send commands to for instance a connected TV: echo “standby 0” | cec-client -s


#nodejs






sudo apt-get install unzip
wget https://github.com/node-red/node-red/archive/0.9.1.zip
https://github.com/node-red/node-red/archive/0.10.4.tar.gz
unzip 0.9.1.zip
mv node-red-0.9.1 node-red
cd node-red


init skript
https://gist.github.com/Belphemur/cf91100f81f2b37b3e94
sudo vi /etc/init.d/node-red


sudo update-rc.d node-red defaults
sudo service node-red start



npm install node-red-node-wol node-red-node-ping


# tapa hangunud protsessid
kill -9 $(ps aux | awk '/[c]ec-client/{print $2}')
# lülita rpi hdmi input
echo "tx 4f 82 13 00" | cec-client -s -d 1
# telekas välja
echo "tx 10 36" | cec-client -s -d 1
# kõlarid välja
echo "tx 14 36" | cec-client -s -d 1


Allikad:

* (GitHub: Pulse-Eight/libcec)[https://github.com/Pulse-Eight/libcec/blob/master/docs/README.raspberrypi.md]
