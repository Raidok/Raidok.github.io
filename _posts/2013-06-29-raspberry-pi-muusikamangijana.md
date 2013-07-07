---
layout: default
title: Raspberry Pi muusikamängijana
categories: postitused
tags: raspi raspbian raspberry pi linux netiraadio muusika
---

Üks üsna kasulik otstarve Raspberry Pi jaoks võiks olla netiraadio mängimine. Proovisin seda realiseerida ja dokumenteerin selle siia maha.

## Seadistamine

Installime mpd ja mpc ning asume konfima.

    sudo apt-get install mpd mpc
    sudo nano /etc/mpd.conf

Viime sisse umbes taolised muudatused (NB! #-märk kommenteerib ridu välja):

    music_directory         "/mnt/lacie/muusika"
    
    bind_to_address         "any"

    audio_output {
            type            "alsa"
            name            "My ALSA Device"
            device          "hw:0,0"        # optional
    #       format          "44100:16:2"    # optional
    #       mixer_device    "default"       # optional
    #       mixer_control   "PCM"           # optional
    #       mixer_index     "0"             # optional
    }

    mixer_type                      "software"

Peale salvestamist teeme muudatuste rakendamiseks mpd-le restardi.

    sudo service mpd restart


kontrolli, kas helimoodul laetakse:

    sudo nano /etc/modules

Seal peab olema midagi taolist:

    snd-bcm2835

Seame heliväljundiks analoogväljundi.

    sudo amixer cset numid=3 1

Kui 1 asemele panna 2, valitakse väljundiks HDMI, 3 määrab väjundi automaatselt.

## Kasutamine

Hea valik eesti raadioid on saadaval aadressil [striiming.trio.ee](http://striiming.trio.ee). Lisame näiteks Spin FM-i ja paneme selle mängima:

    mpc add http://striiming.trio.ee/spinfm.mp3.m3u
    mpc play

Lisavalikute uurimiseks käivitada käsklus `mpc --help`.
