---
layout: default
title: Androidi rootimine ja uue tarkvara installimine Samsung Galaxy Ace näitel
categories: postitused
tags: android samsung galaxy ace GT-S5830
image: cyanogenmod.png
---
Rootisin just ühe Android telefoni ja mõtlesin, et kirjutaks selle siia üles, sest jäin tulemusega igati rahule. Tegemist on Samsung Galaxy Ace GT-S5830 nutitelefoniga aastast 2011 ja jooksutas Androidi versiooni 2.3.3.


## Andmetest varukoopiate tegemine

**1. variant: Helium - App Sync and Backup:**

See variant on üsna lihtne, sest ei vaja telefoni rootimist. Lae alla [Google Play poest](https://play.google.com/store/apps/details?id=com.koushikdutta.backup&hl=et) ja tee oma äppide andmetest varukoopia.

**2. variant: Titanium Backup ★ root**

See variant on veidi keerulisem, sest nõuab rootimist. Äpp ise on ka pisut keerulisema üleehitusega, kuid võimekam. Lae alla [Google Play poest](https://play.google.com/store/apps/details?id=com.keramidas.TitaniumBackup&hl=et).


## Rootimine (vajadusel)

* Tõmba [rootimisarhiiv xda-developers foorumiteemast](http://forum.xda-developers.com/showthread.php?t=2161215) või [otselingina siit](http://www.yourfilelink.com/get.php?fid=832963) ning paiguta see mälukaardi juurkausta.
* Kindluse mõttes võib kontrollida `md5sum` tulemust allalaetud faili peal, minul on see `8f2208fc6fb415fcadc0b875858aff18`
* Sisse tuleb lülitada USB-silumine. Selleks liigu asukohta ja märgi linnuke `Settings > Application > Development > Enable USB Debugging` või eestikeeli `Seaded > Rakendused > Arendus > USB silumine`
* Lülita telefon välja
* Vajuta alla nupud HOME ja POWER aga lase POWER nupp lahti kohe kui taustavalgus süttib ja kiri "samsung" ette tuleb
* Ette ilmub menüü, kus navigeerimine toimub järgmiselt: volüümiklahvidega saab liikuda, HOME nupuga teha valiku ja POWER nupuga liikuda tagasi eelmisesse menüüsse. Vali sealt menüüst `apply update from sdcard`, seejärel vali `upd_1.zip`
* Kui telefon on teatanud, et paigaldus on lõppenud, liigu tagasi ja vali `reboot system now`


## ClockworkModi ja uue tarkvara paigaldamine

* Lae alla [Clockwork 5.0.2.6](http://d-h.st/bBA) ja paiguta see SD-kaardi juurkausta. Faili `md5sum` on `ba3d09df567757081da5dd6e8fb2d0b0`
* Lae alla [CyanogenMod 10.1 for Galaxy Ace xda-developers foorumist](http://forum.xda-developers.com/showthread.php?t=2199575). Mina võtsin RC4 versiooni ja selle `md5sum` on `fcdd17ad7808dd8c2f817cbe6b6dfd25`
* Vajuta alla nupud HOME ja POWER aga lase POWER nupp lahti kohe kui taustavalgus süttib ja kiri "samsung" ette tuleb
* Vali menüüst `apply update from sdcard`, seejärel `Recovery-Clockwork-5.0.2.6-Galaxy Ace.Zip`
* Kui telefon on teatanud, et paigaldus on lõppenud, liigu tagasi ja vali `reboot system now`
* Hoia all HOME nuppu kuni ette tuleb sarnane menüü eelmisele, kuid seekord juba CWM oma
* Varukoopia tegemiseks praegusest ROMist vali `backup and restore > backup`
* Uue tarkvara paigaldamiseks vali kõigepealt `wiped data/factory reset` ja seejärel `mounts and storage > format /system` ning siis `install zip from sdcard > cm-10.1.0-RC4-GT-S5830-cooper.zip`
* Kui telefon on teatanud, et paigaldus on lõppenud, liigu tagasi ja vali `reboot system now`
* Istalli uuesti eespool valitud varukoopiate äpp ja naudi uut Androidi!


## Vana tarkvara taastamine
* Tee telefonile restart ja hoia all HOME nuppu
* vali `wiped data/factory reset`, seejärel `mounts and storage > format /system` ja siis `backup and restore > restore`


## Kontaktide taastamine

Android hoiab kontakte failis `contacts2.db`, mis on SQLite3 andmebaas. Kuna ma unustasin kontaktidest varukoopia teha ja Google kontoga nad sünkroonitud polnud, leidsin skripti [dump-contacts2db](https://github.com/stachre/dump-contacts2db), mis teisendab lihtsa vaevaga kontaktide andmebaasi vcf-visiitkaartide formaati.


