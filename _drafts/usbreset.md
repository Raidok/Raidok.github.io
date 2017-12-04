---
layout: post
title: USB reset
categories: postitused
tags: linux
image: linux.png
---


You can reset USB bus via this C program. https://gist.github.com/x2q/5124616

Download C code from github

wget -c --no-check-certificate https://gist.githubusercontent.com/x2q/5124616/raw/3f6e5f144efab2bc8e9d02b95b8301e1e0eab669/usbreset.c -O usbreset.c
Compile C code as usbreset

cc usbreset.c -o usbreset
Give execute permission to program

chmod +x usbreset
List your USB devices via lsusb command

lsusb
You should see USB device entries in your output and check device you want to reset for.

Bus 002 Device 003: ID 0fe9:9010 DVICO

Run usbreset program with arguments

sudo ./usbreset /dev/bus/usb/002/003



Allikad:

* [How do I reset a USB device using a script?](http://raspberrypi.stackexchange.com/a/9265/48178)
