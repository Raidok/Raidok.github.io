---
layout: post
title: KingKong/LDARC Tiny6 droon ja selle tuunimine
categories: postitused
tags: RC droon
image: drone.png
---
Kuna meil siin Eestis on kolm aastaaega, kui pidevalt on ilm märg või külm, siis on äärmiselt ebamugav drooni lennutamas käia. Õnneks on olemas mikrodroonid, levinud on ka nimetus *Tiny Whoop*. Nad on väiksed, kõigest peopesa suurused, ning kerged ja neil on propellerikaitsmed, et näiteks seinad või siis pehmemad sihtmärgid (khm, inimesed) väga viga ei saaks, kui neile pihta lennata. Enamasti on neil harjadega mootorid, kuid ka harjadeta mootoritega mikrodroonid hakkavad järjest popimaks ja taskukohasemaks muutuma.

{% include image.html file="KINGKONG-TINY6.jpeg" alt="KINGKONG TINY6" align="right" style="max-width: 300px" %}

Omale ostsin sellise drooni nagu [KingKong (uue nimega LDARC) Tiny6 (AliExpress)](https://www.aliexpress.com/item/KINGKONG-TINY6-65mm-Micro-FPV-Quacopter-RC-Drones-With-615-Brushed-Motors-Baced-on-F3-Brush/32827737569.html). Valisin **Advanced FLYSKY** komplekti, sest sellega tuleb päris palju varuosi kaasa ning sisaldab FlySky vastuvõtjat sest mul on FlySky FS-I6 saatja endal juba olemas. Ostu hetkel 6. jaanuaril 2018 oli selle komplekti hind 67,25€.

Müüakse ka RTF ehk *Ready To Fly* komplekte, kus on ka pult kaasas aga sellel puuduvad igasugu ägedad seadistusvõimalused ning ei saa mitme vastuvõtjaga korraga seotud olla. FlySky FS-I6 saatjat müüakse mõnel pool ~35€ seega tasub kindlasti investeeringut ära.

Aitab drooni tutvustamisest, pealkirjas oli juttu ka tuunimisest. Seda võib mõista kahte pidi. Ühest küljest mõtlesin sellega on füüsilist tuunimist, näiteks kui vahetatakse propellerid, mootorid või mõni muu detail välja. Olgu see siis lihtsalt seetõttu, et midagi läks katki või tahtmisest midagi paremaks teha (mis katab ka eelmise keisi, sest terve detail on parem kui katkine).

Teisest küljest on droonidel ka tarkvaraline tuunimine. Kes on suuremate droonidega kokku puutunud, ilmselt teab, et neil on võimalik igal liikumisteljel (*Yaw - Pitch - Roll*) seadistada kolme põhilist väärtust (nimetatakse PID'ideks), et droon õhus stabiilsem oleks ja paremini lendaks. Üldiselt sellistel väikestel peopesasuurustel droonidel, mis lastele jõulukinkideks ostetakse, sellist võimalust pole, kuid tõsisematel, nagu näiteks sellel samal Tiny6 droonil on see võimalus olemas, sest ta jooksutab Betaflight tarkvara.

Üldjuhul on tänapäevased lennukontrollerid ja nende andurid ning drooni üldine koostekvaliteet juba piisavalt head, et seda tarkvaralist tuunimist just tingimata teha vaja pole, kuid siin tulevad mängu isiklikud eelistused ja sõidumugavus. Algselt karbist välja võttes lasi minu droon ennast näiteks vastu seina põrgates liiga palju mõjutada ning kukkus üsna lihtsalt alla. Tegin mõned ringid PID-parameetreid ühele ja teisele poole nihutades proovilende ja sain drooni oluliselt paremini lendama.



## Tuuningud, mida juba teinud olen

### Toitejuhtme välja vahetamine

Drooni küljes ripub karbist välja võttes väga peenikeste juhtmete otsas kleenuke JST-PH 1.25 tüüpi pesa. Esimeste kasutuskordadega suutsin ühe plussklemmi lukusti ära lõhkuda nii, et see kippus akut külge ühendades pesast välja tulema ning sama juhtme varjestus läks ka päris ruttu katki. Paari nädala pärast hakkas kogu pesa silmnähtavalt pruuniks tõmbuma ja oli alati peale lendu väga tuline (siin on vist mingi seos). Samas ei tundunud droonil enam kõrgustesse ronimiseks nii palju jõudu olevat kui tal alguses oli. Kahtlustasin juba mootoreid, kuna olen kuulnud, et harjadega mootorid eluaegsed pole, pealegi pöörlevad nad ligi 60 000 korda minutis.

Siis leidsin, et olen kunagi hiinast ühe peotäie neid pesasid-pistikuid tellinud, kus juhtmedki juba küljes. Pealegi paistavad need natukene robustsemad ja juhtmedki näevad pisut jämedamad välja. Keerasin siis kaane maha jootsin vana juhtme küljest lahti ja panin sama pikkusega ja uue pesaga juhtme asemele.

Selgus, et see lahendas kõik probleemid. Droon oleks nagu uuesti sündinud. Ma arvan, et ma ei valeta kui ta lendas paremini kui karbist välja võttes.

Tegelikult on igal ühenduspesal ette nähtud mingi teatud arv kokku ja lahku ühendamise kordi. Akudel täitub see üsna aeglaselt kui neid on 5 tükki, kuid drooni pesa ühenduste arv kasvab 5 korda kiiremini. Kui droon igapäevaselt vatti saab, siis on arvatavasti mõistlik igakuiselt või vähemalt kord paari kuu tagant ka seda pesa vahetada.

Olen kuulnud, et see pesa on tegelikult paras pudelikael ja veel suuremate võimsuste saavutamiseks tuleks kasutada hoopis JST-PH 2.0 pesa. See aga tähendab seda, et tuleb ka kõikide akude pistikud ära vahetada. Eks ma tulevikus proovin selle kindlasti ära kui võimsamad mootorid ostetud saab.


### PPM-signaali asemel IBUS-i kasutuselevõtt

FlySky vastuvõtjaga droonikomplektil on vastuvõtja mudeliks FS-RX2A või selle analoog. Sellel on 2 signaaliväljundut - PPM (analoog) ja IBUS (digitaal). Antud droonil on juhe küljes PPM-klemmil ja IBUS on vaba. Drooni lennukontrolleri küljes on selle juhtme teine ots ka loomulikult PPM klemmi külge joodetud, kuid põnev on see, et seal on ka üks täiesti vaba RX klemm. IBUS, SBUS ja muud taolised digiprotokollid ei ole tegelikult muud kui jadasignaal, mida see RX-klemm hea meelega sööma peaks.

Alguses jootsin prooviks ühe juhtme kõrvale, vastuvõtja poolt siis IBUS klemmile ja lennukontrolleri poolt RX klemmile. Võtsin lahti *Betaflight Configuratori*, kus *Ports* lehel lülitasin UART2 real sisse *Serial RX* (*Save and Reboot*) ning *Configutation* lehel valisin *Receiver* alajaotusest *Serial-based receiver* ning IBUS (*Save and Reboot*). Lülitasin saatja (puldi) sisse, proovisin *armida* ja tuled vilkusid - järelikult töötab! Ilma akuta mootorid pöörlema ei hakka aga kõik muu USB-toitega töötab, isegi kaamera ja videosaatja.

Kas sellest nüüd midagi paremaks läks, raske öelda. Tundus küll, et läks veidi stabiilsemaks ja täpsemaks aga see võis ka vabalt olla platseeboefekt. Alguses jätsin veel vana juhtme ka alles, et äkki hiljem viitsin veel ümber lülitada ja proovida. Hiljem aga juhtus hoopis see, et võtsin lisajuhtme ära ja jootsin olemasoleva juhtme mõlemad otsad uue digiklemmide peale, sest originaaljuhtmed olid natukene peenemad ja paindusid korpuse sisse paremini.


### Sõidusuuna muutmine

Üsna tüütu on see, et suuremate laupkokkupõrgete tagajärjel ei takista miski akul pesast välja libisemast. See on lihtsalt selle raami omapära, mis vist teistel analoogidel nii põletav probleem pole (näiteks Eachine E010). Tavaliselt lendab äkilisemate löökide korral aku ühes suunas, must kork aku tagant teises suunas ja droon ise kolmandas, lisaks saab akujuhe mõttetult venitada ja pesa veel rohkem kahjustada kui ta niigi on. Ühel akul murdis ka selle klemmi pooleks, mis aku seest välja tuleb ja ära murdus just see osa, kuhu pistiku taga olev juhtmejupp joodetud on. Sinna on mingisugune plekitükike peale keevitatud, mis tina külge võtab. See toores materjal, mis aku "naha" vahelt välja tuleb, tina ühtegi trikiga külge võtta ei taha ehk siis selle akuga pole enam midagi teha.

Lahenduse sellele probleemile leidsin mingist Inductrix mikrodrooni videost. Enamus teistel seda mõõtu droonidel on aku praktiliselt ruudukujuline aga mis mulle silma jäi oli see, et aku juhe tuli küljelt välja, mitte tagant. Ehk siis aku on drooni all risti sõidusuunaga. Kuna enamus liikumine ning seega ka kokkupõrked toimuvad otsesuunas, siis see on geniaalne lahendus!

Pealtnäha tundus see olevat lihtne häkk - kaameraga kate 90 kraadi keerata ja tarkvaras "Yaw Degrees" väärtust vastavalt ümber sättida. Suurel droonil mul on lennukontroller 90 kraadi võrra prööratud, et USB-pesa küljel asuks, mitte taga, seega kui keeruline seda väikse puhul siis ikka teha on.

Lisaks sellele *Yaw* telje pööramisele oli tegelt paar asja veel teha vaja. Näiteks oli vaja mootorid Betaflight CLI kaudu ümber mäppida, sest nad olid kõik 90 kraadi võrra nihkes. Peale seda selgus, et droon ei ürita ennast õhku tõsta vaid surub vastu maad. Need pisikesed harjadega mootorid on loodud ainult ühte pidi ringi käima, mis tähendas, et need oli vaja ka füüsiliselt ümber tõsta.

Vahepeal olin ka "Motor direction is reversed" sisse lülitada. Kui mootorid ja propellerid kõik õigesti peale said siis sellega juhtus see, et droon tõusis küll õhku aga ta pöörles ja polnud loomulikult ka juhitav. Ilmselt ajas see tal sassi, sest mootorid käisid ikka ringi nii nagu nad loodud olid, kuid lennukontroller eeldas teisiti ja see ajas tal pea sassi.

Lõpptulemus näeb küll natukene veider ja harjumatu välja, kuid akud on nüüd kindlasti rõõmsamad, et neid enam nii tihti ja nii järsku drooni küljest lahti ei rebita.



## Tuuninguid tulevikus

### **Mootorite vahetamine**

{% include image.html file="Racerstar-615-67000RPM.jpeg" alt="Racerstar 615 67000RPM" align="right" style="max-width: 300px" %}

Kuna harjadega mootorid nagunii kuluvad, siis peaks juba varuks ära ostma. Näiteks müüakse ilusaid lillasid [Racerstar 615 67000rpm mootoreid](https://www.aliexpress.com/item/4PCS-Racerstar-615-6x15mm-67000RPM-Coreless-Motor-for-Eachine-E010-E010C-E010S-RC-Mini-Drones-Quadcopter/32825188128.html), mis on natukene ägedamad kui originaalid (originaalid peaksid olema ~55000rpm). Oluline on lihtsalt jälgida, et mõõt oleks õige. 615 või 0615 tähendab seda, et mootori läbimõõt on 6mm ja pikkus 15mm.


### OSD

OSD ehk *On Screen Display* võimekuse tekitamine. See on küll rohkem uhkeldamise asi aga [Micro MinimOSD](https://www.aliexpress.com/item/MICRO-MINIMOSD-Minim-OSD-Mini-OSD-W-KV-TEAM-MOD-For-APM-PIXHAWK-Naze32/32831811021.html) peaks sinna kesta sisse ära mahtuma küll. Ainukene asi, mis seda õigustaks vist oleks see, et siis säästaks natukene akusid kui näeks pinget videopildist ja väldiks nende kogemata viimase piirini tühjaks kasutamist. Teisest küljest raiskaks energiat lisakaalu õhus hoidmise peale..


