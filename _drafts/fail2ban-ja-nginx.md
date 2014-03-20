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

    GET http://smalldog.files.wordpress.com\x5CxC2:\x5CxC2/2012/07/img_7002.jpg HTTP/1.1
    GET /admin.php HTTP/1.0
    GET /wp-login.php HTTP/1.0
    GET /w00tw00t.at.ISC.SANS.DFind:) HTTP/1.1

Need ilmselgelt ei ole heatahtlikud päringud, eriti kui ma kasutan nginx-serverit ainult _reverse proxy_-na. Õnneks tuleb siin appi Fail2ban.

[Fail2ban](http://www.fail2ban.org/) on rakendus, mis töötab taustal ja loeb ettemääratud logifaile, ning otsib etteantud mustrite(regulaaravaldiste) abil pahatahtlikke päringuid, ning blokeerib kahtased IP-d teatud ajaks automaatselt.

Lühikokkuvõte:

* toc
{:toc}

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

##Blokeeri kõik, kes üritavad veebiserverit proksina kasutada

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

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-proxy]
    enabled = true
    action = iptables-multiport[name=NoProxy, port="http,https"]
    filter = nginx-proxy
    logpath = /var/log/nginx*/*access*.log
    findtime = 600
    bantime = 604800
    maxretry = 0


##Blokeeri kõik, kes üritavad skripte(.php, .asp, .exe, .pl, .cgi, .scgi) käivitada

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

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-noscript]
    enabled = true
    action = iptables-multiport[name=NoScript, port="http,https"]
    filter = nginx-noscript
    logpath = /var/log/nginx*/*access*.log
    findtime = 600
    bantime = 604800
    maxretry = 0


##Blokeeri kõik, kes korduvalt HTTP Basic autentimisel põruvad

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

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-auth]
    enabled = true
    filter = nginx-auth
    action = iptables-multiport[name=NoAuthFailures, port="http,https"]
    logpath = /var/log/nginx*/*error*.log
    findtime = 600
    bantime = 86400
    maxretry = 3


##Blokeeri kõik, kes korduvalt aplikatsiooni autentimisel põruvad

Loo fail `/etc/fail2ban/filter.d/nginx-login.conf`:

    # Login filter:
    #
    # Blocks IPs that fail to authenticate using web application's log in page
    #
    # Scan access log for HTTP 200 + POST /sessions => failed log in
    [Definition]
    failregex = ^<HOST> -.*POST /sessions HTTP/1\.." 200
    ignoreregex =

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-login]
    enabled = true
    filter = nginx-login
    action = iptables-multiport[name=NoLoginFailures, port="http,https"]
    logpath = /var/log/nginx*/*access*.log
    findtime = 600
    bantime = 86400
    maxretry = 3

##Blokeeri kõik, kes teevad liiga palju päringuid serverile (pahad botid)

Loo fail `/etc/fail2ban/filter.d/nginx-badbots.conf`:

    # DoS filter:
    #
    # Scans for DoS attack patterns
    #
    [Definition]
    failregex = ^<HOST> -.*"(GET|POST).*HTTP.*"$
    ignoreregex =

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-badbots]
    enabled  = true
    filter = nginx-badbots
    action = iptables-multiport[name=BadBots, port="http,https"]
    logpath = /var/log/nginx*/*access*.log
    maxretry = 240
    findtime = 600
    bantime = 604800


##Blokeeri kõik DFind skännijad

Loo fail `/etc/fail2ban/filter.d/nginx-w00tw00t.conf`:

    # Based on http://howflow.com/tricks/block_w00tw00t_scan_hosts_with_fail2ban
    # Real life example:
    # 60.120.180.240 - - [18/Mar/2014:05:28:37 +0200] "GET /w00tw00t.at.ISC.SANS.DFind:) HTTP/1.1" 400 172 "-" "-"
    #
    [Definition]
    failregex = ^<HOST> -.*GET .*w00tw00t\.at\.ISC\.SANS\.DFind.*
    ignoreregex =

Lisa faili `/etc/fail2ban/jail.local`:

    [nginx-w00tw00t]
    enabled = true
    filter = nginx-w00tw00t
    action = iptables-allports
    logpath = /var/log/nginx*/*access*.log
    findtime = 600
    bantime = 604800
    maxretry = 0

##Blokeeri korduvad ründajad jäädavalt

Fail2ban-il on võimalus seada `bantime` väärtuseks negatiivne väärtus, mis blokeerib IP-aadressi jäädavalt, kuid see kaob, kui fail2ban-ile või serverile restart teha. Selle parandamiseks leidsin abi.

Loo fail `/etc/fail2ban/filter.d/repeatoffender.conf`:

    #Fail2Ban configuration file
    #
    # Author: TSCADFX
    #
    # This filter monitors the fail2ban log file, and permanently
    # bans the ip addresses of persistent attackers.
    #
    # As of this version this ban only works with iptables.
    #

    [Definition]
    _jailname = repeatoffender
    failregex = fail2ban.actions:\s+WARNING\s+\[(?:.*)\]\s+Ban\s+<HOST>
    ignoreregex = fail2ban.actions:\s+WARNING\s+\[%(_jailname)s\]\s+Ban\s+<HOST>

