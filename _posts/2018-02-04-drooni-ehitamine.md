---
layout: post
title: Alustava drooniehitaja meelespea
categories: postitused
tags: RC droon nelikopter
image: drone.png
---
Nüüdseks olen umbes 3 kuud tegelenud droonidega ja õpitud on niimõndagi. Usun, et sellest võib ka teistelegi kasu olla, seega püüan seda mingit moodi teistegagi jagada.


### Komponendid

Alustuseks püüan ära seletada mõningad lühendid, mida selles maailmas päris tihti kohtab.

Kõigepealt erinevad komponendid:

**FC** - _Flight Controller_ - Drooni aju. Kõige lihtsamal kujul koosneb see mikrokontrollerist, paarist sensorist ja neid toetavast elektriskeemist. FC suhtleb vastuvõtjaga, et saada käsklusi ja tõlgib selle mootorite jaoks sobivateks signaalideks. Samas arvestab ka sensorite näitudega (näiteks akseleromeetri ja güroskoobi) ning üritab nende abil näiteks tuulele vastu võidelda.

**PDB** - _Power Distribution Board_ - Tavaliselt ühendub siia akujuhe ja kõik tarbijad. Tihti on selle peal ka vähemalt üks pingeregulaator, mis tavaliselt annab 5 volti välja, et FC-d, RX-i ja muid komponente toita.

**ESC** - _Electronic Speed Controller_ - Kuna harjadeta mootorid on kolmefaasilised ja töötavad vahelduvvoolu pealt, kuid akud on annavad tavaliselt alalisvoolu välja, siis selleks on igale mootorile vaja ESC-d. See tõlgib FC-lt tuleva kiirusesignaali mootori jaoks ümber. Tavaliselt on igal mootoril eraldiseisev ESC, kuid mõnikord võib olla 4 ESC-d ühe plaadi peale kokku pandud olla. ESC suhtleb FC-ga mingis kindla protokolliga. Varasemalt kasutati PWM, Oneshot ja multishot protokolle, mis on kõik analoogsignaalid, kuid viimasel ajal kasutatakse peamiselt (digitaalset) DShot protokolli.

**TX** - _Transmitter_ - Maakeeli öeldes lihtsalt pult. Levinuimad on Taranis-nimelised raadiod, kuid ise kasutan näiteks FlySky-nimelist. Taranistel on ilmselt palju eeliseid, kuid on paar korda kallimad. Hetkel veel ei kahetse oma ostu ja kui ei ole Taranist proovinud, ei tea paremat tahta.

**RX** - _Receiver_ - Väike trükkplaadike, mis käib drooni peale ja suhtleb puldiga. Tavaliselt kahe antenniga, et vastuvõtt toimiks ka kalde all. Peab jälgima, et nende protokollid ühtiksid. Näiteks Taranised kasutavad SBUS protokolli ja FlySky'd IBUS-i. On ka muid protokolle nagu näites PWM ja PPM aga tänapäeval kasutatakse neid vähe, eriti droonide puhul.

