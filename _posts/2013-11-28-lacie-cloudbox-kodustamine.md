---
layout: post
title: LaCie CloudBox kodustamine
categories: postitused
tags: linux
image: lacie.png
---
Sain sõrmed ligi seadmele [Lacie CloudBox](http://www.lacie.com/products/product.htm?id=10597). Tegu on kena ja asjaliku võrgukettaga, mis põhineb Linuxil. Ülesseadmine oli väga lihtne - kaks juhet taha ja paari minuti pärast ilmus võrku avalik kataloog. Brauseriga NAS-i aadressile liikudes sai esmased seadistused kiiresti tehtud. Küll aga on veebiliides ja seadme üldine funktsionaalsus üsnagi piiratud. Mida muud kui _rootime_ ära!

[![Lacie CloudBox](p-lacie_cloudbox.jpg)](lacie_cloudbox.jpg)

Pilt pärineb [Lacie kodulehelt](http://www.lacie.com/products/product.htm?id=10597).

Karbist võttes on seadmel koheselt seadistatud Windows/Samba kataloog nimega Family, kuhu kõik kirjutada ja lugeda saavad. Esmasel käivitusel luuakse ka kasutajale admin parool ning ka parooliga kaitstud võrgukataloog. Ilma lisaliigutusteta on seadmel olevad avalikud failid DLNA kaudu kenasti ligipääsetavad.

Asume nüüd _rootimise_ juurde. Järnev jutt pärineb suures osas [NAS-Central Lacie CloudBox artiklist](http://lacie.nas-central.org/wiki/Category:CloudBox).

###Ajutise Telneti ligipääsu võimaldamine

Alustuseks tuleb Samba abil minna Family kausta ja tekitada sinna fail `telnetd.sh`, ning sisuks panna järnev:

    #!/bin/sh
    /usr/sbin/telnetd -l /bin/sh

NB! Reavahetused peavad olema UNIX-stiilis ehk `\n`. Linuxis see probleemiks ei ole.

Laeme alla ja kompileerime programmi, millega saab LaCie ketaste U-Boot konsooli üle võrgu ligi:

    sudo apt-get install make netcat
    wget ftp://lacie-nas.org/tools/clunc-1.1.tar.gz
    tar -xvf clunc-1.1.tar.gz
    cd clunc-1.1/
    make
    ./clunc -i $NASIP

Teeme kettale veebiliidese kaudu restardi ja ootame, kuni konsooli ilmub `Marvell>>` ja sisestame sinna:

    setenv console "ttyS0,115200 a=a;/*/*/telnetd.sh"
    ide reset
    run nexus_boot

Kui ees on seisab kiri "Starting kernel ...", võib kombinatsiooniga CTRL+C protsessi lõpetada. Umbes 2-3 minuti pärast peaks ketas olema ligipääsetav telnetiga:

    telnet $NASIP

###SSH ligipääsu võimaldamine

Kommenteerime sshd initng failis sisse, et see _bootimisel_ käivitataks:

    cd /etc/initng/runlevel
    cp default.runlevel default.runlevel.bak
    sed -i '/^#sshd$/s/^#//' default.runlevel

Lubame SSH-deemoni:

    cd /etc/unicorn/unicorn_conf
    cp unicorn.sharing.ssh.conf unicorn.sharing.ssh.conf.bak
    sed -i '/enabled:.*false/s/:.*/: true/' unicorn.sharing.ssh.conf

Käivitame SSH-deemoni:

    ngc --start sshd

Kuna port 22 on kasutusel SFTP poolt, siis SSH käsurea ligipääs on võimalik pordi 2222 kaudu.


###SSH-võtmete paigaldamine

Root kasutaja parool pole teada, küll aga on võimalik SSH-võtmete abil ligi pääseda. Selleks teeme nii:

    ssh -o batchmode=yes 0.0.0.0  # ignore the error - this simply creates .ssh with correct permissions
    cd ~/.ssh
    ssh-keygen  # accept defaults, but be sure to enter a good passphrase
    cp id_rsa.pub authorized_keys
    chmod 600 authorized_keys
    cat >> authorized_keys  # paste your public key, press Enter and CTRL+D

Teeme taaskord restardi veebiliidese kaudu ja paari minuti pärast peaks õnnestuma see:

    ssh root@$NASIP

