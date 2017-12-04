---
layout: post
title: SIM800L
categories: postitused
tags: arduino avr
image: arduino.png
---


# AT-käsklused



## Lihtsamad tegevused

`AT` - Lihtsalt kontrollimiseks, et kas modem on olemas, vastab alati OK

`AT+CPIN?` - Tagastab ühe allolevatest:

* READY - PIN-lukk on maas (kas ei küsita üldse PIN-i või on see juba edukalt sisestatud)
* SIM PIN - PIN-kood vajab sisestamist, selle kohta loe alt poolt

`AT+CFUN?`
Ütleb, et mis režiimis modem on:

* 1 - tavarežiim
* 0 - madala energiatarbega režiim

`AT+CPIN="9546"` - PIN-koodi ssisestamine
`AT+CLCK="SC",0,"9546"` - PIN-koodi küsimise keelamine
`AT+CSQ` - mobiilivõrgu signaalikvaliteedi pärimine



## Töörežiimi valik

`AT+CFUN=0`
Lülitab modemi madala energiatabe režiimi

`AT+CFUN=1`
Lülitab modemi tavarežiimi

`AT+CPOWD=1`
Lülitab modemi välja


## Data teenused


### Ettevalmistus

Paljud tegevused vajavad, et enne oleks järgnevad käsud selles järjekorras läbi jooksutatud:

AT+SAPBR=3,1,"CONTYPE","GPRS"
AT+SAPBR=3,1,"APN","internet"
AT+SAPBR=1,1


### Kui eelnev on tehtud, võib proovida alljärgnevaid:

`AT+CIPGSMLOC=1,1` - Ligikaudse asukoha ja kella aja küsmine, vastus peaks välja nägema analoogne: **+CIPGSMLOC: 0,24.672608,59.395128,2017/03/20,19:24:13**
`AT+SAPBR=2,1` - IP-aadressi küsimine. Dünaamilise IP puhul antakse siin töenäoliselt mobiilivõrgusisene aadress, millega pole suurt midagi teha.

### Lõpetamine

Pärast vahepeal olnud käskude proovimist saab sessiooni lõpetada nii:

AT+SAPBR=0,1




## HTTP GET päring

Eeldab ettevalmistavaid tegevusi eelmisest sammust.

AT+HTTPINIT

AT+HTTPPARA="CID",1

AT+HTTPPARA="URL","ipecho.net/plain"

AT+HTTPACTION=0
vastuses on kirjas vastuse kood ja suurus, ehk siis midagi taolist: HTTPACTION: 0,200,14

AT+HTTPREAD
trükib kogu vastuse välja, antud juhul peaks seal näha olema tegelik väline IP-aadress

AT+HTTPTERM
ühenduse lõpetamine



Allikad:

* [Disable PIN code using Gsm modem AT commands](https://dostmuhammad.com/blog/disable-pin-code-using-gsm-modem-at-commands/)
* [GET request using AT commands SIM800 SIM900](https://dostmuhammad.com/blog/making-get-request-using-at-commands-sim800-sim900/)
* [HowTo test SMS-Modem using minicom](https://kb.op5.com/display/FAQ/HowTo+test+SMS-Modem+using+minicom)
* [Remote control by Arduino phone DTMF (with SIM800)](http://cassiopeia.hk/arduino-dtmf/)
* [Send SMS using AT commands](http://www.smssolutions.net/tutorials/gsm/sendsmsat/)
* [Sea Temperature Sensor using GSM](https://hackaday.io/project/6296/logs)
