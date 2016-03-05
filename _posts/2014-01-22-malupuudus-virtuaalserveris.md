---
layout: post
title: Mälupuudus virtuaalserveris
categories: postitused
tags: linux vps digitalocean docker
image: digitalocean.png
---

Erinevaid rakendusi proovides ja taustaprotsesse jooksutades hakkas mu DigitalOceani droplet veidralt käituma. Selgus, et 512 MB mälu oli pilgeni täis saanud. Swappi vaikimisi seal virtuaalserveritel pole, seega tuleb teha swap-fail.

Näiteks `docker` hakkas enamus käskude peale mälupuuduse teatama järgmist:

    runtime: panic before malloc heap initialized
    fatal error: runtime: cannot allocate heap metadata

Sellistes olukordades võib kernel hakata oma suva järgi protsesse tapma, mis võib kaasata ettearvamatuid tagajärgi.

Swap-faili tegemine on lihtne!

    sudo dd if=/dev/zero of=/swapfile bs=1024 count=512k
    sudo mkswap /swapfile
    sudo swapon /swapfile

Et ka peale restarte see alles püsiks, lisame selle `/etc/fstab` faili:

    sudo echo "/swapfile       none    swap    sw      0       0" >> /etc/fstab

[Loe ka täpsemalt](https://www.digitalocean.com/community/articles/how-to-add-swap-on-ubuntu-12-04).

