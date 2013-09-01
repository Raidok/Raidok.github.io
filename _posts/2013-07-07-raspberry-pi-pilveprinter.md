---
layout: post
title: Raspberry Pi pilveprinter
categories: postitused
tags: raspi raspbian raspberry pi linux cups printer chrome chromium
---

Üks printer, palju arvuteid? Mõnikord tahaks nutitelefonist või tahvelarvutist ka printida? Seadistame vana printeri Raspberry Pi abil võrgu- ja pilveprinteriks!


## Ettevalmistused

Oletame, et SD-kaardile on laetud Raspbiani distributsioon. Avame aegsasti ssh ühenduse, mis võimaldab aknaid üle võrgu avada (-X lipuke) ja CUPS veebiliidest tunneldada (-L lipuke koos 3631:localhost:631 osaga):

    ssh pi@192.168.1.10 -X -L 3631:localhost:631

Alustuseks tuleb raspberryle installida vajalikud pakid - Chromium brauser ja CUPS-printserver. Viimane võtab eriti kaua aega, kuna installitakse meeletus koguses printerite drivereid ja muud rohkem või vähem vajalikku.

    sudo apt-get install chromium-browser cups

Väga oluline on lisada kasutaja "pi" gruppi "lpadmin", et oleks võimalik printeri seadistusi muuta:

    sudo adduser pi lpadmin

Kui ssh ühendusel sai loodud tunnel, siis tuleks praegu avada brauseriga aadress `localhost:3631`, vastasel juhul kirjutada raspberry käsureale:

    chromium-browser

Pisut tuleb varuda kannatust, sest brauser avatakse Pi peal, kohalik arvuti vaid kuvab seda. Raspberryst avatud brauseris tuleb avada aadress `localhost:631`.


## Printeri seadistamine

[![Printeri seadistamine 1](p-cups1.png)](cups1.png)

Valida ülevalt Administration ja klkkida nuppu "Add Printer" alajaotuses "Printers". Mingi hetk küsitakse ka kasutajanime ja parooli. Vaikimis on need vastavalt "pi" ja "raspberry".

[![Printeri seadistamine 2](p-cups2.png)](cups2.png)

Kui printer on külge ühendatud ja see on ära tuntud, peaks seda nüüd näha olema. Valime sobiva ja jätkame.

[![Printeri seadistamine 3](p-cups3.png)](cups3.png)

Paneme printerile nime ja jagame teda ka kohalikus võrgus.

[![Printeri seadistamine 4](p-cups4.png)](cups4.png)

Seniste sätete ülevaatamine ja driveri valimine.

[![Printeri seadistamine 5](p-cups5.png)](cups5.png)

Printimise vaikeseadete määramine.

[![Printeri seadistamine 6](p-cups6.png)](cups6.png)

Prindime testlehekülje, valime Maintenance -> Print Test Page. Töötas? Väga hea.

[![Printeri seadistamine 7](p-cups7.png)](cups7.png)

Et printer oleks võrgus ka kättesaadav, tuleb Administration lipiku alt panna linnuke valikule "Share printers connected to this system" ja vajutada nuppu "Change Settings". Seejärel peaks olema võrgus olevatest Unixilaadsetes ja Windowsi masinatest olema uus printer kättesaadav.

[![Printeri seadistamine 8](p-cups8.png)](cups8.png)


## Pilveprinteri seadistamine

Kui eelnevad seadistused said tehtud läbi tunneli kohalikus brauseris, siis nüüd tuleks kindlasti raspberryst brauser avada:

    chromium-browser

Avame Chromiumi seadistused, kerime lõppu ja vajutame "Show advanced settings...". Seejärel kerime veelkord lõppu ja klikime alajaotuses "Google Cloud Print" nupul "Add Printers".

[![Pilveprinteri seadistamine 1](p-pilveprinter1.png)](pilveprinter1.png)

Avaneb tuttav Google kontole sisselogimise aken, misjärel ilmub väike tutvustus ja nupp "Lisa printer(id)", klime sellel.

[![Pilveprinteri seadistamine 2](p-pilveprinter2.png)](pilveprinter2.png)

Ja ongi olemas!


## Kuidas neid vilju nüüd lõigata?

### Mobiilne printimine

Printimiseks Chrome(või Chromium) brauserist või Chrome-operatsioonisüsteemist on laiendus nimega [Print Using Google Cloud Print™](https://chrome.google.com/webstore/detail/print-using-google-cloud/ffaifmgpcdjedlffbhenaloimajbdkfg), kuid see ei tööta igal lehel. Printimise ikoon ilmub välja vaid mingeil teatud juhtudel.

[![Pilveprintimise laiend Chrome brauserile](p-google-cloud-print-laiend.png)](google-cloud-print-laiend.png)

Printimiseks Android-seadmelt on olemas äpp [Cloud Print](https://play.google.com/store/apps/details?id=com.google.android.apps.cloudprint)

[![Pilveprintimise äpp](p-google-cloud-print-app.png)](google-cloud-print-app.png)

### Kontvõrgust printimine

Teises kohalikus arvutis piisab vaid CUPS-veebiliideses valida Administration -> Find New Printers ning printer peaks kohe välja ilmuma. Klikime "Add This Printer". Pärast seda, nime jms määramine.

[![Võrguprinteri seadistamine 1](p-vorguprinter1.png)](vorguprinter1.png)
[![Võrguprinteri seadistamine 2](p-vorguprinter2.png)](vorguprinter2.png)

Käsitsi printeri tootja ja pärast printeri mudeli järgi draiveri valimine.

[![Võrguprinteri seadistamine 3](p-vorguprinter3.png)](vorguprinter3.png)
[![Võrguprinteri seadistamine 4](p-vorguprinter4.png)](vorguprinter4.png)

Printimise vaikeseaded, peale mida saame juba testlehe printida

[![Võrguprinteri seadistamine 5](p-vorguprinter5.png)](vorguprinter5.png)
[![Võrguprinteri seadistamine 6](p-vorguprinter6.png)](vorguprinter6.png)

Windowsi operatsioonisüsteemis peaks saama printeri lisada URL-i järgi, kirjutades selleks `http://raspi_ip_address:631/printers/printeri_nimi`. Peaks olema suhteliselt valutu protsess, ideepoolest. Ise pole veel proovinud.
