---
layout: post
title: Reverse-proxy kasutamine teistpidi kui tavaliselt
categories: postitused
tags: linux
image: nginx.png
---
Üritasin lahendada probleemi, kus veebirakendused erinevatest serveritest teevad rakendusesiseselt päringuid teistele veebilehtedele ja teenustele üle SSL/TLS ühenduse, omades igaüks oma komplekti sertifikaatidest, tehes nende uuendamise küllaltki tüütuks. Minu pakutud lahendus viib (de-)krüpteerimise vastutuse ja koormuse muudest rakendustest eraldiseisvaks.

Seda annab lahendada ka näiteks [Apache veebiserveriga](http://www.giuseppeurso.eu/en/redirect-from-http-to-https-and-viceversa-with-apache-proxypass/), kuid Nginx on põnevam ja sellega ma seda katsetasingi.

Tüüpiline veebirakenduste taristu sisaldab endas *reverse-proxy*t, mis võtab HTTPS-päringute ja vastuste (de)krüpteerimise koormuse enda peale ja suunates õiged päringud õigetele sisevõrgus asuvatele *backend*-serveritele juba üle lihtsa HTTP-protokolli.

Ka antud lahendus kasutab sama ideed, kuid tagurpidi. Ehk siis sisevõrgus on server, mis pääseb ühendusi looma välisvõrgus olevate serveritega, kuid mitte vastupidi. Sisevõrgu serverid teevad HTTP-päringuid antud serveri pihta, mis omakorda teeb HTTPS päringuid välisvõrku.


# Värskeima Nginx paigaldamine

    apt-get update
    apt-get install python-software-properties
    add-apt-repository ppa:nginx/stable


# CA-sertifikaadi paigaldamine

    Hetkel viimases stabiilses versioonis (nginx/1.6.2) see osa küll oluline pole, sest tundub, et ta ei kontrolli sertifikaadi õigsust, kuid tuleviku mõttes panin ta siia kirja. Versioonis 1.7.0 on olemas nt selline parameeter nagu `proxy_ssl_verify`.

    cd /etc/ssl/certs
    echo | openssl s_client -connect eteenindus.mnt.ee:443 2>/dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > eteenindus_mnt_ee.pem
    echo | openssl s_client -connect eteenindus.mnt.ee:443 2>/dev/null | openssl x509 > eteenindus_mnt_ee.pem

    openssl x509 -noout -hash -in eteenindus_mnt_ee.pem
    ln -s eteenindus_mnt_ee.pem 9e802636.0


# Proxy konfigureerimine

    cd /etc/nginx/

    vi sites-available/proxy

    server {
        listen 80 default deferred;
        listen [::]:80 ipv6only=on deferred;

        location /juhiluba/ {
            proxy_set_header Host $host;
            proxy_pass https://eteenindus.mnt.ee/paringud/juhiloaKehtivus;
        }
        location /idkaart/ {
            proxy_set_header Host $host;
            proxy_pass https://www.politsei.ee/et/teenused/e-paringud/dokumendi-kehtivuse-kontroll/;
        }
    }

    cd sites-enabled
    ln -s ../sites-available/proxy .

    service nginx reload

Nüüd võib proovida http://localhost/juhiluba/ või http://localhost/idkaart/


Allikad:

* [proxy_pass with ssl upstream in nginx](http://stackoverflow.com/questions/22238730/proxy-pass-with-ssl-upstream-in-nginx)
* [Using openssl to get the certificate from a server](http://stackoverflow.com/questions/7885785/using-openssl-to-get-the-certificate-from-a-server)
