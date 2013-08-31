---
layout: post
title: VPN-serveri ülesseadmine
categories: mustandid
tags: linux vpn vps kvm openvpn ubuntu
---



## Eeltingimus

    cat /dev/net/tun

Kui tulemus on selline:

    cat: /dev/net/tun: File descriptor in bad state

siis võime jätkata :)

## Paigaldamine

    sudo apt-get install openvpn

    cd /etc/openvpn/
    mkdir easy-rsa
    sudo cp -r /usr/share/doc/openvpn/examples/easy-rsa/2.0/* easy-rsa/
    sudo chown -R $USER easy-rsa/
    cd easy-rsa/

## Sertifikaadid

### Ettevalmistused

    nano vars
    
    export KEY_COUNTRY="ET"
    export KEY_PROVINCE="Harju"
    export KEY_CITY="Tallinn"
    export KEY_ORG="Misiganes"
    export KEY_EMAIL="raido@kukkel"
    
    - export KEY_EMAIL=raido@kukkel
    - export KEY_CN=changeme
    - export KEY_NAME=changeme
    - export KEY_OU=changeme

    sudo ln -s openssl-1.0.0.cnf openssl.cnf

### CA ja serveri sertifikaadid

    source vars
    ./clean-all
    ./build-dh
    ./pkitool --initca
    ./pkitool --server server
    cd keys
    openvpn --genkey --secret ta.key
    sudo cp server.crt server.key ca.crt dh1024.pem ta.key /etc/openvpn/

### Kliendi sertifikaadid

    cd /etc/openvpn/easy-rsa/
    source vars
    ./pkitool raal

Kopeerime kliendile vajalikud asjad ühte kohta

    cd ~
    mkdir raal
    cd raal/
    cp /etc/openvpn/ca.crt .
    cp /etc/openvpn/easy-rsa/keys/raal.crt .
    cp /etc/openvpn/easy-rsa/keys/raal.key .
    cp /etc/openvpn/ta.key .
    
## Serveri seadistus

    sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
    sudo gzip -d /etc/openvpn/server.conf.gz
    
    
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
    
    echo "1" > /proc/sys/net/ipv4/ip_forward
    iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
    
    sudo service openvpn restart
    
## Kliendi seadistus

    cd ~/raal
    nano client.conf

    client
    dev tun
    proto udp
    remote [server] 1194
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

    Kopeerime failid
    
    scp -r root@[server]:~/raal .
    sudo openvpn --config raal/client.conf
    
    
