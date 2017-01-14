---
layout: post
title: Xiaomi flora sensor
categories: postitused
tags:
image:
---

Selleks, et tavakasutaja ilma sudota bluetoothi kasutada saaks:

    sudo usermod -G bluetooth -a pi
    sudo reboot


Home Assistant-il on miflora andurite tugi kohe olemas:

    sudo apt-get install python3-pip
    sudo pip3 install homeassistant
    sudo hass --open-ui


Allikad:

* [Reverse engineering the Mi flora plant sensor](https://www.open-homeautomation.com/2016/08/23/reverse-engineering-the-mi-plant-sensor/)
* [Home Assistant: Getting Started](https://home-assistant.io/getting-started/)
