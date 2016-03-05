---
layout: post
title: Miniruuterid
categories: postitused
tags: openwrt ruuter
image: openwrt.png
---
Olen viimase aasta enda jaoks avastanud miniruuterid. Jõudluse poolest on nad võrreldavad meie pere esimese arvutiga, mis osteti 1998. aastal. Küll aga on nad mõõtmetelt ja energiatarve poolest sadu kordi efektiivsemad ning kuna otstarve on neil üldiselt üsna spetsiifiline, siis piisavalt võimsad ka. Teen ruuteritest väikese kokkuvõtte oma kogemuste ja Internetist leitu põhjal.



# TP-Link MR3020
![]({{site.url}}{{page.url}}mr3020.jpg)

Headeks omadusteks on erinevad indikaatortuled ja lüliti, mida saab OpenWRT-ga vastavalt vajadusele ise ümber konfida. Vabalt mitmetes Eesti poodides kohe letilt ostetav.

Puuduseks võib pidada *flash*-mälu vähesust.

Ise kasutan antud ruuterit 4G hotspoti tegemiseks koos Huawei E3272 modemiga ja [OpenWRT-l põhineva ROOter tarkvaraga](http://ofmodemsandmen.com/downloads.html).

- Atheros AR9331 @ 400MHz
- RAM 32MB
- Flash 4MB
- 10/100 Mbit Ethernet pesa, 802.11 b/g/n Wi-FI kuni 150Mbps
- USB2 pesa<sup><a href="#fn1">1</a></sup>
- **mini**-USB toide
- Lisainfo: [OpenWRT](http://wiki.openwrt.org/toh/tp-link/tl-mr3020)
- [Hinnavaatlus](http://www.hinnavaatlus.ee/products/Arvutikomponendid/V%C3%B5rguseadmed/198762/) ~ 24 €



# TP-Link WR710N
![]({{site.url}}{{page.url}}wr710n.jpg)

See seade on mitmel rindel tubli. Kõigepealt hakkab silma voolupistik, mis on kohe korpuse küljes. Veel teevad teda erilisemaks kaks võrgupesa ja suurem *flash*-mälu, kui enamusel väikestel TP-Link ruuteritel. Nagu ka MR3020 aga erinevalt kõigist järgnevatest seadmetest on seegi ruuter Eesti poodides müügil.

Kasutan antud ruuterit statsionaarse wifi *access pointina* ja dataloggerina spetsiifiliselt selle seadme jaoks kompileeritud OpenWRT-ga.

- Atheros AR9331 @ 400MHz
- RAM 32MB
- Flash 8MB
- **2x** 10/100 Mbit võrgupesa, 802.11 b/g/n Wi-FI kuni 150Mbps
- USB2 pesa<sup><a href="#fn1">1</a></sup>
- **toide otse seinast** (adapter sisse ehitatud)
- Lisainfo: [OpenWRT](http://wiki.openwrt.org/toh/tp-link/tl-wr703n)
- [Hinnavaatlus](http://www.hinnavaatlus.ee/products/Arvutikomponendid/V%C3%B5rguseadmed/435039/) ~ 24 €



# TP-Link WR703N
![]({{site.url}}{{page.url}}wr703n.jpg)

Vast kõige enam häkitud ruuter, kuna ta on olnud kaua saadaval ja küllaltki soodsa hinnaga. Mõõtmetelt on ta pisut väiksem kui TL-MR3020

Miinusteks on see, et jadaliides ja GPIO-klemmid pole nii kergelt kättesaadavad kui näiteks MR3020 mudelil. *Flash*-mälu on ka vähevõitu.

Kasutan ise seda näiteks [kassisöötja sees]({% post_url 2014-10-21-wr703n-automaatne-kassisootja %}).

Seadmest müüakse SLboat-nimelisi modifikatsioone, millel mälu 64 MB, *flash*i 16MB ja sisemine jadaliides microUSB-klemmidele viidud. Hind selle eest kohe kahekordne.

- Atheros AR9331 @ 400MHz
- RAM 32MB
- Flash 4MB
- 10/100 Mbit võrgupesa, 802.11 b/g/n Wi-FI kuni 150Mbps
- USB2 pesa<sup><a href="#fn1">1</a></sup>
- micro-USB toide
- Lisainfo: [OpenWRT](http://wiki.openwrt.org/toh/tp-link/tl-wr703n)
- [eBay](http://www.ebay.com/sch/i.html?_sacat=0&_nkw=wr703n&_frs=1) ~ 18 €



# NEXX WT3020H
![]({{site.url}}{{page.url}}wt3020h.jpg)

Jõudluse ja hinna suhe on sellel seadmel vaieldamatult parim, eriti just H-mudelil. A-mudel on ilma USB-pordita ja väiksema flash-mäluga, teised omavad H-mudeliga võrreldes vist ainult tarkvaralisi erinevusi.

Miinuseks võib lugeda vähemtuntud kiibistikku, kuid arhitektuur on sama, seega kommuuni poolt päris hästi toetatud ja ei erine siin ülejäänutest olulisel määral.

- MediaTek MT7620n @ **580MHz**
- **RAM 64MB**
- Flash 8MB
- USB2 pesa
- micro-USB toide
- Lisainfo: [OpenWRT](http://wiki.openwrt.org/toh/nexx/wt3020)
- [AliExpress](http://www.aliexpress.com/item/WT3020H-Portable-Mini-USB-Flash-Drive-Wifi-Wireless-Roteador-Repeater-With-Firewall-Free-Shipping/2042796430.html) ~ **16 €**



# GL.iNet
![]({{site.url}}{{page.url}}gl-inet.jpg)

Tegu on uustulnukiga aga tugev konkurent kõigile teistele. Põhiliselt muut- ja *flash*-mälu poolest, kui ka topelt võrgupesade poolest. Paljude poolehoiu võidab see kindlasti ka häkitavuse poolest. Nimelt on 5 GPIO klemmi, toitepesad lisaskeemide jaoks ja jadaliides nii kergelt kättesaadavaks tehtud ning [välise antenni lisamine](http://shiki.tk/?p=2940) on lihtne kui lapsemäng.

- Atheros AR9331 @ 400MHz
- RAM **64MB**
- Flash 8MB/**16MB**
- 2x 10/100 Mbit Ethernet pesa, 802.11 b/g/n Wi-FI kuni 150Mbps
- Kodulehekülg: [GL.iNet](http://www.gl-inet.com/w/?page_id=241)
- Lisainfo: [OpenWRT](http://wiki.openwrt.org/toh/gl-inet/gl-inet)
- [AliExpress](http://www.aliexpress.com/item/Portable-Smart-Router-GL-iNet-3G-OpenWrt-Mobile-App-control-16M-flash/2045248669.html) ~ 28 €

---

<sup id="fn1">1</sup> AR9331 kiibistikul on probleeme USB1-seadmetega (aka *full speed*), USB2 (aka *high speed*) seadmed peaksid töötama probleemivabalt
