---
layout: post
title: Automaatne piltide kopeerimine mälukaardilt võrgukettale
categories: postitused
tags: linux
image: linux.png
---
WIP

Pistsin USB-mälukaardilugeja külge ja jookustasin dmesg:

    [1458707.707729] usb 1-1.5: new high-speed USB device number 4 using dwc_otg
    [1458707.808819] usb 1-1.5: New USB device found, idVendor=14cd, idProduct=8123
    [1458707.808848] usb 1-1.5: New USB device strings: Mfr=1, Product=3, SerialNumber=2
    [1458707.808860] usb 1-1.5: Product: USB 2.0  SD MMC READER 
    [1458707.808873] usb 1-1.5: Manufacturer: SDMMC MA8123
    [1458707.808884] usb 1-1.5: SerialNumber: 812320080329

    ACTION=="add", SUBSYSTEM="usb", ATTRS{idVendor}=="14cd", ATTRS{idProduct}=="8123", OWNER="osmc", RUN+="su - osmc -c ~pi/photosync.sh >> ~pi/photosync.log.$(date +\"%Y-%m-%d_%H-%M-%S\")"
