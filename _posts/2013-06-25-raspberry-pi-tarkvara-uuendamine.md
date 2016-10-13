---
layout: post
title: Raspberry Pi tarkvara uuendamine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---

Mõnikord tuleb ette, et millegi jooksutamiseks puudub vajalik kerneli moodul vms. Selleks tarbeks on [@Hexxeh](https://twitter.com/Hexxeh) loonud mugava rakenduse `rpi-update`.

Uuendame kõik paketid

    sudo apt-get update
    sudo apt-get upgrade

Installime `rpi-update` programmi:

    sudo apt-get install rpi-update

Uuendame tarkvara ära ja restardime:

    sudo rpi-update
    sudo reboot
