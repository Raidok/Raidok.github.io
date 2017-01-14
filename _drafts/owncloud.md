---
layout: post
title: ownCloud privaatne pilv
categories: postitused
tags: linux debian ubuntu
image: linux.png
---


# Nginx

Lisa repo allikatesse ja tõmbame ka võtmed:

    echo "deb http://ftp.debian.org/debian jessie-backports main" | sudo tee -a /etc/apt/sources.list.d/jessie-backports.list
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8B48AD6246925553
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 7638D0442B90D010

Värskendus:

    apt-get update

Installime nginx-i

    apt-get -t jessie-backports install nginx





sudo apt-get install nginx php5-fpm php5-gd php5-curl php-apc mysql-server

CREATE USER 'nextcloud'@'localhost' IDENTIFIED BY 'nextcloud';
CREATE DATABASE IF NOT EXISTS nextcloud;
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextcloud'@'localhost' IDENTIFIED BY 'password';


#SSL

www.startssl.com

Express Lane

Täida vorm, oota

Kinnitus

Vali registreeritav domeen

Saadetakse kinnitusmeil postmaster@domeen.ee

Krüpteeritud privaatvõtme genereerimine
Tuleb valida parool, millega võtme hiljem dekrüpteerida saab




#MariaDB

sudo apt-get install python-software-properties

sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db

sudo add-apt-repository 'deb http://ftp.osuosl.org/pub/mariadb/repo/10.0/ubuntu precise main'

sudo apt-get update

sudo apt-get install mariadb-server



    server {
            listen 80;
            server_name www.domeeninimi.ee domeeninimi.ee;
            return 301 https://$server_name$request_uri;  # enforce https
    }

    server {
            listen 443 ssl;
            server_name www.domeeninimi.ee domeeninimi.ee;

            ssl_certificate /etc/ssl/nginx/domeeninimi.ee.crt;
            ssl_certificate_key /etc/ssl/nginx/domeeninimi.ee.key;

            # Path to the root of your installation
            root /var/www/;

            client_max_body_size 10G; # set max upload size
            fastcgi_buffers 64 4K;

            rewrite ^/caldav(.*)$ /remote.php/caldav$1 redirect;
            rewrite ^/carddav(.*)$ /remote.php/carddav$1 redirect;
            rewrite ^/webdav(.*)$ /remote.php/webdav$1 redirect;

            index index.php;
            error_page 403 /core/templates/403.php;
            error_page 404 /core/templates/404.php;

            location = /robots.txt {
                allow all;
                log_not_found off;
                access_log off;
            }

            location = /favicon.ico {
                access_log off;
                log_not_found off;
            }

            location ~ ^/(data|config|\.ht|db_structure\.xml|README) {
                    deny all;
            }

            location / {
                    # The following 2 rules are only needed with webfinger
                    rewrite ^/.well-known/host-meta /public.php?service=host-meta last;
                    rewrite ^/.well-known/host-meta.json /public.php?service=host-meta-json last;

                    rewrite ^/.well-known/carddav /remote.php/carddav/ redirect;
                    rewrite ^/.well-known/caldav /remote.php/caldav/ redirect;

                    rewrite ^(/core/doc/[^\/]+/)$ $1/index.html;

                    try_files $uri $uri/ index.php;
            }

            location ~ ^(.+?\.php)(/.*)?$ {
                    try_files $1 = 404;

                    include fastcgi_params;
                    fastcgi_param SCRIPT_FILENAME $document_root$1;
                    fastcgi_param PATH_INFO $2;
                    fastcgi_param HTTPS on;
                    fastcgi_pass php-handler;
            }

            # Optional: set long EXPIRES header on static assets
            location ~* ^.+\.(jpg|jpeg|gif|bmp|ico|png|css|js|swf)$ {
                    expires 30d;
                    # Optional: Don't log access to assets
                    access_log off;
            }

    }


    sudo vi /etc/php5/fpm/php.ini

    date.timezone = Europe/Tallinn
    cgi.fix_pathinfo=0
    upload_max_filesize = 10G
    post_max_size = 10G


    sudo service nginx start && sudo service php5-fpm start && sudo service mysql start
    sudo mysql_secure_installation
    mysql -u root -p

    CREATE DATABASE owncloud;
    GRANT ALL PRIVILEGES ON owncloud.* TO 'ocuser'@'localhost' IDENTIFIED BY 'ocpass';
    FLUSH PRIVILEGES;
    quit;


#OwnCloud

    wget http://download.owncloud.org/community/owncloud-6.0.3.tar.bz2
    sudo mkdir /var/www
    sudo tar jxf owncloud-*.tar.bz2 -C /var/www
    sudo mkdir -p /data/owncloud



#mountimine

    sudo apt-get install autofs sshfs




#CRON

    sudo crontab -u www-data -e
    */15 * * * * php -f /var/www/owncloud/cron.php

http://doc.owncloud.org/server/6.0/admin_manual/installation/installation_source.html
http://askubuntu.com/questions/64772/how-to-install-mariadb
http://forums.freenas.org/index.php?threads/how-to-owncloud-using-nginx-php-fpm-and-mysql.17786/
http://techgotcha.com/linux-how-to-mount-remote-storage-on-demand/
http://raspberrypi.stackexchange.com/a/45278/48178