Loo fail `/etc/fail2ban/action.d/repeatoffender.conf`:

    # Fail2Ban configuration file
    #
    # Author: TSCADFX
    #

    [INCLUDES]

    before = iptables-blocktype.conf


    [Definition]

    # Option:  actionstart
    # Notes.:  command executed once at the start of Fail2Ban.
    # Values:  CMD
    #
    actionstart = iptables -N fail2ban-<name>
                  iptables -A fail2ban-<name> -j RETURN
                  iptables -I <chain> -p <protocol> -j fail2ban-<name>
                  # Establish chain and blocks for saved IPs
                  iptables -N fail2ban-ip-blocklist
                  iptables -A fail2ban-ip-blocklist -j RETURN
                  iptables -I <chain> -p <protocol> -j fail2ban-ip-blocklist
                  cat /etc/fail2ban/ip.blocklist.<name> |grep -v ^\s*#|awk '{print $1}' | while read IP; do iptables -I fail2ban-ip-blocklist 1 -s $IP -j REJECT --reject-with icmp-port-unreachable; done

    # Option:  actionstop
    # Notes.:  command executed once at the end of Fail2Ban
    # Values:  CMD
    #
    actionstop = iptables -D <chain> -p <protocol> -j fail2ban-<name>
                 iptables -F fail2ban-<name>
                 iptables -X fail2ban-<name>
                 # Remove chain and blocks for saved IPs to prevent duplicates on service restart
                 iptables -D <chain> -p <protocol> -j fail2ban-ip-blocklist
                 iptables -F fail2ban-ip-blocklist
                 iptables -X fail2ban-ip-blocklist

    # Option:  actioncheck
    # Notes.:  command executed once before each actionban command
    # Values:  CMD
    #
    actioncheck = iptables -n -L <chain> | grep -q 'fail2ban-<name>[ \t]'

    # Option:  actionban
    # Notes.:  command executed when banning an IP. Take care that the
    #          command is executed with Fail2Ban user rights.
    # Tags:    See jail.conf(5) man page
    # Values:  CMD
    #
    actionban = VERIFY="<ip>*"
                ADD="<ip>        # fail2ban/$( date '+%%Y-%%m-%%d %%T' ): Perma-Banned"
                FILE=/etc/fail2ban/ip.blocklist.<name>
                grep -q "$VERIFY" "$FILE" || iptables -I fail2ban-<name>  1 -s <ip> -j <blocktype>
                grep -q "$VERIFY" "$FILE" || echo "$ADD" >> "$FILE"

    # Option:  actionunban
    # Notes.:  command executed when unbanning an IP. Take care that the
    #          command is executed with Fail2Ban user rights.
    # Tags:    See jail.conf(5) man page
    # Values:  CMD
    #
    actionunban = # Do nothing becasuse their IP is in the blocklist file

    # To manually unban from the ip blocklist file run this command:
    # Be warned that if the ip is in log rotated files it must be whitelisted
    #
    # sed -i '/^<ip>/d' /etc/fail2ban/ip.blocklist.repeatoffender
    #

    [Init]

    # Default name of the chain
    #
    name = default

    # Option:  protocol
    # Notes.:  internally used by config reader for interpolations.
    # Values:  [ tcp | udp | icmp | all ] Default: tcp
    #
    protocol = tcp

    # Option:  chain
    # Notes    specifies the iptables chain to which the fail2ban rules should be
    #          added
    # Values:  STRING  Default: INPUT
    chain = INPUT

Lisa faili `/etc/fail2ban/jail.local`:

    [repeatoffender]
    enabled  = true
    filter   = repeatoffender
    action   = repeatoffender[name=repeatoffender]
    logpath  = /var/log/fail2ban.log
    maxretry = 2
    findtime = 31536000
    bantime  = -1




#Staatilised failid

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


#Kasulikud käsklused

* Logifaili uurimiseks: `less /var/log/fail2ban.log`
* Filtri kontrollimiseks konkreetse logifaili peal: `fail2ban-regex /var/log/fail2ban.log /etc/fail2ban/filter.d/repeatoffender.conf`


#Allikad:

* [How To Protect SSH with fail2ban on Ubuntu 12.04](https://www.digitalocean.com/community/articles/how-to-protect-ssh-with-fail2ban-on-ubuntu-12-04)
* [How to Secure an nginx Server with Fail2Ban](http://serverfault.com/questions/420895/how-to-use-fail2ban-for-nginx)
* [How To use fail2ban for Nginx?](http://snippets.aktagon.com/snippets/554-how-to-secure-an-nginx-server-with-fail2ban)
* [Configuring Fail2Ban on Debian Squeeze](http://kevin.deldycke.com/2011/06/configuring-fail2ban-debian-squeeze/)
* [Permanently ban repeat offenders with Fail2Ban](http://tscadfx.com/permanently-ban-repeat-offenders-with-fail2ban/)
