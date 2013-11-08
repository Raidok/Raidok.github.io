---
layout: post
title: Linuxi spikker
categories: postitused
tags: linux
image: linux.png
updated: 2013-11-08
---
Panen kokku spikri, mis aitaks UNIX/Linux-põhiste süsteemide haldamisel abiks olla. Neid käskusid on üsna palju ja aeg-ajalt kipuvad meelest ära minema. Ehk tuleb kunagi hiljem kasuks.


##Bash
Selleks, et käsureaga paremini toime tulla, on kasulik teada mõningaid _shelli_ kasutamise nippe. Näitena Bash:

    TAB               lõpetab käsu/faili nime
    CTRL + C          katkestab käimasoleva protsessi
    CTRL + D          logib välja
    CTRL + A          liigub rea algusesse
    CTRL + E          liigub rea lõppu
    CTRL + R          otsing käskude ajaloos
    CTRL + Shift + C  kopeerimine
    CTRL + Shift + V  kleepimine


##Käsud terminalis

<dl>
<dt>pwd</dt>
<dd><em>Print Working Directory</em> - väljastab käesoleva absoluutse asukoha</dd>

<dt>clear</dt>
<dd>Tühjendab terminali akna</dd>

<dt>exit</dt>
<dd>Logib välja</dd>

<dt>shutdown</dt>
<dd>Arvuti seiskamine või taaskäivitamine
<pre><code>shutdown -r                     taaskäivitab, aliasena on olemas ka `reboot`
shutdown -r 1 "Teen restardi!"  annab kasutajatele teada ja teeb restardi 1 minut hiljem
shotdown -h now                 alustab koheselt süsteemi seiskamisega
</code></pre></dd>

<dt>cd</dt>
<dd><em>Change Directory</em> - kataloogide vahel ringi liikumiseks
<pre><code>cd ..       liigub üles
cd ../test  liigub naaberkataloogi "test"
cd ~        liigub kasutaja kodukataloogi
cd /        liigub failisüsteemi juurkataloogi
</code></pre></dd>


<dt>ls</dt>
<dd><em>List</em> - väljastab kataloogis sisalduvate failide nimekirja
<pre><code>ls /home    väljastab kõikide kasutajate kodukataloogid jadamisi
ls -l       väljastab käesoleva kataloogi failid nimekirjana
ls -la ~    väljastab kodukataloogi sisu (sh peidetud failid)
</code></pre></dd>

<dt>cp</dt>
<dd><em>Copy</em> - failide kopeerimiseks
<pre><code>cp ~/.bashrc ~/.bashrc_old          teeb Bashi konfiguratsioonist koopia
cp -r Dokumendid Dokumendid_vana    teeb mittetühjast kaustast koopia (rekursiivselt)
</code></pre></dd>

<dt>mv</dt>
<dd><em>Move</em> - failide liigutamiseks
<pre><code>mv tekst.txt Dokumendid/             liigutab faili Dokumentide kausta
mv testskript.sh Skriptid/sync.sh    nimetab skripti ümber ja liigutab teise kausta
</code></pre></dd>

<dt>pidof</dt>
<dd><em>Process ID of</em> - väljastab nimetatud protsessi id või kui samanimelisi protsesse on palju, siis kõikide selliste ID-d
<pre><code>pid chromium-browser
</code></pre></dd>

<dt>ps</dt>
<dd><em>Process Status</em> - info käimasolevate protsesside kohta
<pre><code>ps -aux             väljastab kõik käimasolevad protsessid kõikidelt kasutajatelt
ps -auwww-data      väljastab kõik kasutaja "www-data" protsessid
</code></pre></dd>

<dt>kill</dt>
<dd><em>Kill</em> - lõpetab protsessi, mida muul viisil millegipärast lõpetada ei saa(PID põhjal, vt `pidof`)
<pre><code>kill -15 [PID]   rahumeelne lõpetamine, laseb protsessil enda järgi "koristada"
kill -9 [PID]    kui -15 ei mõju, siis natukene kangem relv on -9
</code></pre></dd>

<dt>killall</dt>
<dd><em>Killall</em> - lõpetab kõikide antud nimega protsesside töö
<pre><code>killall chromium-browser
</code></pre></dd>

<dt>grep</dt>
<dd>Otsib failidest etteantud sümboleid/mustreid ja väljastab read, kus need leidusid
<pre><code>grep "ERROR" log.txt            otsib logifailist ridu, mis sisaldavad stringi "ERROR"
grep -B5 -A2 "ERROR" log.txt    otsib logifailist vasteid ja väljastab neile eelnenud 5 rida ning järgnevad 2 rida
</code></pre></dd>

