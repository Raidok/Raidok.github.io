---
layout: post
title: Pi
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---


* nginx
* mosquitto
* openvpn
* letsencrypt
* own/nextcloud
* owntracks





# nginx

### add jessie-backports to sources.list
echo "deb http://ftp.debian.org/debian jessie-backports main" | sudo tee -a /etc/apt/sources.list.d/jessie-backports.list

### optionally add sources, as well ... it's GNU after all :)
echo "deb-src http://ftp.debian.org/debian jessie-backports main" | sudo tee -a /etc/apt/sources.list.d/jessie-backports.list

## keys
gpg --keyserver pgpkeys.mit.edu --recv-key 8B48AD6246925553
gpg -a --export 8B48AD6246925553 | sudo apt-key add -
gpg --keyserver pgpkeys.mit.edu --recv-key 7638D0442B90D010
gpg -a --export 7638D0442B90D010 | sudo apt-key add -

### refresh
sudo apt-get update

### install it from backports
sudo apt-get -t jessie-backports install nginx





# letsencrypt

sudo apt-get install git
git@github.com:lukas2511/letsencrypt.sh.git


cd /opt
sudo git clone https://github.com/lukas2511/letsencrypt.sh
sudo mkdir -p /etc/letsencrypt.sh
sudo mkdir -p /var/www/letsencrypt.sh/
sudo chown www-data:www-data /var/www/letsencrypt.sh
sudo cp letsencrypt.sh/docs/examples/config /etc/letsencrypt.sh/
sudo cp letsencrypt.sh/docs/examples/domains.txt /etc/letsencrypt.sh/
sudo cp letsencrypt.sh/docs/examples/hook.sh /etc/letsencrypt.sh/
sudo chmod +x /etc/letsencrypt.sh/hook.sh

server {
  listen 80;
  listen [::]:80 ipv6only=on;
  server_name *.NIMI.eu NIMI.eu;
  location /.well-known/acme-challenge {
    alias /var/www/letsencrypt.sh;
  }
}


crontab -e
30 2 * * 3 /opt/letsencrypt.sh/letsencrypt.sh -c







# openvpn

apt-get install openvpn

gunzip -c /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz | sudo tee /etc/openvpn/server.conf

sudo vi /etc/openvpn/443.conf

systemctl start openvpn@443.service



sudo iptables -I FORWARD -i tun0 -o eth0 -s 10.8.0.0/24 -d 192.168.0.0/24 -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -I FORWARD -i tun0 -o eth0 -s 10.8.0.0/24 -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -t nat -I POSTROUTING -o eth0 -s 10.8.0.0/24 -j MASQUERADE

sudo iptables -I FORWARD -i tun1 -o eth0 -s 10.9.0.0/24 -d 192.168.0.0/24 -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -I FORWARD -i tun1 -o eth0 -s 10.9.0.0/24 -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -t nat -I POSTROUTING -o eth0 -s 10.9.0.0/24 -j MASQUERADE

allikad:
https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-14-04
https://community.openvpn.net/openvpn/wiki/BridgingAndRouting
https://discourse.osmc.tv/t/saving-iptables-firewall-rules-permanently/7286/7






## rate limiting

iptables -I INPUT -p tcp --dport 22 -i eth0 -m state --state NEW -m recent --set
iptables -I INPUT -p tcp --dport 22 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP
iptables -I INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
iptables -I INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 10 -j DROP
iptables -I INPUT -p tcp --dport 443 -i eth0 -m state --state NEW -m recent --set
iptables -I INPUT -p tcp --dport 443 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 10 -j DROP
iptables -I INPUT -p udp --dport 453 -i eth0 -m state --state NEW -m recent --set
iptables -I INPUT -p udp --dport 453 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 10 -j DROP

lisalugemist:
http://blog.bodhizazen.net/linux/prevent-dos-with-iptables/




# dnsmasq

https://www.raspberrypi.org/forums/viewtopic.php?t=46154
http://yiqingsim.net/post/103165692292/setting-up-dnsmasq-as-a-dnsdhcp-server-on-a





# mosquitto

http://jpmens.net/2013/09/01/installing-mosquitto-on-a-raspberry-pi/



# read-only

http://petr.io/2015/11/09/read-only-raspberry-pi-with-jessie/
