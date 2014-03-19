---
layout: post
title: Fail2ban ja Nginx
categories: postitused
tags: linux ubuntu
image: linux.png
---
Internet on algusest peale üles ehitatud usaldusele, kuid kahjuks leidub palju inimesi, kes seda ära kasutavad. Internetile avatud serveri veebi- ja SSH-serveri logides on üsna tavaline leida kummalisi ja lühikese aja jooksul korduvaid (ebaõnnestunud) päringuid. Seda isegi siis, kui server on ligipääsetav vaid IP-aadressi järgi ja keegi teine seda ei tohiks teada.

Kui SSH-server on tavapordilt mujale ümber seadistamata, siis on logifailides enamus read ebaõnnestunud sisselogimiskatsed tundmatutelt IP-aadressidelt.

Veebiserveri logidest võib näiteks leida selliseid päringuid:

    GET /admin.php HTTP/1.0
    GET /wp-login.php HTTP/1.0
    GET /w00tw00t.at.ISC.SANS.DFind:) HTTP/1.1
    GET http://smalldog.files.wordpress.com\x5CxC2:\x5CxC2/2012/07/img_7002.jpg HTTP/1.1

Need ilmselgelt ei ole heatahtlikud päringud, eriti kui ma kasutan nginx-serverit ainult _reverse proxy_-na. Õnneks tuleb siin appi Fail2ban.

[Fail2ban](http://www.fail2ban.org/) on rakendus, mis töötab taustal ja loeb ettemääratud logifaile, ning otsib etteantud mustrite(regulaaravaldiste) abil pahatahtlikke päringuid, ning blokeerib kahtased IP-d teatud ajaks automaatselt.

#Paigaldamine

Enamus distrotes on fail2ban vaikimis paketihalduri kaudu saadaval, nii ka Ubuntus:

    sudo apt-get install fail2ban

Põhiline kofiguratsioonifail asub `/etc/fail2ban/jail.conf`, kuid kõikide fail2ban .conf-failide puhul loetakse ka .local-faile, sest conf-failid võivad uuendustega muutuda, kuid local-failid püsivad.

Teeme koopia:

    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

Ja avame selle, et mõningad vaikimisi väärtused üle vaadata.

    sudo nano /etc/fail2ban/jail.local

Minna näiteks soovitan `bantime` ja `findtime` seada vähemalt 86400 ehk 24h peale.


#Nginx konfiguratioon

Loo fail `/etc/fail2ban/filter.d/nginx-proxy.conf`:

    # Proxy filter:
    #
    # Block IPs trying to use server as proxy.
    #
    # Matches e.g.
    # 192.168.1.1 - - "GET http://www.something.com/
    #
    [Definition]
    failregex = ^<HOST> -.*GET http.*
    ignoreregex =

Loo fail `/etc/fail2ban/filter.d/nginx-noscript.conf`:

    # Noscript filter:
    #
    # Block IPs trying to execute scripts such as .php, .pl, .exe and other funny scripts.
    #
    # Matches e.g.
    # 192.168.1.1 - - "GET /something.php
    #
    [Definition]
    failregex = ^<HOST> -.*GET.*(\.php|\.asp|\.exe|\.pl|\.cgi|\scgi)
    ignoreregex =

Loo fail `/etc/fail2ban/filter.d/nginx-auth.conf`:

    # Auth filter:
    #
    # Blocks IPs that fail to authenticate using basic authentication
    #
    [Definition]
     
    failregex = no user/password was provided for basic authentication.*client: <HOST>
                user .* was not found in.*client: <HOST>
                user .* password mismatch.*client: <HOST>

    ignoreregex =

Loo fail `/etc/fail2ban/filter.d/nginx-login.conf`:

    # Login filter:
    #
    # Blocks IPs that fail to authenticate using web application's log in page
    #
    # Scan access log for HTTP 200 + POST /sessions => failed log in
    [Definition]
    failregex = ^<HOST> -.*POST /sessions HTTP/1\.." 200
    ignoreregex =

Loo fail `/etc/fail2ban/filter.d/nginx-badbots.conf`:

    # DoS filter:
    #
    # Scans for DoS attack patterns
    #
    [Definition]
    failregex = ^<HOST> -.*"(GET|POST).*HTTP.*"$
    ignoreregex =

Lisa faili `/etc/fail2ban/jail.conf` lõppu:

    [nginx-auth]
    enabled = true
    filter = nginx-auth
    action = iptables-multiport[name=NoAuthFailures, port="http,https"]
    logpath = /var/log/nginx*/*error*.log
    bantime = 600 # 10 minutes
    maxretry = 6

    [nginx-login]
    enabled = true
    filter = nginx-login
    action = iptables-multiport[name=NoLoginFailures, port="http,https"]
    logpath = /var/log/nginx*/*access*.log
    bantime = 600 # 10 minutes
    maxretry = 6
     
    [nginx-badbots]
    enabled  = true
    filter = nginx-badbots
    action = iptables-multiport[name=BadBots, port="http,https"]
    logpath = /var/log/nginx*/*access*.log
    findtime = 60
    bantime = 172800 # 2 days
    maxretry = 240
     
    [nginx-noscript]
    enabled = true
    action = iptables-multiport[name=NoScript, port="http,https"]
    filter = nginx-noscript
    logpath = /var/log/nginx*/*access*.log
    maxretry = 6
    bantime  = 86400 # 1 day
     
    [nginx-proxy]
    enabled = true
    action = iptables-multiport[name=NoProxy, port="http,https"]
    filter = nginx-proxy
    logpath = /var/log/nginx*/*access*.log
    maxretry = 0
    bantime  = 86400 # 1 day

Kui kasutada nginx-i staatiliste failide serveerimiseks, võib tavakasutaja kergesti DoS-filtrisse kinni jääda. Selleks tuleks neil juhtudel rakendada `access_log off;` lipukest:

    location ~* \.(png|jpe?g|gif|ico)$ {
        expires 1y;
        access_log off;
        try_files $uri $uri/ @rewrite;
        gzip off;
    }
    location ~* \.(mp3)$ {
        expires 1y;
        access_log off;
        gzip off;
    }
    location ~* \.(css)$ {
        expires 1d;
        access_log off;
    }
    location ~* \.(js)$ {
        expires 1h;
        access_log off;
    }

Muudatuste rakendumiseks teeme restardi:

    sudo service fail2ban restart

Kehtivate bännide vaatamiseks sobib järgnev käsk:

    sudo iptables -L

See peaks mõnevõrra une rahulikumaks muutma. Loodan, et oli abiks.

Allikad:

* [How To Protect SSH with fail2ban on Ubuntu 12.04](https://www.digitalocean.com/community/articles/how-to-protect-ssh-with-fail2ban-on-ubuntu-12-04)
* [How to Secure an nginx Server with Fail2Ban](http://serverfault.com/questions/420895/how-to-use-fail2ban-for-nginx)
* [How To use fail2ban for Nginx?](http://snippets.aktagon.com/snippets/554-how-to-secure-an-nginx-server-with-fail2ban)
