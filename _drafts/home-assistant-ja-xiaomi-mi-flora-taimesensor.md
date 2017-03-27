---
layout: post
title: Home Assistant ja Xiaomi Mi Flora taimesensorid
categories: postitused
tags: linux raspberry-pi koduautomaatika xiaomi
image: home-assistant.png
---
Üks paljudest Home Assistant'i sisse ehitatud võimalustest on Xiaomi moodsate taimesensorite tugi. Need sensorid mõõdavad õhu temperatuuri, valgustugevust, mulla niiskust ja kaudselt ka viljakust ning annab teada ka oma patarei olukorrast.

![]({{ site.url }}/{{ page.url }}miflora.png)

# Seadistamine

Selleks, et kasutaja **pi** ilma sudota bluetoothi kasutada saaks:

    sudo usermod -G bluetooth -a pi
    sudo reboot

Seadistusfaili, mis asub **~/.homeassistant/configuration.yml**, tuleb **sensor:** blokki lisada iga seadme kohta üks selline blokk:

  - platform: miflora
    mac: "xx:xx:xx:xx:xx:xx"
    name: Flower 1
    force_update: false
    median: 3
    monitored_conditions:
      - moisture
      - light
      - temperature
      - conductivity
      - battery

Nime **name** väljale võib vabalt ise valida. Seadmete MAC-aadressid saab leida selle käsuga:

  sudo hcitool lescan

Täpsemad tähendused on seletatud [Home Assistant Mi Flora komponendi lehel](https://home-assistant.io/components/sensor.miflora/).

# Tulemus

Lõpptulemus peaks välja nägema selline:

![]({{ site.url }}/{{ page.url }}hass-miflora.png)



Allikad:

* [Mi Flora Plant Sensor](https://home-assistant.io/components/sensor.miflora/)
* [Reverse engineering the Mi flora plant sensor](https://www.open-homeautomation.com/2016/08/23/reverse-engineering-the-mi-plant-sensor/)
