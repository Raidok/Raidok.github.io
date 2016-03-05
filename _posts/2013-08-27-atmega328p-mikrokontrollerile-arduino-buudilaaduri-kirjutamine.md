---
layout: post
title: Arduino buudilaaduri kirjutamine ATmega328p-le
categories: postitused
tags: arduino
image: arduino.png
---

Arduino arendusplaat maksab mitmeid kümneid eurosid ja iga projekti jaoks eraldi osta seda eriti ei raatsi. Mõttekam on koostada minimaalne vajalik skeem, mis on kordades odavam ja võib ka kodustes tingimustes mõõtudelt väiksem tulla.

## Arduino IDE ettevalmistamine

Et mikrokontrollerit oleks mugav ja lihtne makettplaadil ilma kvartsita kasutada, tegin klemmide järjestuse veidi ümber:

<pre><code>                     +-\/-+
               PC6  1|    |28  PC5 (AI 5)
         (RX)  PD0  2|    |27  PC4 (AI 4)
         (TX)  PD1  3|    |26  PC3 (AI 3)
         (D 0) PD2  4|    |25  PC2 (AI 2)
    PWM+ (D 1) PD3  5|    |24  PC1 (AI 1)
         (D 2) PD4  6|    |23  PC0 (AI 0)
               VCC  7|    |22  GND
               GND  8|    |21  AREF
         (D 3) PB6  9|    |20  AVCC
         (D 4) PB7 10|    |19  PB5 (D 13)
    PWM+ (D 5) PD5 11|    |18  PB4 (D 12)
    PWM+ (D 6) PD6 12|    |17  PB3 (D 11) PWM
         (D 7) PD7 13|    |16  PB2 (D 10) PWM
         (D 8) PB0 14|    |15  PB1 (D 9) PWM
                     +----+
</code></pre>

Vajalikud muudatused on üleval [GitHubi repositooriumis](https://github.com/Raidok/bb) aga kirjeldan vajalikke muudatusi lühidalt ka siin:

1. Arduino IDE kaustas olles tuleb liikuda `hardware > arduino`
2. avada fail `boards.txt` ja lisa faili lõppu [sisu lingilt](https://raw.github.com/Raidok/bb/master/hardware/arduino/boards.txt)
3. salvestada, sulgeda ja liikuda edasi kausta `variants` ja luua sinna kaust `breadboard`
2. kausta `breadboard` tekitada fail `pins_arduino.h`, [sisu lingilt](https://raw.github.com/Raidok/bb/master/hardware/arduino/variants/breadboard/pins_arduino.h)


## Arduino arendusplaadi ettevalmitamine

Selleks on vaja:
1. Arduino arendusplaat või lihtsalt mikrokontroller, kus on juba Arduino buudilaadur peal
2. ATmega328p mikrokontroller, millele hakkame buudilaadurit kirjutama
3. juhtmejupid ja makettplaat skeemi koostamiseks

Kontrollime Arduino IDE seadistused:
* Tööriistad -> Plaat -> Arduino Uno
* Tööriistad -> Jadaport -> valida õige port (tõenäoliselt ainus)
* Tööriistas -> Programmaator -> AVRISP mkII

Avame ArduinoISP sketši ja kirjutame selle kontrollerisse:
* Fail -> Näited -> ArduinoISP
* Fail -> Laadi üles

## Arduino buudilaaduri kirjutamine


Ühendame kontrolleri Arduino arendusplaadiga järgmise skeemi järgi ning arendusplaadi enda USB-ga arvuti külge:

[![ArduinoISP](p-uno-breadboard-bootloader_bb.png)](uno-breadboard-bootloader_bb.png)

Seadistame Arduino IDE ümber ja kirjtuame buudilaaduri uuele kontrollerile peale:
* Tööriistad -> Plaat -> ATmega328 on a breadboard (internal 8 MHz)
* Tööriistad -> Jadaport -> valida õige port (tõenäoliselt pole muutunud)
* Tööriistas -> Programmaator -> Arduino as ISP
* Tööriistad -> Kirjuta buudilaadur


## Programmeerimine FTDI adapteriga

Selleks on vaja:
1. FTDI-adapter
2. 10-kilooomine takisti
3. 100 nF kondensaator
4. juhtmejupid ja makettplaat skeemi koostamiseks
5. katsetamiseks 100-oomine takisti, LED, mikrolüliti

Ühendame FTDI kaabli kontrolleri külge alloleva skeemi järgi:

[![FTDI](p-breadboard-blink_bb.png)](breadboard-blink_bb.png)


## Katsetamine

* avada Blink sketš - Fail -> Näited -> Basics -> Blink
* muuta muutuja `led` väärtus 8-ks
* Fail -> Laadi üles
* Vilgub!


##Tüüpprobleemid

Arduino Duemilanovega teist AVR-i programmeerides saan tavaliselt sellise teate:

    avrdude: stk500_getsync(): not in sync: resp=0x15

Lahenduseks on Arduinole RESET ja GND vahele vähemalt 10 uF kondensaator ühendada, 100 uF töötab ka.
