---
layout: post
title: Arduino ja Raspberry Pi
categories: postitused
tags: arduino raspberry-pi
image: arduino.png
---


# Ettevalmistused

Teeme muudetavates konfifailidest koopiad:

    cp /boot/cmdline.txt /boot/cmdline.bak
    cp /etc/inittab /etc/inittab.bak

Kustutame või kommenteerime välja read "console=ttyAMA0,115200" jja "kgdboc=ttyAMA0,115200" failist "/boot/cmdline.txt".

Failis "/etc/inittab" kommenteerime välja viimase rea, mis peaks olema "T0:23:respawn:/sbin/getty -L ttyAMA0 115200 vt100.

Nüüd peaksid RXD (GPIO15) ja TXD (GPIO14) peale restarti olema UART-ina kasutatavad.


Üle UART-i suhtlemiseks sobib näiteks minicom:

    sudo apt-get install minicom
    minicom -b 9600 -o -D /dev/ttyAMA0


Selleks, et lokaalihoiatused kogu aeg ei häiriks lisa /etc/default/locale faili need read:

    LANG=et_EE.UTF-8
    LC_CTYPE=et_EE.UTF-8


Lisa ~/.bashrc faili:

    local-timestamp() { TIMEZONE=$(date +%z); SIGN=${TIMEZONE:0:1}; OFFSET=${TIMEZONE:1}; echo "$(date +%s)$SIGN($OFFSET*36)" | bc; }
    send() { echo "$1" >> /dev/ttyAMA0; }
    send-timestamp() { send T$(local-timestamp); sleep 1; send U; }

    alias send-reset='echo "0" > /sys/class/gpio/gpio17/value && sleep 1 && echo "1" > /sys/class/gpio/gpio17/value && sleep 1 && send-timestamp'

    send-fw() { sudo avrdude -q -V -p ATMEGA328P -C /etc/avrdude.conf -c arduino -b 57600 -P /dev/ttyAMA0 -U flash:w:$1; }
    alias recv='minicom -b 9600 -o -D /dev/ttyAMA0'


Tekita fail /etc/init.d/gpio:

    #!/bin/bash

    start() {
        echo "initializing Arduino reset pin"
        echo "17" > /sys/class/gpio/export
        echo "out" > /sys/class/gpio/gpio17/direction
        echo "1" > /sys/class/gpio/gpio17/value
    }

    stop() {
        echo "17" > /sys/class/gpio/unexport
    }

    case "$1" in 
        start)
           start
           ;;
        stop)
           stop
           ;;
        *)
           echo "Usage: $0 {start|stop}"
    esac

    exit 0 


Teeme ta käivitatavaks ja lisame _bootimisel_ käivitatavate skriptide hulka

    chmod +x /etc/init.d/gpio
    update-rc.d -f gpio defaults


Allikad:

* [How to use GPIOs on raspberry pi (Simple I/O, PWM and UART)](https://sites.google.com/site/semilleroadt/raspberry-pi-tutorials/gpio)
