---
layout: post
title: Võrgu optimeerimine - Jumbo Frame
categories: postitused
tags: linux
image: linux.png
---
Switchid ja ruuterid võivad ägedad olla, [gigabitised](http://en.wikipedia.org/wiki/Gigabit_Ethernet), [Jumbo Frame](http://en.wikipedia.org/wiki/Jumbo_frame) toega ja mida veel, kuid kui on vaja suuri faile liigutada, siis peaksid ka võrgukaablite otsas olevad seadmed sellest kasu lõigata oskama. Üks väga lihtne nipp selleks on MTU (*maximum transfer unit*) suurendamine.

# MTU suurendamine

OSX:

    sudo ifconfig en0 mtu=9000

Linux:

    sudo ip link set eth0 mtu=9000



# Testimine

OSX:

    ping -D -s 8184 ip-aadress

Linux:

    ping -s 8972 ip-aadress



## Veaolukorrad

Kui seade, millelt pingida üritad, on valesti konfitud, saab selliseid teateid:

    ping: sendto: Message too long
    ping: sendto: Message too long

Kui tulevad alljärgnevad teated, siis on viga teises otsas (pingitavas seadmes) või teele jäävates võrguseadmetes, nt switch ei toeta Jumbo Frame'i.

    Request timeout for icmp_seq 0
    Request timeout for icmp_seq 1

Täpsemat lugemist [suuremate pakettidega pingimisest](http://www.mylesgray.com/hardware/test-jumbo-frames-working/).