**VTX** - _Video Transmitter_ - Võtab kaamera pildi ja kiirgab seda õhku. Tavaliselt kasutatakse 5.8GHz sagedusriba, kus ilma raadioamatööri litsentsita võib edastada kuni 25mW võimsusega. Selle leviala on alustuseks piisav (nii umbes 100m), kuid suuremate võimsuste jaoks tuleks teha kvalifikatsioonieksam. Lisainfo [Eesti Raadioamatööride Ühingu kodulehel](http://erau.ee/).

**OSD** - _On Screen Display_ - Tavaliselt koosneb mingist mikrokontrollerist, mis ühendub kaamera ja VTX-i vahele ning lisab sinna lisainfot nagu näiteks aku pinge ja tarbitav voolutugevus.

Mõnikord kõiki juppe eraldi vaja polegi. Näiteks on osadele FC-dele sisse ehitatud OSD ja võibolla isegi PDB. Väiksematel droonidel võib selle sama plaadi peale ka ESC'd ära mahutatud olla.

Lisaks on ka muid komponente, millel nii lühikesed nimed pole:

**Raam** - Tavaliselt lõigatakse neid välja *carbon fibre*st ehk süsinikkiust ja on kahe-või kolmekorruselised. Plaadid on omavahel alumiiniumdistantskruvidega kokku keeratud, et kaitsta nende vahele paigaldatavat elektroonikat.

**Mootorid** - Jõuallikad. Väiksematel droonidel on klassikalised harjadega mikromootorid, kuid üldjuhul kasutatakse harjadeta mootoreid, kus staator on seespool ja välisseinad käivad ringi. Niipidi ehitatud mootoritel on kerget kaalu säilitades võimalik suhteliselt suurt väändemomenti arendada. Kasutusel on omaette tähistused neljakohaliste numbrite näol. Näiteks väiksematel droonidel on 1104 tähistusega mootorid, mis tähendab, et staatori läbimõõt on 11mm ja kõrgus 4mm. Väga levinud on ka näiteks 2205-mõõtu mootorid.

**Propellerid** - Propellerite puhul mängib rolli nende pikkus, materjali elastsus, propelleritipu kuju, laba laius ja kaldenurk ja loomulikult labade arv. Kõige levinumat tüüpi propellerid on 5-tollised ja kolmelabalised.

**Kaamera** - Tavaliselt põhinevad mingitel ülesvuntsitud CMOS-tüüpi turvakaamerate sensoritel, millelt tuleb analoogsignaal. Jah, just analoog, sest see on ilma viiteta.

**FPV prillid** - Mugavaim viis drooni juhtida on prillide abil. Levinuim (ning samas kalleim) bränd on Fat Shark, kuid Eachine ja Aomway on teinud täitsa võrreldavaid tooteid.

Detaile on palju ja kokkusobivate juppide valimine ei pruugi olla lihtne. Mõistlik on uurida, mida teised on kasutanud ja neist malli võtta.



### Komplektsed droonid

Kui kõik need mõisted silme eest kirjuks võtsid, siis alati on ka variant osta mingi komplektne droon ja hakata seda putitama. Sellisel juhul kohtab kindlasti mõnda järgnevatest mõistetest:

**RTF** - _Ready To Fly_ - Ainukene variant, kus on kõik olemas, et karbist välja võttes lennata, seal hulgas ka pult(TX). Selle negatiivne külg on see, et tavaliselt on sellistel komplektidel mingi spetsiifiline pult, mida erinevate mudelite vahel jagada ei saa.

**BNF** - _Bind aNd Fly_ - Komplekt, mis eeldab, et ostjal on juba pult(TX) olemas. Tuleb ainult kontrollida, et see sobiks mudeli küljes oleva vastuvõtjaga(RX) st kasutaksid suhtluseks sama protokolli. Üldjuhul puudub neis komplektides ka aku.

**PNP** - _Plug aNd Play_ - Sellise komplekti puhul peab endal olemas olema nii TX, RX kui ka aku.

**ARF** - _Almost Ready to Fly_ - Sellistel komplektidel on tavaliselt juba rohkem asju puudu kui PNP-l, praktiliselt paljas raam.



### Jootekolb on su sõber

{% include image.html file="sp-f3-flight-controller.jpg" alt="Seriously Pro Racing F3 lennukontroller" align="right" %}

Paljudel droonidele mõeldud komponentidel on küljes pesad, kuhu saab igasugu erinevaid juhtmeid ühendada, kuid mitte miski ei asenda korralikku joodet.

Võtame näiteks lennukontrolleri, mis on droonil ajuks. Sinna külge ühendub palju asju, millest olulisimad on vastuvõtja, mootorite kiiruskontrollerid ja toide. Need kokku moodustavad juba vähemalt 10 juhet. Kõrvaloleval pildil kujutatud lennukontrolleril on näiteks paar olulist ühendust mõlemas külgmises suuremas pesas, kuid pooled neist klemmidest on tavaliselt üsna kasutud ja need tuleks kas välja nokkida või läbi lõigata. Välja nokkides väheneb pistikut pesas hoidev hõõrdejõud veelgi ja juhtmete läbi lõikamine tundub raiskamisena. Õnneks on enamus asju kas kuskile plaadi serva augu või jootepadjana välja toodud ja ühtegi pesa tegelikult kasutada vaja ei olegi.

Need kolm rida auke plaadi ülaservas on mootorite kiiruskontrollerite jaoks ehk siis see plaat toetab teoreetiliselt kuni kaheksat mootorit. Mõnikord on sinna juba tehases _headerid_ külge joodetud, mis on väga kehv variant, sest esiteks neid on väga raske sealt kätte saada ning teiseks ei seisa juhtmete emased _headerid_ neil väga hästi küljes.

Kett on sama tugev kui on tema nõrgim lüli. Mida vähem on asju, mis lennu ajal lahti põruvad, seda suurem on võimalus, et enne saavad akud otsa või teed ise vea kui see, et droon mingil suvalisel hetkel lihtsalt taevast alla sajab.



### Ära eelda, et kõik "lihtsalt töötab"

{% include image.html file="pdb-xt60.jpg" alt="PDB-XT60" align="right" %}

See reegel peab eriti paika kui osta vähemtuntud tootjate komponente või tuntud toodete odavaid Hiina kloone. Tasub end kurssi viia detailide üldise hinnatasemega ja kui siis leidub miski, mis on hinna poolest liiga hea, et tõsi olla, siis tõenäoliselt seda ta ka on.

Toome näitena PDB (_Power Distribution Board_), mille ostsin eBay'st ja maksis $2.90. Mul õnnestus sellest esimese tunni aja jooksul 2 korda maagiline sinine suits välja meelitada. Mõlemal juhul olid mul kõik drooni küljes olevad juhtmed korralikult kinni ja ma polnud seda veel lendamagi saanud - katsetasin alles mootoreid, et kõik õiget pidi ja sünkroonis ringi käiksid. See kõik juhtus umbes tunni aja jooksul ning valdav osa kulus plaadil oleva 5V pingeregulaatori asendamine eraldiseisvaga.

Lõppes see sellega, et lõikasin kõik juhtmed läbi ja jootsin juhtmed ilma PDB-ta kokku (ärge kodus proovige). Toimis päris hästi kuni uue ja korralikuma toote ühest Eesti poest kätte sain. See juhtus reede õhtul ja ei jaksanud tervet nädalavahetust oodata. :)



