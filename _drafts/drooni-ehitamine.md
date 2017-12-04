---
layout: post
title: Alustava drooniehitaja meelespea
categories: postitused
tags: droonid
image:
---


Drooniehtaja kannatused

1. FC, PDB, ESC, BEC, OSD, TX, RX, VTX - mis need veel on!?
2. Kus droonide komponente müüakse?

* Jootekolb on su sõber
* Ära eelda, et kõik "lihtsalt töötab"
* Kruvid kinni, nipukad pingule
* Kes kannatab, see kaua elab
* Elementaarne, Watson



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

Lõppes see sellega, et lõikasin kõik juhtmed läbi ja jootsin juhtmed ilma PDB-ta kokku, toimis päris hästi kuni uue ja korralikuma toote ühest Eesti poest kätte sain. See juhtus reede õhtul ja ei jaksanud tervet nädalavahetust oodata. :)




### Kruvid kinni, nipukad pingule

Üks nõuanne, mis venitab küll ettevalmistuste aega mõnevõrra pikemaks, kuid võib ka lennuaega oluliselt pikendada - mitte midagi ei tohi kuskil logisema ega rippuma jääda.

Kord mul õnnestus näiteks värskelt paigaldatud vastuvõtja üks antennijuhtmetest praktiliselt pooleks lõigata, sest sellel oli väike lõtk sees ja vajus lennu ajal propellerile ette.

Veendu alati enne lendama minemist, et raam oleks ühes tükis, mootorid oleks kõvasti kinni, et propellerid "mootorikellade" peal ringi ei käiks, et ükski juhe kuskilt vahelt välja ei kukuks ja raputades midagi kuskil ei koliseks.


### Kes kannatab, see kaua elab

Kui oled jälle õhtu otsa drooni kallal vaeva näinud ja saanud ta jälle lennukõlbulikuks, siis ei tasu kohe pimedas seda proovima minna. Esimestel nädalatel õnnestus mul korduvalt seda viga teha.




### Elementaarne, Watson

Enne lennu alustamist ja kindlasti peale mõnda raskemat maandumist veendu, et midagi kuskil ei logiseks ja elementaarsed osad droonil veel küljes oleksid.

Nii mul õnnestus näiteks VTX-i antenn koos pesaga plaadi küljest lahti murda. Kuna ta oli veel musta värvi ka, siis oli teda päris raske pimedas üles leida.



##### Palju kasulikku lugemist leiab:

* https://www.propwashed.com/



* https://oscarliang.com/zmr180-mini-quad-frame-review/
* https://www.rcgroups.com/forums/showthread.php?2731253-NightHawk-Pro-170-w-RacerStar-2204-2300KV-iRange-RX800-HobbyMate-5-in-1-PDB
* http://blog.dronetrest.com/tips-for-powering-your-flight-controller/

* [Top 10 things I wish I'd paid attention to when getting started in FPV](https://www.rcgroups.com/forums/showthread.php?1567954-Top-10-things-I-wish-I-d-paid-attention-to-when-getting-started-in-FPV)
