---
layout: post
title: Nginx konfigureerimisnippe
categories: postitused
tags: linux
image: nginx.png
---
Kogun siia mõned jupid Nginx konfiguratsioonist, mida tihti vaja läheb.

Alustuseks genereerime dhparam.pem faili

    openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048


# HTTPS pealesurumine

Järgnev peaks asuma näiteks `/etc/nginx/sites-available/www` failis:

    server {
      # Listen on both IPv4 and IPv6
      listen 443 ssl default deferred spdy;
      listen [::]:443 ipv6only=on ssl default deferred spdy;
      
      server_name www.kalbre.eu;
     
      ssl_certificate /etc/nginx/ssl/www_kalbre_eu.crt;
      ssl_certificate_key /etc/nginx/ssl/www_kalbre_eu.key;
     
      # enable session resumption to improve https performance
      # http://vincent.bernat.im/en/blog/2011-ssl-session-reuse-rfc5077.html
      ssl_session_cache shared:SSL:50m;
      ssl_session_timeout 5m;
     
      # Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
      ssl_dhparam /etc/nginx/ssl/dhparam.pem;
     
      # enables server-side protection from BEAST attacks
      # http://blog.ivanristic.com/2013/09/is-beast-still-a-threat.html
      ssl_prefer_server_ciphers on;
      # disable SSLv3(enabled by default since nginx 0.8.19) since it's less secure then TLS http://en.wikipedia.org/wiki/Secure_Sockets_Layer#SSL_3.0
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      # ciphers chosen for forward secrecy and compatibility
      # http://blog.ivanristic.com/2013/08/configuring-apache-nginx-and-openssl-for-forward-secrecy.html
      ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:ECDHE-RSA-RC4-SHA:ECDHE-ECDSA-RC4-SHA:RC4-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!3DES:!MD5:!PSK';
     
      # enable ocsp stapling (mechanism by which a site can convey certificate revocation information to visitors in a privacy-preserving, scalable manner)
      # http://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
      resolver 8.8.8.8;
      ssl_stapling on;
      ssl_trusted_certificate /etc/nginx/ssl/www_kalbre_eu.crt;
     
      # config to enable HSTS(HTTP Strict Transport Security) https://developer.mozilla.org/en-US/docs/Security/HTTP_Strict_Transport_Security
      # to avoid ssl stripping https://en.wikipedia.org/wiki/SSL_stripping#SSL_stripping
      add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;";
     
      #... the rest of your configuration
    }
     
    # redirect all http traffic to https
    server {
      # Listen on both IPv4 and IPv6
      listen 80;
      listen [::]:80 ipv6only=on;
      server_name www.kalbre.eu;
      return 301 https://$host$request_uri;
    }


Järgnevaid võiks vastavalt vajadusele, kuid soovitatavalt `/etc/nginx/nginx.conf` faili paigutada:

    #don't send the nginx version number in error pages and Server header
    server_tokens off;
     
    # config to don't allow the browser to render the page inside an frame or iframe
    # and avoid clickjacking http://en.wikipedia.org/wiki/Clickjacking
    # if you need to allow [i]frames, you can use SAMEORIGIN or even set an uri with ALLOW-FROM uri
    # https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options
    add_header X-Frame-Options SAMEORIGIN;
     
    # when serving user-supplied content, include a X-Content-Type-Options: nosniff header along with the Content-Type: header,
    # to disable content-type sniffing on some browsers.
    # https://www.owasp.org/index.php/List_of_useful_HTTP_headers
    # currently suppoorted in IE > 8 http://blogs.msdn.com/b/ie/archive/2008/09/02/ie8-security-part-vi-beta-2-update.aspx
    # http://msdn.microsoft.com/en-us/library/ie/gg622941(v=vs.85).aspx
    # 'soon' on Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=471020
    add_header X-Content-Type-Options nosniff;
     
    # This header enables the Cross-site scripting (XSS) filter built into most recent web browsers.
    # It's usually enabled by default anyway, so the role of this header is to re-enable the filter for 
    # this particular website if it was disabled by the user.
    # https://www.owasp.org/index.php/List_of_useful_HTTP_headers
    add_header X-XSS-Protection "1; mode=block";
     
    # with Content Security Policy (CSP) enabled(and a browser that supports it(http://caniuse.com/#feat=contentsecuritypolicy),
    # you can tell the browser that it can only download content from the domains you explicitly allow
    # http://www.html5rocks.com/en/tutorials/security/content-security-policy/
    # https://www.owasp.org/index.php/Content_Security_Policy
    # I need to change our application code so we can increase security by disabling 'unsafe-inline' 'unsafe-eval'
    # directives for css and js(if you have inline css or js, you will need to keep it too).
    # more: http://www.html5rocks.com/en/tutorials/security/content-security-policy/#inline-code-considered-harmful
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ssl.google-analytics.com https://assets.zendesk.com https://connect.facebook.net; img-src 'self' https://ssl.google-analytics.com https://s-static.ak.facebook.com https://assets.zendesk.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.zendesk.com; font-src 'self' https://themes.googleusercontent.com; frame-src https://assets.zendesk.com https://www.facebook.com https://s-static.ak.facebook.com https://tautt.zendesk.com; object-src 'none'";


# HTTP ja HTTPS paralleelselt

Järgnev peaks asuma näiteks `/etc/nginx/sites-available/www` failis:

    server {
      # Listen on ports 80 and 443, IPv4 and IPv6
      listen 80 deferred;
      listen [::]:80 ipv6only=on deferred;
      listen 443 ssl default deferred spdy;
      listen [::]:443 ipv6only=on ssl default deferred spdy;

      server_name www.kalbre.eu;

      # HTTPS enforced only with specific paths
      location ~ ^/(login|logout|admin) {
        if ($scheme = 'http') {
          return 301 https://$host$request_uri;
        }
      }

      #... the rest of your configuration
    }

Allikad:

* [Best nginx configuration for improved security(and performance)](https://gist.github.com/plentz/6737338)
* [Nginx: force SSL on one path, non-SSL on others](http://serverfault.com/questions/270339/nginx-force-ssl-on-one-path-non-ssl-on-others)
* [Nginx HTTPS / SSL Google SPDY configuration](http://centminmod.com/nginx_configure_https_ssl_spdy.html) 