### Kruvid kinni, krõpsud pingule, nipukad peale

Üks nõuanne, mis venitab küll ettevalmistuste aega mõnevõrra pikemaks, kuid võib ka lennuaega oluliselt pikendada - mitte midagi ei tohi kuskil logisema ega rippuma jääda.

Kord mul õnnestus näiteks värskelt paigaldatud vastuvõtja üks antennijuhtmetest paljaks koorida ja kohati ka praktiliselt pooleks lõigata, sest sellel oli väike lõtk sees ja vajus lennu ajal propellerile ette.

Veendu alati enne lendama minemist, et raam oleks ühes tükis, kriitilisemates kohtades poleks pragusid, mootorid oleks kõvasti kinni, et propellerid "mootorikellade" peal ringi ei käiks, et ükski juhe kuskilt vahelt välja ei kukuks ja raputades midagi kuskil ei koliseks.

Mõistlik on ka hankida ühelt poolt kleepuvad krõpsuribad, et siis üks pool raami peale ja teine akule kleepida. See on lisakaitse selle eest, et aku teda vastu raami tõmbav krõpsuriba vahelt ära ei libiseks.



### Kes kannatab, see kaua elab

Kui oled jälle õhtu otsa drooni kallal vaeva näinud ja saanud ta jälle lennukõlbulikuks, siis ei tasu kohe pimedas seda proovima minna. Esimestel nädalatel õnnestus mul korduvalt seda viga teha.

