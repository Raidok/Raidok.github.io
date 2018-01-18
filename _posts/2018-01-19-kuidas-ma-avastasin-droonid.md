---
layout: post
title: Kuidas ma avastasin droonid
categories: postitused
tags: RC droon nelikopter 3D-printimine
image: drone.png
---
Igasugu kaugjuhitavad mänguasjad on mulle alati huvi pakkunud. Droonid on aga eriti huvitavad, sest erinevalt autodest, liiguvad need ka kolmandas mõõtmes. Mudellennukid ja -helikopterid on kergesti purunevad. Veel hiljuti arvasin sama ka droonide kohta. Olgugi, et nad on suhteliselt robustse ehitusega, siiski väga ei tundnud tõmmet osta tuhandeeurone droon, et see siis kuskile pihta puruks sõita. Eestis ilmselt varuosi ka neile laiatarbe toodetele suhteliselt raske leida. Siis aga tutvusin poolkogemata täiesti uue maailmaga - võidusõidudroonid.


### Kust see alguse sai

Olen nüüdseks juba peaaegu aasta tegelenud 3D-printimise ja modelleerimisega. Et uusi nippe õppida, jälgisin YouTubes [RCLifeOn](https://www.youtube.com/channel/UC873OURVczg_utAk8dXx_Uw) nimelist kanalit. Minu huvi drooninduse vastu vallandas tema video sellest, kuidas ta Thingiverse'ist leitud [Peon 230 nelikopteri raami](https://www.thingiverse.com/thing:629338) printis ja seda ringi lennutas.

<iframe width="560" height="315" src="https://www.youtube.com/embed/vjvlB7RjnYI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Tavaliselt ma ei ole esimene, kes uute asjadega kohe pardale hüppab aga peale selle video vaatamist teadsin kohe, et ma pean omale ka sellise tegema. Kulutasin kümneid tunde, et aru saada, mida täpselt on vaja, et ise sarnane asi valmis ehitada. **Aga ütlen kohe ära - alustavale droonihuvilisele 3D-prinditud raam ei sobi.**


### Minu esimene droon

![]({{site.url}}{{page.url}}/droon-v1.jpg)

Päris rõve näeb välja tegelt, endal ka veits häbi. Nii kiire on olnud, et isegi termokahanevat rüüži pole aega olnud kokku tõmmata (need kollased).

Aga see selleks, kui kedagi huvitab, siis jupid said valitud järgnevad:

* Mootorid (EMAX RS2205S). Sai valitud suhteliselt tulevikukindlad, et ikka piiavalt arenguruumi oleks. Ei kahetse.
* Propellerid (DALPROP 4045BN). Need sai meelega väiksemad pandud. Raam toetas kuni 5-tollised, pildil 4-tollistega. Muidu äkki on alguse kohta liiga äkiline.
* Mootorite elektroonilised kiiruskontrollerid ehk _ESC_'d (DYS XMS30A). On küll kollastes torudes ja näha pole aga sai ühed odavamapoolsed valitud. Tarkvara väidab, et on 20A aga ei ole veel tundnud, et nõrgaks oleks jäänud.
* Lennukontroller ehk _Flight Controller_ ehk _FC_ (SP Racing F3). Toimib küll.
* Vastuvõtja ehk _Receiver_ ehk _RX_. Kuna ma ostsin Flysky FS-i6 puldi, siis sellega tuli kaasa FS-IA6 vastuvõtja.
* Voolujaotusplaat ehk _Power Distribution Board_ ehk _PDB_ (mingi Matek'i koopia). Suht saast oli, lasi laua peal 2 korda "maagilise suitsu" välja. Esimene kord suri 5V regulaator ära, teine kord tekkis toitesiinide vahele lühis ja siis lendas see prügikasti ka. Õnneks oli voolupiirajaga labori toite taga, mitte aku. Sellepärast on pildil ka mingid lambi trükkplaati näha, see on eraldiseisev pingeregulaator FC ja RX-i toitmiseks.
* Aku (Turnigy nano-tech 2200mAh). Hea aku kuid mõttetult suur ja raske.


### Raami 3D-printimine

Tavaliselt kasutatakse 3D-printimiseks PLA-nimelist materjali, kuna see on suhteliselt odav ja sellega on lihtne printida - prindi ebaõnnestumise võimalus on kõige väiksem. Kehv on see, et see materjal on hästi jäik ja paindub väga vähe. Õigemini see murdub ennem praktsti pooleks kui hakkab painduma.

#### PLA

Selle raami puhul õnnestus natukene kehva nurga all maanduda ja juba oligi jälle üks käpp murdunud. Seda juhtus päris mitmeid kordi ja minutiga üks murda ja siis jälle 5 minutit uue vastu vahetamisele kulutada võib PLA puhul saada rutiiniks. Kusjuures, kui ma õigesti mäletan, siis ühe käpa printimine võttis ~50 minutit.

Kuna ka raami keskmine osa oli prinditud PLA'st, siis väga palju käppasid ma lõhkuda ei jõudnudki kui juba raami nurgad ära murdusid. Raske aku kõrgel postide otsas (mis olid samuti prinditud)

#### ABS

Kui oli selge, et PLA ei toida, hakkasin katsetama ABS'iga, sest seda oli mul olemas (samal ajal tellisin ära rulli PET-G filamenti). ABS kannatab deformeerimist pisut enam kui PLA, kuid mingist piirist edasi painutades lõpuks siiski murdub. Põhimõtteliselt sama käitumine nagu alumiiniumil.

ABS-is prinditud detailid oli veidi vastupidavamad, kuid siiski kulus ka neid nagu sooje saiu. Jäi vaid loota, et PET-G tuleb ja päästab päeva.

#### PET-G

Selgus, et tõepoolest on tegu ikka tunduvalt parema materjaliga kui eelnevad kaks. Printida on teda küll keerulisem, kuid retsimist ja painutusi kannatab ikka kordades paremini.

PET-G'st tehtud raamiga sai päris palju kordi lendamas käidud kuni ühel korral hakkas kostuma veidrat häält. Justkui midagi satuks iga paari sekundi tagant korraks propelleri vahele. Kontrollisin mitu korda üle, et mingeid juhtmeid ega rohukõrsi kuskil ei oleks, kuid ta tegi seda ikka. Lähemal vaatlusel selgus, et ühes käpas ja selle juures olevas nurgas olid väikesed praod. See tingis elle, et käpp sai edasi-tagasi liikuda, ja lasi propelleritel otsapidi kokku puutuda.

Siis oli selge, et ei aita siin miski muu kui tuleb ikka üks korralik raam ära osta.


### Mida oleks võinud teisiti teha

**Kaal.** Kohe algusest peale oleks võinud rohkem mõelda kaalu peale. Kergem droon lendab paremini ja kukub alla väiksema kiirusega, mis omakorda tähendab seda, et on väiksem võimalus midagi kukkumisega katki teha.

**Tugev ja robustne konstruktsioon.** Raami 3D-printimine on aja raiskamine. Drooni on küll tore kokku panna aga kui seda nii tihti tegema peab, muutub see tüütuks. Süsinikkiud ehk _carbon fibre_ on õige materjal drooni raami jaoks.

**Suurushullustus.** Ei ole mõtet osta suurt akut lootuses, et sellega saab kauem lennata. Ma suutsin drooni enne mitu korda puruks sõita kui esimene aku tühjaks sai.

**On head asjad ja on odavad.** Ei tasu otsida kust midagi võimalikult odavalt saaks. Kui asi tundub liiga odav, et tõsi olla, siis ta tõenäoliselt seda ka on. Droonide puhul on mängus väga suured voolud, ja elekterist võib väga kergelt tulekahju alguse saada. Seega kvaliteetsed komponendid on väga olulised.


### Mida soovitaks teistelegi

**Proovi simulaatorit.** Tegelt võiks seda proovida üldse esimese asjana, et kas oled valmis seda väljakutset vastu võtma. Drooni lennutamine ei ole lihtne! Seda ei õpi selgeks 2 ega ka mitte 20 tunniga. Isiklikult soovitaks kõigepealt vähemalt 10 tundi simulaatorit mängida enne kui päris drooniga lendama minna.

**Tee palju uurimustööd.** See ala ei ole väga vana, kõigest mõned aastad. Selle ajaga on väga palju muutunud ja mõni 2 aastat tagasi kirjutatud artikkel ei pruugi tänasel päeval enam pädeda. Uuri erinevaid allikaid ja kui on tuttavaid, kes selle alaga kokku puutunud on, siis tüüta neid.

**Tee palju vigu.** Öeldakse, et vigadest õpitakse aga kelle vigadest ikka paremini õppida kui enda omadest. Teiste vigade üle on lihtsalt hea naerda.
