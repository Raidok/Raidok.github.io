---
layout: post
title: zRam kernelimoodul ehk swappimine mälus
categories: postitused
tags: linux ubuntu
image: linux.png
---
Kui brauseris on üle kümne tääbi lahti ja samal ajal tegeleda näiteks Java arendamisega, siis on üsna reaalne, et 8 GB mälust jääb aeg-ajalt väheks ja hakatakse kõvakettale swappima. SSD-ketta puhul pole kiiruskadu suur, kuid võib viimase elueale halvasti mõjuda. Odavaimaks lahenduseks on kerneliumoodul zRam, mis on alates Ubuntu versioonist 12.04 saadaval aptitude kaudu.

Idee pärineb sellest [zRam paigaldamise õpetusest](http://ubuntufixer.blogspot.com/2012/11/increase-performance-with-zram.html), kuid see on nii lihtne, et toon selle kohe ka siin välja:

    sudo apt-get install zram-config

