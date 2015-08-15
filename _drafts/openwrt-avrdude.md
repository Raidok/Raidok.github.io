---
layout: post
title: OpenWRT tarkvara kompileerimine lähtekoodist
categories: postitused
tags: openwrt
image: openwrt.png
---

Dokumenteerin oma esimest OpenWRT lähtekoodi kompileerimist.



#Ettevalmistused

Ubuntu 12.04 peal kompileerides on vajalik sõltuvuste rahuldamiseks installida mõned pakid:

    sudo apt-get update
    sudo apt-get install git build-essential subversion unzip gawk libncurses-dev zlib1g-dev
    sudo apt-get install guile-2.0-dev libplplot-dev imagemagick pngcrush libssl-dev xsltproc gettext tcl libsqlite3-dev libreadline6 libreadline6-dev libgdbm-dev libav-tools

Laeme `git` abil alla OpenWRT lähtekoodi:

    git clone git://git.openwrt.org/14.07/openwrt.git

Liigume kausta sisse ja avame pakiallikate faili:

    cd openwrt
    vi feeds.conf.default

Fail sisaldab kirjeldusi allikatest, kust OpenWRT pakkide koostamiseks vajalikud lähtematerjalid asuvad. Read, mis algavat märgiga # jäetakse töötlemata. Lisame sinna hulka ka järgmise rea:

    src-git jameshilliard https://github.com/jameshilliard/openwrt-packages.git

Nüüd laeme alla info allikafailides kirjeldatud repositooriumitest:

    ./scripts/feeds update -a

Nüüd, kui kõik pakkide kirjeldused on alla laetud, saab neid näiteks otsida ja siis ühekaupa konfimisliidese jaoks üles seada:

    ./scripts/feeds search avrdude
    ./scripts/feeds install avrdude

Viimane käsk seab üles ka antud paki jaoks vajalikud sõltuvused.

Et valik oleks suurem (konfimine keerulisem), võib kohe jooksutada ka järgneva käsu:

    ./scripts/feeds install -d m -a

    make menuconfig
    Global build settings --->
    [*] Select all packages by default

Seejärel tuleb keskkond lähtekoodi kompileerimiseks ette valmistada järgnevate käskudega:

    make defconfig
    make prereq
    make menuconfig

Viimasega avaneb põnev tekstiline graafiline liides, mis Linuxi kerneli kompileerijatele juba tuttav on, kuid ega seal midagi keerulist pole. Menüüdes liikumine käib üles-alla nooleklahvidega, tegevus valitakse külgmiste nooleklahvidega ja valiku kinnitus enteriga.

![](menuconfig-1.png)

Esmalt tuleks paika panna kiibistik ja profiil. Mul on hetkel seadmeks TP-Link TL-WR710N, millel on sama kiibistik, mis näiteks ka MR3020 ja WR710N mudelitel ehk AR9331. Seega valin Target Systemiks "Atheros AR7xxx/AR9xxx" ja Target Profileks "TP-Link TL-WR710N".

Edasi liigume menüüsse Utilities, otsime sealt üles `avrdude` ja vajutame *space*-i kuni ette tekib märge `M` (või vajutame kohe m-tähte klaviatuurilt).

![](menuconfig-2.png)

Kui nüüd veel seal menüüdes ringi liikuda, võib näha märkeid `{M}` mõningate pakkide ees nagu näiteks `ncurses`, `libftdi`, `libreadline` või `libusb-1.0`. Need on kõik pakid, millest `avrdude` sõltub ja need märgiti ka automaatselt ära.



#Kompileerimine

Nüüd oleme jõudnud kõike piinarikkama (loe: aeganõudvama) sammu juurde - see on kompileerimine. Naljakas on see, et analoogne arvutusvõimsus, mis oli tavalisel lauaarvutil 1998. aastal (400 MHz protsessor, 32 MB muutmälu), on nüüd kättesaadav 5x5x2 cm suuruse karbikese näol (TP-Link TL-WR710N ja muud sarnased mudelid) aga sellele 4 MB suuruse tarkvarafaili kompileerimine võib tänapäevaste arvutitega võtta kuni 4 tundi!

Selleks, et aega kokku hoida, tuleks arvuti jõudlust maksimaalselt ära kasutada. Järgnevad käsud sisaldavad endas kõik `make`-käsku, millele saab määrata argumendi `-j` abil paralleelprotsesside arvu. Kuldreegel on see panna arvutiprotsessori füüsiliste tuumade arv +1, ehk neljatuumalisel protsessoril `-j 5`. Kui sellest nüüd teha ajutine alias - `alias make='time make -j 5 V=99 IGNORE_ERRORS=m'`, on järgnevate käskude jooksutamine *copy-pastemise* vaev:

make toolchain/install 2>&1 | tee build.log | grep --color -E '^|error'
time make -j 5 V=s toolchain/install 2>&1 | tee build.log | grep --color -i -E '^|error.*$'


time make -j 5 V=s tools/install 2>&1 | tee build.log | grep --color -i -E '^.*error.*$|$'
real    7m32.118s
user    16m59.096s
sys 2m58.168s
real    5m26.420s
user    11m45.092s
sys 1m31.740s
time make -j 5 V=s toolchain/install 2>&1 | tee build.log | grep --color -i -E '^.*error.*$|$'

    make tools/install
    time make toolchain/install

j9
real    4m22.529s
user    13m15.540s
sys 1m46.896s

Eelnimetatud aliasega võttis esimene käsk aega 5 minutit ja teine 17.


Asume pakkide kompileerimise ja koostamise kallale. Ühekaupa pakkide loomine käib nii:

    make package/avrdude/compile
    make package/avrdude/install
    make package/index

Kõik korraga:

    make

real    12m23.707s
user    28m19.936s
sys 2m59.908s

Tulemused tekivad `bin` kausta. Liigutame vajalikud pakid sihtseadmesse näiteks asukohta `/root/packages` ja lisame lokaalse repositooriumi faili `/etc/opkg.conf` faili:

    src/gz local file:////root/packages

Uuendame pakkide nimistut:

    opkg update

Paigalame:

    opkg install avrdude_5.11.1-2_ar71xx.ipk


Allikad:
* [OpenWrt Buildroot – Usage](http://wiki.openwrt.org/doc/howto/build)
* [Duplicate libusb dependency in avrdude Makefile](https://github.com/jameshilliard/openwrt-packages/issues/1)
