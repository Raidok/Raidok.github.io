---
layout: post
title: Linuxi konteinerid ja Docker
categories: postitused
tags: linux ubuntu vps digitalocean docker
image: docker.png
---
Elu tundus imelihtne ja -ilus hetkest, kui [DigitalOcean](/postitused/virtuaalmasina-loomine-digitalocean)i avastasin. Hiljem tuli välja, et andis veelgi paremaks minna. [Docker](http://www.docker.io) utiliseerib kõike seda, mida on pakkuda Linuxi konteineritel, kuid lihtsustab nende kasutamist oluliselt.

Linuxi konteinerite idee on sarnane virtuaalmasinate omale - jooksutada tarkvara isoleeritult. Linuxi konteinerid on aga virtuaalmasinatest etemad selle poolest, et nad ei lisa juurde vahekihte. Selle all mõetlen seda, kuidas külalisoperatsioonisüsteemide jaoks riistvara emuleeritakse, millega loomulikult kaasnevad kaod jõudluses. Linuxi konteinerid jagavad _kernelit_ end majutava operatsioonisüsteemiga ja suhtlevad otse füüsilise riistvaraga.

Siit ka mõningad piirangud. Üheks on just nimelt kindel _kernel_. Hetkel (Docker 0.6.x) on kõige paremini toetatud versioon 3.8 ja operatsioonisüsteemina ainult 64-bitised Debian ja Ubuntu. Dockeri versiooniga 0.7 distro piirang kuuldatavasti langeb ära.


##Keskkonna ülesseadmine

Nagu mainisin, on Dockeri jooksutamiseks vajalik Debiani või Ubuntu 64-bitine distributsioon. Lihtsaim variant on näiteks [teha DigitalOceanis spetsiaalselt eelkonfigureeritud virtuaalserver](/postitused/virtuaalmasina-loomine-digitalocean). Teine variant on kohalikku masinasse vajalikud paketid ise installida. Selle kohta on Dockeri kodulehel [õpetus, kuidas Dockerit paigaldada](http://www.docker.io/gettingstarted/#h_installation) erinevatesse keskkondadesse.


##Konteineri loomine

Selle jaoks on variante mitmeid:
* otse mõne distributsiooni _baasimage_ käivitamine ja image loomine (vt "Interaktiivne konteiner")
* [buildimine Dockerfile põhjal](http://docs.docker.io/en/latest/use/builder) (nii kohalik fail kui ka näiteks GitHubi repositooriumist)
* [Dockeri repositooriumist _imageid_ tõmmates](http://docs.docker.io/en/latest/use/workingwithrepository/)


##Interaktiivne konteiner

    docker run -i -t ubuntu bash

Mis see lihtne rida teeb, on see, et ta käivitab Ubuntu _baasimage_, eraldab pseudoterminali(-t, _tty_), jätab standardsisendi lahti(-i, _interactive_) ja avab bashi _shelli_ - seda kõik selleks, et luua konsooliühendus loodava konteineriga.

Avanenud konsool on väga minimaalne versioon Ubuntust, kuhu tuleb iga tarkvaratükike vastavalt vajadusel ise paigaldada näiteks `apt-get` abil.

Konsoolisessiooni lõpetamiseks sobib klahvikombinatsioon CTRL+D. Meeles tasub aga pidada seda, et see kaotab kõik tehtud muudatused avatud konteineris.

Selleks, et muudatused säiliksid, tuleb avada uus konsool ja leida äsja loodud konteineri ID:

    docker ps

Kui ID on leitud, siis tuleb muudatus committida (üsna sarnane nagu `git` puhulgi):

    docker commit <ID> <nimi>

Sellega antakse konteinerile nimi, mida on näha järgmise käsuga:

    docker images


##Portide suunamine

Selleks, et konteiner kuidagi pikemas perspektiivis kasulik saaks olla, peaks ta oskama välismaailmaga suhelda. Näiteid:

* Kui konteinerisse on jooksma pandud OpenSSH server, võib `docker run` käsule juurde lisada parameetrid `-p 2222:22`, et välismaailmast läbi majutava süsteemi pordi 2222 konteineri pordile 22 ligi saaks.

* Kui konteineris töötab mingisugune veebiserver, saab selle avalikuks teha parameetritega `-p 80:80`.

* Kui töötab mõni UDP-protokollil töötav server, saab porte suunata näiteks parameetritega `-p 555:555/udp`.


##Docker ja tulemüür (UFW)

Kuna Dockeri konteineritele jagatakse privaatseid IP-sid, siis selleks, et nad saaksid välisvõrgule ligi ja ka vastupidi, peab tulemüüris olema portide suunamine lubatud. Näitena [UFW seadistamine](https://help.ubuntu.com/community/UFW):

Failis `/etc/default/ufw` peab olema aktiveeritud järgmine rida:

    DEFAULT_FORWARD_POLICY="ACCEPT"

Ning seejärel tuleb tulemüür taaskäivitada:

    ufw reload