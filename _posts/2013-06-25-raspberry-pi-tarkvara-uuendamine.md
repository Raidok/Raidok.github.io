---
layout: post
title: Raspberry Pi tarkvara uuendamine
categories: postitused
tags: raspberry-pi linux debian
---

Mõnikord tuleb ette, et millegi jooksutamiseks puudub vajalik kerneli moodul vms. Selleks tarbeks on [@Hexxeh](https://twitter.com/Hexxeh) loonud mugava rakenduse `rpi-update`.

Uuendame kõik paketid

    sudo apt-get update
    sudo apt-get upgrade

Installime rpi-update programmi

    sudo wget https://raw.github.com/Hexxeh/rpi-update/master/rpi-update -O /usr/bin/rpi-update
    sudo chmod +x /usr/bin/rpi-update

Teeme igaks juhuks tagavarakoopia

    sudo cp /boot/start.elf /boot/start.elf.backup

Uuendame tarkvara ja restardime

    sudo rpi-update
    sudo reboot