Samuti ei tasu tugevama tuulega lennutama minna kui pole enda oskustes päris kindel. Tuul võib päris ootamatult drooni kuskile puu otsa kanda. Korra olen pidanud ühe üsna pika tüvega männi otsa ronima, sest droon oli ennast päris hästi sinna pehmete okste vahele kinni põiminud.



### Elementaarne, Watson

Enne lennu alustamist või pigem kohe peale (raskemat) maandumist veendu, et midagi kuskil ei logiseks ja elementaarsed osad droonil veel küljes oleksid. Hiljem seda kohta ja veel vähem kaduma läinud osi leida võib olla üsna raske.

Nii mul õnnestus näiteks VTX-i antenn koos pesaga plaadi küljest lahti murda. Kuna ta oli veel musta värvi ka (TBS Triumph), siis oli teda päris raske pimedas üles leida.

Näiteks talvel lennates ja lumme maadudes on mõistlik enne "armimist" sõrmega propellereid ringi ajada. Lumi võib olla mootorisse sulanud ning seal ära jõudnud jäätuda. Muidu võib mootori või ESC läbi põletada, halvemal juhul võib midagi isegi põlema minna.



### Palju kasulikku lugemist

* [Propwashed](https://www.propwashed.com)
* [OscarLiang](https://oscarliang.com)
* [DroneTrest](https://blog.dronetrest.com)
* [RC Groups foorumid](https://www.rcgroups.com/forums)



### Kust osta?


#### Eesti poed

##### FPV.ee ([fpv.ee](http://shop.fpv.ee))

Valik ei ole küll meeletult lai, Eesti pood ju ikkagi (väike turg), kuid kõik vajalik on olemas. Kui midagi ootamatult katki läheb, saab juba järgmiseks tööpäevaks asenduse osta küll.

##### EUDRL ([eudrl.com](http://www.shop.eudrl.com))

Müüakse ka põhimõtteliselt kõike, mida vaja on. Omast kogemusest võin öelda, et kohaletoimetamine on ka väga kiire. :)

##### Droonimaailm ([droonimaailm.ee](https://www.droonimaailm.ee))

Põhiliselt keskenuvad DJI droonidele, kuid nad müüvad ka GensAce Tattu seeria akusid, mis on väga tuntud ja kiidetud nelikopterite omanike seas.

##### Droon ([droon.ee](https://www.droon.ee))

Keskenduvad DJI, Parroti jms droonidele ning muudele puldiga juhitavatele (mängu)asjadele, kuid pakutakse ka mõningaid võidusõidudroonide komplekte.

##### FlitonRC ([flitonrc.com](http://www.flitonrc.com))

Üks tagasihoidlik hobipood. Sealt võib ka üht-teist vajalikku leida.



#### Välismaa poed

##### HobbyKing ([hobbyking.com](https://hobbyking.com))

Lai kaubavalik, alustades LiPo akudest ja lõpetades FPV kaameratega ehk siis sealt saab kõike nelikopterite ehituseks vajalikku. Neil on ka Euroopa ladu, kus suur osa kaubast olemas on.

##### GearBest ([gearbest.com](https://www.gearbest.com))

On vähe inimesi, kes sellest poest midagi kuulnud pole, sest seal müüakse tõesti kõike. Seal hulgas ka droonide ehitamiseks vajalikke juppe. Baseeruvad nad Hiinas ja seetõttu on paljud nende poolt müüdavad kaubad küll odavad aga kipuvad olema tuntud tootjate analoogid.

##### BangGood ([banggood.com](https://www.banggood.com))

Nagu GearBestil, on ka BangGoodis peale paljude muude asjade droonide juppe müüa. Mõlemal on ka oma droonibränd.

