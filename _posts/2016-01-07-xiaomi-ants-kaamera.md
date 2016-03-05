---
layout: post
title: Xiaomi Xiaoyi Ants kaamera
categories: postitused
tags: linux xiaomi
image: xiaoyi.png
---
Populaarsust on koguma hakanud üks Hiina firma nimega Xiaomi. Tootevalik on neil üsna lai, alustades käe peal käivatest aktiivsusmonitoridest ja lõpetades õhu niisutajatega. Nad on küll põhiliselt oma energia suunanud kohalikule turule, kuid ka mujal on hakatud nende toodete vastu huvi tundma. Siinkohal teekski algust nenete WiFi kaameraga.

Kaamera omadused:

* 720p video
* Lai vaatenurk (111 kraadi)
* WiFi g/n
* microSD mälukaardipesa videote salvestamiseks
* Kahesuunaline heliülekanne läbi äpi
* Saadaval ka infrapunaga versioon, mis näeb pimedas

Kaamera seadistamine käib äpi abil. See omakorda eeldab Mi konto olemasolu. Ise kasutasin sidumiseks telefoni numbrit, sest sinna oleks keerulisem ja kallim spämmida.

Kui tellida kaamera Hiinast (nt AliExpress kaudu), siis tõenöoliselt on ta valmistatud Hiina turu jaoks ja nendega rahvusvahelistele mudelitele mõledud äpid ei tööta. Ise olen proovinud järgmisi äppe:

* [Android äpp](https://play.google.com/store/apps/details?id=com.ants360.yicamera.international)
* [iOS äpp](https://itunes.apple.com/ee/app/xiao-mi-zhi-neng-jia-ting/id957323480?mt=8)

Paraku on nad valdavas osas Hiina keeles, kuid põhiasjad saab ära tehtud küll.

Uuemad tarkvaraversioonid parandavad järjest enam erinevaid bugisid, kuid samas võtavad _poweruseritele_ mõeldud featuure järjest vähemaks. Õnneks on olnud nutikaid inimesi, kes on välja nuputanud, kuidas ka viimastel versioonidel neid asju tagasi tuua.


## Kuidas taasvõimaldada RTSP, Telnet, FTP ja HTTP ligipääsud

Lahtiseletatult:

* RTSP on striimimisprotokoll, mis annab võimaluse kasutada muid äppe peale Xiaomi enda oma või siis siduda kaamera olemasoleva videovalve süsteemiga
* Telnet annab ligipääsu käsureale, kust saab näiteks ajatsooni muuta (Eestis vaja 2 korda aastas teha)
* FTP, mis iseenesest töötab üle Telnet protkolli, annab võimaluse sirvida mälukaardil olevaid faile
* HTTP võimaldab mälukaardil olevaid faile/salvestisi sirvida, kuid läbi veebibrauseri

### Mida selleks teha vaja on?

1. Lae alla [test-rtspfix-07.zip](test-rtspfix-07.zip) (sobib ka viimase `N`-tarkvaraversiooniga)
2. Paki see lahti ja paiguta failid mälukaardile `test`-kausta
3. Ajatsooni koheseks paikapanekuks ava fail `equip_test.sh` ja vaata, et 10. real oleks `mytz=UTC+2`, kui on talveaeg ja `mytz=UTC+3`, kui on suveaeg.
4. Võta kaameralt juhe tagant ära, pane mälukaart sisse, juhe taha, oota paar minutit ja ongi valmis

Nüüd saab näiteks VLC-ga striimida järgmistelt aadressidelt:

- rtsp://x.x.x.x:554/ch0_0.h264 - hea kvaliteet
- rtsp://x.x.x.x:554/ch0_1.h264 - madalam kvaliteet ja resolutsioon
- rtsp://x.x.x.x:554/ch0_3.h264 - ainult heli

`x.x.x.x` tuleb loomulikult asendada kaamera IP-aadressiga. Selle saab välja uurida näiteks ruuteri DHCP-liiside tabelist või ka näiteks `nmap` käsuga:

    nmap -sT -p80 192.168.1.0/24

See leiab `192.168.1.0/24` võrgust kõik seadmed, millel HTTP port avatud on. Kaamera nimi peaks olema midagi sellist: **ANTSCAM-0000-N1R2...**


### Plussid

- Maksab ainult 30$
- Suudab liikumist tuvastada autonoomselt (erinevalt Nest kaamerast, mis peab selleks videot pilve striimima)
- Lai vaatenurk
- Mikrofon püüab kinni ka vaikseimad helid


### Miinused

- Videostriimi avamine läbi äpi on üsna aeglane, kuid sealt edasi töötab ja reageerib kiiresti
- Äpid on suures osas siiski inglisekeelsed, kuid *push notificationid* on üleni hiinakeelsed (saadetakse, kui liikumist on tuvastatud ja sul on see lubatud)

---

Allikad:

* [Xiaomi Ants Xiaoyi Smart Camera - Adding RTSP support to any firmware version](http://en.miui.com/thread-196713-1-1.html)
* [Xiaomi Xiaoyi Ants unofficial info page](http://xiaoyi.querex.be/)
