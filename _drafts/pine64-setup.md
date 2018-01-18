---
layout: post
title: Pine64
categories: postitused
tags: linux debian
image: pine64.png
---
Pine64.

Laadisin pakitud _image_-faili ühelt Pine64 wikis mainitud lingilt alla ja pakkisin lahti:

    xz -d pine64_openhab2_20170129.img.xz

Tavaliselt, kui mul on vaja mingi _img_-fail pulgale või mälukaardile kirjutada, siis kasutan selleks [Raspberry Pi kodulehel olevat õpetust](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).



Esmased seaditused.

    sudo -i
    /usr/local/sbin/pine64_update_uboot.sh
    /usr/local/sbin/pine64_update_kernel.sh
    /usr/local/sbin/resize_rootfs.sh
    reboot


Üldised uuendused, sh näiteks openhab 2.0 -> 2.2 uuendus.

    sudo apt-get update && sudo apt-get upgrade

Allikad:

* [Pine A64 openHAB Release](http://wiki.pine64.org/index.php/Pine_A64_openHAB_Release)
* [Getting Started – Linux (pine64.org)](https://www.pine64.org/?page_id=1929)
