---
layout: post
title: OpenVPN server Docker konteinerihalduriga
categories: postitused
tags: linux ubuntu vps vpn docker
image: docker.png
---
Mõnda aega tagasi kirjutasin, [kuidas OpenVPN serverit üles seada](/postitused/vpn-serveri-ulesseadmine/). See on päris tülikas protsess, olgugi, et seda tihti teha vaja pole. Dockeri abiga on selle ülesande (küll lihtsustatud, kuid siiski) täitmine imelihtne.

Dockerit kasutades on üks Dockeri põhilistest arendajatest([Jérôme Petazzoni](https://github.com/jpetazzo)) loonud näidislahenduse [OpenVPNi seadistamisest Dockeriga](https://github.com/jpetazzo/dockvpn).

Ma forkisin selle projekti, et lisada _fallback_ portide hulka ka veel 53/udp, et vpn ühendust oleks võimalik luua ka võrkudest, mis nõuavad veebipõhist autentimist. Kui keegi kavatseb seda järgi teha, siis omal vastutusel loomulikult. :)

Dokumenteerin siis lühidalt töö käigu.

Loome GitHubi repositooriumi põhjal Dockeri konteineri ja paneme talle ka kohe nimeks "dockvpn", et oleks hiljem teistest kergesti eristatav:

    docker build -t dockvpn github.com/Raidok/dockvpn

Kui port 53 pole oluline, võib _buildimiseks_ kasutada ühte kahest järgnevast variandist:

    docker build -t dockvpn github.com/jpetazzo/dockvpn
    docker pull -t dockvpn jpetazzo/openvpn

Esimene kasutab originaalautori GitHubi ja teine tema Dockeri repositooriumit.

##Port 53/udp

Kui valisite ühe viimasest kahest konteineri loomise variandist, võib selle osa siin vahele jätta ja otse käivitamise juurde asuda.

Selleks, et port 53 kasutatav oleks, peame tegema ühes Linuxi konteinerite konfifailis väikese muudatuse. Nimelt kasutab LXC sisemiselt konteineritele privaatsete IP-aadresside jagamiseks `dnsmasq` tarkvara, mille üheks funktsiooniks DHCP kõrval on DNS-teenuse pakkumine. See aga hõivab mulle vajaliku pordi 53/udp. Selle parandamiseks:

    nano /etc/init/lxc-net.conf

Otsime seal üles rea, kust käivitatakse `dnsmasq` ja lisame sinna kuskile vahele `--port=0` nagu näiteks:

    dnsmasq -u lxc-dnsmasq --strict-order --bind-interfaces --pid-file=${varrun}/dnsmasq.pid --conf-file= --listen-address ${LXC_ADDR} --port=0 --dhcp-range ${LXC_DHCP_RANGE} --dhcp-lease-max=${LXC_DHCP_MAX} --dhcp-no-override --except-interface=lo --interface=${LXC_BRIDGE} --dhcp-leasefile=/var/lib/misc/dnsmasq.${LXC_BRIDGE}.leases --dhcp-authoritative || cleanup

Seejärel taaskäivitame `lxc-net`:

    service lxc-net restart


##Käivitamine

Põhiprotsessi käivitamiseks(osa `-p 53:53/udp` järgnevas käsus on valikuline):

    DOCKVPN_ID=$(docker run -d -privileged -p 1194:1194/udp -p 443:443/tcp -p 53:53/udp raidok/dropvpn)

Ajutiselt paneme ka käima protsessi, mis konfiguratsioonifaili välja annab:

    docker run -t -i -p 8080:8080 -volumes-from $DOCKVPN_ID dockvpn serveconfig

See annab välja aadressi, mille kaudu konfiguratsioonifaili brauseriga kätte saab. Brauser arvatavasti hoiatab ka ebausaldusväärse serveri pärast - pole põhjust karta, sertifikaat on enda allkirjastatud. Kui konfiguratsioonifail on käes, siis CTRL+D, et jagamine lõpetada.