<dt>find</dt>
<dd>Otsib faile kataloogistruktuuridest.
<pre><code>find . -name "*.jpg"    otsib käesolevast ja sisalduvatest kataloogidest faile laiendiga ".jpg" 
</code></pre></dd>

<dt>useradd</dt>
<dd>Uue kasutaja loomiseks.
<pre><code>useradd -m /home/tom tom               loob ilma paroolita kasutaja nimega "tom" ja teeb talle ka kodukataloogi /home/tom
useradd --system --user-group deemon   loob süsteemse kasutaja "deemon" ja samanimelise grupi, mõeldud taustaprotsesside jooksutamiseks
</code></pre></dd>

<dt>usermod</dt>
<dd>Kasutaja muutmiseks.
<pre><code>usermod -a -G dialout tom       lisab kasutaja "tom" gruppi "dialout", et ta pääseks ligi jadapordile
</code></pre></dd>

<dt>passwd</dt>
<dd><em>Password</em> - salasõna muutmiseks
<pre><code>passwd      käesoleva kasutaja parooli muutmiseks
passwd tom  kasutaja "tom" parooli muutmine (ilmselgelt vajab kõrgendatud õiguseid)
</code></pre></dd>

<dt>chmod</dt>
<dd><em>Change Mode</em> - failide ja kataloogide ligipääsuõiguste muutmiseks.<br>Numbriline esitus: 1-käivitusõigus, 2 kirjutamisõigus, 4 lugemisõigus.<br>
Tekstiline esitus: x-käivitusõigus, w-kirjutamisõigus, r-lugemisõigus.
<pre><code>chmod -R www-data:www-data /var/www   määrab kausta /var/www ja sisalduvate failide omanikuks ja grupiks "www-data"
chmod -R 754 /var/www                 annab kausta /var/www ja sisalduvatele failide omanikule kõik õigused, grupile lugemise ja käivitamise õiguse ja teistele ainult lugemisõiguse
chmod ugo+x ~/skript.sh               annab kasutaja kodukataloogis failile "skript.sh" kõigi jaoks käivitusõiguse
</code></pre></dd>

<dt>ifconfig</dt>
<dd><em>Interface config</em> - võrguliideste konfigureerimiseks ja sirvimiseks
<pre><code>ifconfig    näitab ülevaadet kõikidest võrguliidestest(IP-, MAC-aadress jne)
</code></pre></dd>

<dt>ssh</dt>
<dd><em>Secure Shell</em> - krüpteeritud konsooliühendus üle võrgu
<pre><code>ssh pi@raspberrypi      logib serverisse "raspberrypi" sisse kasutajana "pi"
</code></pre></dd>
</dl>

Kõikide käskude puhul on võimalik abi leida `[KÄSK] --help` viisil või täpsemat juhendit näha `man [KÄSK]`.


##Sisendi/Väljundi suunamine

    ls -l > failid.txt              kirjutab `ls -l` väljundi otse faili
    ls -l | less                    kui `ls -l` väljund korraga ekraanile ära ei mahu, saab seda `less` abil puhverdada
    ls -l | tee failid.txt          kirjutab `ls -l väljundi faili, kuid kuvab tulemust ka terminalis
    ls -l 2>&1 | tee failid.txt     kui `ls -l` peaks andma mingit viga, väljastatakse see ning kirjutatakse faili ka
    ls -l > failid.txt 2>&1         kui teha otse faili suunamist, tuleb vigade suunamine käsureal hiljem
    cat > note.txt                  hoiab konsooli kinni, kuni kasutaja sinna midagi kirjutab, lõppu tühja rea lisab ning CTRL+D vajutab
    cat >> note.txt                 kui fail on olemas, kirjutab juurde
    sort < nimed.txt > nimed_s.txt  annab programmile `sort` sisendiks "nimed.txt" ja kirjutab väljundi faili "nimed_s.txt"


##Kataloogide struktuur

kataloogide struktuur:

    /       juurkataloog, kõige alus
    /boot   alglaaduri failid
    /bin    kasutajate binaarfailid, enamus ülalnimetatutest asuvad siin (ls, cp, mv, ps, grep jne)
    /sbin   süsteemi binaarfailid (ifconfig, reboot)
    /etc    konfiguratsioonifailid
    /dev    seadmete failid
    /proc   protsesside informatsioon
    /var    muutuvad failid (nt logid)
    /tmp    ajutised failid
    /usr    kasutajate programmid
    /home   kasutajate kodukataloogid
    /lib    süsteemi teegid
    /opt    lisatarkvara
    /mnt    haakepunktid (nt võrgukettad)
    /media  eemaldatavad seadmed (mälupulgad, välised kõvakettad tekivad siia)

