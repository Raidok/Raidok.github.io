---
layout: post
title: Tuulejaam
categories: postitused
tags: arduino avr
image: arduino.png
---
Ehitan odava vahendi tuule mõõtmiseks.



# Tuule mõõtmine

[WS1080/WS](http://www.ronex.ee/Tootekataloog/Ilmajaamade_tarvikud/tuulekiiruse_andur_mudelile_ws1080_ws1080_ws)



# Side

SIM800L toitepinge 3,7-4,2V ehk siis on mõeldud LiPo aku pealt toitmiseks. Sisse-/väljalülitamine transistoriga kui peaks vajadus olema?



# Kommunikatsioon

[MQTT](https://elementztechblog.wordpress.com/2016/07/18/arduino-mqtt-library-for-sim800-gsm-modem/)



# Toide

## Variant 1: akupank

Hea variant, kuna neid on üldiselt LiPo akud sees. Eriti hea oleks veel päikesepaneeliga akupank, mis ennast laeks ka veel.


## Variant 2: patareid

Patareide nominaalpinge on 1,5V, 3 tükki kokku on 4,5. Limiit läheb väheke lõhki. Selle vastu aitab aga üks diood, mis tekitaks 0,3-0,4 pingelangu ja lisaboonusena saaksime kaitse selle vastu, et midagi "õhku" ei lendaks kui patareid valet pidi külge ühendatakse.

Pika eluea saamiseks tasuks veel D-tüüpi patareisid kasutada

D-tüüpi patareide mahutavus peaks olema umbes 8000mAh ehk 12Wh. Kui neid on 3, kasvab mahutavus 24000 mAh-n. Kirjade järgi võtab SIM800L saatmise hetkel ~500mA voolu. Kui modem kogu aeg vahet pidamata ainult saadaks, võtaks nende patareide tühjaks saamine aega 48 tundi. Tegelikkuses peaks rahuolekus kogu kupatus alla 10mA voolu võtma ja saatmine võib keskmiselt kuni 10 sekundit aega võtta. Kui saata iga 5 minuti tagant, võtab seade voolu ( (10 * 500) + (590 * 10) / 600) ~~ 18,17 mAh. Sellise keskmise tarbimisega jätkuks patareidest umbes 55 päevaks.


# BOM

Kaks varianti, aga nende ühisosa:
* anemomeeter 12€
* temperatuuriandur 3€
* mikrokontroller 10€
* GSM-moodul 15€
* erinevaid väikemaid elektroonikakomponente 5€

## patareidega
* korpus 10€
* patareid 3€
* pingeregulaator 10€
KOKKU 68€

## aku ja päikesepaneelidega
* korpus 20€
* aku €10
* päikesepaneel 5€
* laadimiskontroller 10€
KOKKU 90€


Allikad:

* [Low-cost wind datalogger](http://www.re-innovation.co.uk/web12/index.php/en/projects/wind-datalogger)
* [What will be the power consumption of the GSM GPS Glonass tracker?](http://www.gsm-modem.de/M2M/m2m-faq/power-consumption-gsm-gps-tracker/)
* [Bluetooth Low Energy Based Wireless Anemometer](http://www.etesian-tech.com/bluetooth-anemometer.html?utm_source=Blog&utm_medium=blog%20post&utm_content=Laird%20Blog%20Post&utm_campaign=Etesian%20Wind%20Sensor)
* [EEmbed with Elliot: DEBOUNCE YOUR NOISY BUTTONS, PART I](http://hackaday.com/2015/12/09/embed-with-elliot-debounce-your-noisy-buttons-part-i/)
