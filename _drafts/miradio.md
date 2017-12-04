


Postitus http://en.miui.com/forum.php?mod=redirect&goto=findpost&ptid=301617&pid=8597707

http://ximiraga.ru/

https://github.com/andr68rus/miwifiradio

php7.0-fpm php7.0-mysql mysql-server

    CREATE DATABASE 'miradio';
    CREATE USER 'miradio'@'localhost' IDENTIFIED BY '';
    GRANT ALL PRIVILEGES ON miradio.* TO 'miradio'@'localhost';
    FLUSH PRIVILEGES;

CTRL+D

    mysql miradio < db.sql


## php-fpm muudatused

https://stackoverflow.com/a/24198313/767678


/etc/php/7.0/fpm/pool.d/www.conf

    ;listen = /run/php/php7.0-fpm.sock
    listen = 9000

    listen.allowed_clients = 127.0.0.1


ffmpeg kompileerimine: https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
