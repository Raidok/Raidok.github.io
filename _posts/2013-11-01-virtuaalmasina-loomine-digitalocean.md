---
layout: post
title: Virtuaalmasina loomine DigitalOceaniga
categories: postitused
tags: linux ubuntu vps digitalocean docker
image: digitalocean.png
---
[DigitalOcean](https://www.digitalocean.com) pakub suhteliselt soodsat virtuaalserveriteenust. Siinkohal tutvustaks, kui lihtne on luua midagi, mida nemad ise _dropletiks_ kutsuvad. Hinnad algavad 5 dollarist kuus ja server on kasutusvalmis ligikaudu minutiga. Proovitud, kinnitan ja kiidan.

Teenuse kasutamiseks tuleb kõigepealt PayPali kaudu või otse krediitkaardilt 5 dollarit välja käia. Raha hakkab maha tiksuma, kui esimene _droplet_(virtuaalserver) loodud on ning katkeb, kui virtuaalmasin kustutatud on.

DigitalOcean pakub kahte andmete varundamise varianti: _backupid_ ja _snapshotid_.
* _Backuppide_ tegemine käib automaatselt, kui see on sisse lülitatud (maksab 1$ kuus lisaks). Kasutajal pole vaja muretseda andmete pärast.
* _Snapshottide_ tegemine käib käsitsi ja selleks peab server välja lülitatud olema. Snapshotte on mugav kasutada kui on vaja ühest serverist mitu koopiat teha näiteks koormuse jagamiseks või, kui pikemal perioodil pole serverit mõttekas töös hoida, saab sellest _snapshoti_ teha ja _dropleti_ enda ära kustutada, hiljem selle taas uuesti samast seisust püsti panna.


##Pildituur

DigitalOceani kasutajaliidest on väga lihtne ja mugav kasutada, paraku on ta mõnikord pisut uimane. Sellele vaatamata saab virtuaalserveri minutiga püsti.

[![Dropleti loomine](p-docker-droplet-loomine.png)](docker-droplet-loomine.png)

Alustuseks saab loodavala _dropletile_ nime panna. Edasi liikudes tuleb hulk valikuvariante.

Kõigepealt ressursside valik. Odavaim pakett sisaldab ühte protsessorituua, 512MB RAM, 20GB SSD ketast ja 1TB andmeedastusmahtu. Seda saab ka hiljem jooksvalt muuta kuigi serveri peab selleks ajaks seiskama.

Edasi liikudes saab valida regiooni ning _image_, mille põhjal virtuaalserver luuakse. Valikus on terve hulk tooreid linuxi distributsioone, kui ka valmis komplekte Wordpressi või [Dockeri ülesseadmiseks](/postitused/linuxi-konteinerid-ja-docker). Samuti saab VPS-i luua varasemate _snapshottide_ või _backuppide_ põhjal.

Kui valikud tehtud, polegi muud kui vajutada suurt rohelist nuppu ja ette tuleb progressiriba:

[![Dropleti loomise progress](p-docker-droplet-progress.png)](docker-droplet-progress.png)

Lõpetades kuvatakse _dropleti_ adminpaneel.

[![Dropleti administreerimispaneel](p-docker-droplet-paneel.png)](docker-droplet-paneel.png)

Edasised juhised peaksid nüüd juba meili peale tulnud olema. Ega siin midagi keerulist polnudki.
