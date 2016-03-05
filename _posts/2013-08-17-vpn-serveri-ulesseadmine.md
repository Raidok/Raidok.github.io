---
layout: post
title: VPN-serveri ülesseadmine
categories: postitused
tags: linux vpn ubuntu debian
image: openvpn.png
updated: 2014-02-28
---

Väike OpenVPNi seadistamise kirjutis, mille ma mingi aeg maha märkinud olen.


## Eeltingimus

OpenVPNi seadistamiseks on vajalik TUN/TAP-liidese olemasolu. Seda saab kontrollida järgnevalt:

    cat /dev/net/tun

Kui tulemus on selline:

    cat: /dev/net/tun: File descriptor in bad state

siis võime jätkata :)


## Paigaldamine

Paigaldame paketi, teeme `easy-rsa` koopia OpenVPN kausta, et alati sama versioon oleks kõikide võtmete genereerimisel:

    sudo apt-get install openvpn
    cd /etc/openvpn/
    sudo mkdir easy-rsa
    sudo cp -r /usr/share/doc/openvpn/examples/easy-rsa/2.0/* easy-rsa/
    sudo chown -R $USER easy-rsa/
    cd easy-rsa/


## Sertifikaadid


### Ettevalmistused

Redigeerime lähteandmete faili vastavalt olukorrale:

    nano vars

Turvalisuse huvides võib muuta võtme `KEY_SIZE` väärtuse 2048 või 4096 peale, mugavuse tõttu võib ka alljärgnevad juba ära muuta:

    export KEY_COUNTRY="ET"
    export KEY_PROVINCE="Harju"
    export KEY_CITY="Tallinn"
    export KEY_ORG="Misiganes"
    export KEY_EMAIL="a@b.c"

Vajalik on ka väike baaskonfiguratsiooni symlink:

    sudo ln -s openssl-1.0.0.cnf openssl.cnf


### Sertifikaatide genereerimine

Loeme muutujad keskkonda sisse:

    source vars

Kustutame olemasolevad võtmed (kui on):

    ./clean-all

Genereerime CA-sertifikaadi, küsib selle käigus mõned küsimused, millest oluline on tegelikult ainult **commonName**, sest see peaks olema unikaalne:

    ./build-ca

Genereerime Diffie-Hellmanni parameetrid. Kui `KEY_SIZE` suuremaks sai muudetud, võib see võtta aega mitmeid-mitmeid minuteid (4096 puhul ka üle 20 minuti):

    ./build-dh

Genereerime serveri võtme, küsib taaskord palju küsimusi, millest olulisim on **commonName**, paneme selleks näiteks "server":

    ./build-key-server server

Liigume võtmete kausta ja loome nö "jagatud salatuse" ka:

    cd keys
    openvpn --genkey --secret ta.key

Kopeerime openvpn serveri jaoks vajalikud failid õigesse kohta ära:

    sudo cp server.crt server.key ca.crt dh4096.pem ta.key /etc/openvpn/

Genereerime paar kliendivõtit ka:

    cd ..
    ./build-key raal
    ./build-key buuk

Pakime vajalikud failid kokku ühte `tar` arhiivi ja liigutame selle oma kodukataloogi:

    cd keys/
    NAME=raal; tar -cvzf $NAME.tar.gz ca.crt ta.key $NAME.crt $NAME.key
    NAME=buuk; tar -cvzf $NAME.tar.gz ca.crt ta.key $NAME.crt $NAME.key
    mv *.tar.gz ~


## Serveri seadistus

Kopeerime näidisfaili:

    sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
    sudo gzip -d /etc/openvpn/server.conf.gz

Teeme sobivad muudatused:

    port 1194
    proto udp
    dev tun
    ca ca.crt
    cert server.crt
    key server.key
    dh dh1024.pem
	  server 10.8.0.0 255.255.255.0
    ifconfig-pool-persist ipp.txt
    push "redirect-gateway def1"
    keepalive 10 120
    comp-lzo
	  user nobody
    group nogroup
    persist-key
    persist-tun
    status openvpn-status.log
    verb 3


### NAT-i lubamine

Et iga klient IP-aadressi saaks ning ka virtuaalsest võrgust välja pääseks, tuleb teha nii:

    echo "1" > /proc/sys/net/ipv4/ip_forward
    iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE

Ja siis teenuse taaskäivitus:

    sudo service openvpn restart


## Kliendi seadistus

Teeme kliendi konfiguratsioonifaili ka siis lõpuks:

    cd ~/raal
    nano client.conf

Paneme sinna midagi sellist:

    client
    dev tun
    proto udp
    remote [serveri-aadress] 1194
    resolv-retry infinite
    nobind
    persist-key
    persist-tun
    ca ca.crt
    cert raal.crt
    key raal.key
    comp-lzo
    verb 3

## Serverisse ühendumine

Nüüd tuleks konfifailid loomulikult mööda krüptitud kanalit ümber kopeerida:

    scp -r kasutaja@[serveri-aadress]:~/raal .

Ja kui klientmasinas on OpenVPN installitud, saab ühendust katsetada nii:

    sudo openvpn --config raal/client.conf

