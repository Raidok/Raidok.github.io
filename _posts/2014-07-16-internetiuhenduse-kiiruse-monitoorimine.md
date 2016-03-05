---
layout: post
title: Internetiühenduse kiiruse monitoorimine Dockeri abiga
categories: postitused
tags: linux docker
image: docker.png
---
Interneti kiirus ei ole päris see, mis lubatud? Teeme skripti, mis Dockeri abiga aitaks jälgida, mis tegelikult toimub.

# Käsurealt testimine

Leidsin sellise Dockeri repositooriumi, mis nähtavasti kasutab [speedtest-cli](https://github.com/sivel/speedtest-cli) käsurea utiliiti:

    https://registry.hub.docker.com/u/tianon/speedtest/

Tõmbame selle alla:

    sudo docker pull tianon/speedtest

Käivitame:

    docker run --rm tianon/speedtest

# Korduv jooksutamine

Uurime välja konteineri id (edaspidi KONTEINERI_ID):

    sudo docker ps -a | grep tianon/speedtest:latest

Seega käsitsi saame seda nüüd käivitada nii:

    docker start KONTEINERI_ID

Automaatseks perioodiliseks testimiseks avame aga `crontab`-i:

    sudo crontab -e

Lisame sinna rea:

    15,45 * * * * docker start KONTEINERI_ID

Nüüd kui andmeid kogunema hakkb, saame ajamärgistega logisid vaadata nii:

    sudo docker logs -t KONTEINERI_ID

Nopime välja asjalikud read:

    sudo docker logs -t 7639c67338c0 | grep "Hosted\|Download\|Upload"

Liidame read kolmekaupa kokku:

    sudo docker logs -t 7639c67338c0 | grep "Hosted\|Download\|Upload" | sed 'N;N;s/\n/ /g'

Nopime välja vajaliku info ja tekitame formaatimisvõimaluse:


    sudo docker logs -t 7639c67338c0 | grep "Hosted\|Download\|Upload" | sed 'N;N;s/\n/ /g' | sed -n 's/\(\[.*\]\) Hosted by \(.*\): \(.* ms\) .* Download: \(.*\/s\) .* Upload: \(.*\/s\)/\1  Ping: \3  Down: \4  Up: \5  Server: \2/p'


Tulemus:

    [Jul 15 15:14:30.939]  Ping: 42.437 ms  Down: 31.13 Mbits/s  Up: 8.89 Mbits/s  Server: Elion Enterprises Limited (Tallinn) [1.52 km]
    [Jul 15 20:05:25.792]  Ping: 39.358 ms  Down: 30.66 Mbits/s  Up: 8.50 Mbits/s  Server: Compic OU (Tallinn) [1.52 km]
    [Jul 16 10:02:35.081]  Ping: 45.948 ms  Down: 30.65 Mbits/s  Up: 9.25 Mbits/s  Server: Compic OU (Tallinn) [1.52 km]
    [Jul 16 10:30:07.788]  Ping: 34.351 ms  Down: 38.23 Mbits/s  Up: 6.73 Mbits/s  Server: Starman AS (Tallinn) [1.04 km]
    [Jul 16 10:45:08.434]  Ping: 38.253 ms  Down: 33.36 Mbits/s  Up: 8.40 Mbits/s  Server: Starman AS (Tallinn) [1.04 km]
    [Jul 16 11:15:04.294]  Ping: 40.844 ms  Down: 32.86 Mbits/s  Up: 7.10 Mbits/s  Server: AS EMT (Tallinn) [1.52 km]
    [Jul 16 11:37:52.029]  Ping: 33.662 ms  Down: 32.34 Mbits/s  Up: 8.70 Mbits/s  Server: Compic OU (Tallinn) [1.52 km]

