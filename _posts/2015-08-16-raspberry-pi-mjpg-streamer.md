---
layout: post
title: Raspberry Pi video striimimine
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
Tekkis mõte proovida, kuidas Raspberry Pi valvekaamerana toimiks, kuna NoIR kaameramoodul ning ka mingi infrapunavalgusti on ammusest ajast juba olemas ja kasutust ootavad.

Olen kunagi veebikaamera striimimiseks kasutanud sellist tarkvara nagu MJPG-Streamer. Enamus õpetusi Internetis pakkus lahendust, kus `raspistill` salvestab perioodiliselt pilte `/tmp` kausta, kusjuures paljudel juhtudel `ramfs`-ist polnud juttugi, ja `mjpg-streamer` striimib seda pilti.

Siis aga leidsin midagi paremat: [https://github.com/jacksonliam/mjpg-streamer](https://github.com/jacksonliam/mjpg-streamer). See lahendus teeb sama asja ära ühe hoobiga, ilma failita ning latentsus on ka minimaalne!


# Paigaldus

Logi SSH kaudu Raspberrysse sisse ja teeme MJPG-Streameri jaoks pesa valmis:

    cd /usr/src
    sudo mkdir mjpg-streamer
    sudo chown `whoami`:users mjpg-streamer
    cd mjpg-streamer

Kloonime repo:

    git clone https://github.com/jacksonliam/mjpg-streamer.git .

Koodi ehitamiseks ja töötamiseks on vajalikud mõningad sõltuvused:

    apt-get install libv4l-dev libjpeg8-dev imagemagick build-essential cmake subversion

Kompileerime (minu kõige vanema Pi peal võttis see aega kõigest paarkümmend sekundit):

    cd mjpg-streamer-experimental
    make

Nüüd peakski toimima!

    export LD_LIBRARY_PATH=.
    ./mjpg_streamer -o "output_http.so -w ./www" -i "input_raspicam.so -x 640 -y 480 -fps 20 -ex night"

Et ta püsivalt tööle jääks, kasutasin järgmist käsku:

    nohup ./mjpg_streamer -o "output_http.so -w ./www" -i "input_raspicam.so -x 960 -y 540 -fps 15 -ex night -vf -hf" >/dev/null 2>&1 &


Allikas:
* [Low Latency (~0.4 s) Video Streaming From Raspberry Pi Using Mjpeg-Streamer and OpenCV](http://petrkout.com/electronics/low-latency-0-4-s-video-streaming-from-raspberry-pi-mjpeg-streamer-opencv/)
