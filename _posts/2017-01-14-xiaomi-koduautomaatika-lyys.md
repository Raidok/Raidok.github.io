---
layout: post
title: Xiaomi koduautomaatika lüüs
categories: postitused
tags: raspberry-pi linux cli homebridge nodejs xiaomi koduautomaatika
image: xiaomihome.png
---
Xiaomi on mulle aina enam sümpatiseerima hakanud oma kenade ja minimalistlike toodetega. Nende [_Smart Home Gateway_](http://xiaomi-mi.com/smart-home/xiaomi-mi-smart-home-kit/) ei ole erand. Seadmete seadistamiseks, juhtimiseks ja näitude jälgimiseks on tehtud äpid nii Androidile kui iOS'ile, kuid need on suures osas hiinakeelsed ja täis vigu, seega oli vaja leida mingi muu lahendus nende edevate vidinate kasutamiseks.



![](xiaomi-gateway-in-box.jpg)



Kuigi sellesse seeriasse kuuluvaid seadmeid on võimalik ka eraldi osta, koosneb pildil olevasse põhikomplekt järgmistest komponentidest:


#### Peaseade

Tagumisel küljel on tal Hiina-tüüpi pistikupesa. Internetti ühendub wifi abil, anduritega suhtleb üle ebastandardse ZigBee protokolli.

![](gateway.jpg)


#### Ukse-akna magnetandur

Koosneb kahest osast, üks on andur ise ja teine on magnet.

![](contact.jpg)


#### Liikumisandur

Passiivne infrapunaandur, mis on üllatavalt tundlik. 2,5 meetri kõrgusele seina külge kinnitatuna märkab isegi kui koer või kass mööda jalutavad.

![](motion.jpg)


#### Juhtmevaba nupp

Tervenisti üks nupp, mille peale saab äpis mingeid tegevusi käivitada.

![](button.jpg)


Lisaks on võimalik peaseadmega ühendada veel selliseid andureid-käitureid, mida saab eraldi osta:

#### Temperatuuri-õhuniiskuse andur

Mõõdab temperatuuri ja õhuniiskust 0,1 ühikulise eraldusvõimega.

![](temp.jpg)


#### Pistikupesa adapter

Käib pistikupessa tarbija vahele ja saab äpist või mingite sündmuste-tegevuste peale sisse-välja lülitada.

![](plug.jpg)


#### Erinevad seinalülitid

Erinevad tüüpi lülitid.

![](wall.jpg)



# Alternatiivid äpile

Osadel kodanikel on õnnestunud andureid ilma keskseadmetea [SmartThingsi külge ühendada](https://community.smartthings.com/t/9-zigbee-xiaomi-door-window-sensors-works-for-some-people/28607/58), kuid see suhtlus pole vist kõige usaldusväärsem. Pealegi on see mingisugune kahtlane suletud platvorm, seega sellele ma kauem keskenduda ei kavatse.

Õnneks on Xiaomi olnud nii tublid, et on _Gateway'le_ teinud API, mille kaudu saab süsteemiga üle kohaliku võrgu ka suhelda, jättes nende enda pilveteenuse praktiliselt mängust välja. API kirjeldus asub (louisZL/lumi-gateway-local-api)[https://github.com/louisZL/lumi-gateway-local-api] repos, selle [võimaluse sisselülitamise algne juhtend Xiaomi foorumis](http://bbs.xiaomi.cn/t-13198850) aga teen sellest oma uuendatud ja lihtsustatud versiooni ka siia.


### Kohaliku võrgu API sisselülitamine

Selleks, et kolmanda osapoole tarkvata kasutada saaks, on kõigepealt vaja see API sisse lülitada.

Näide on läbi tehtud iOS 10.2 ja Xiaomi Home 3.8.1 versioonidega. On teada ja olen omal nahal kogenud, et Androidi äpp on mõnevõrra stabiilsem.

Avame äpi, mis näeb välja selline:

![](app_main.png)

Valime seadmete seast _Gateway_, et avada seda süsteemi puudutavad alam-menüüd.

![](app_gateway.png)

Avame kolme-täpi-nupust lisavalikud ja valime "About".

![](app_gateway_menu.png)

Seejärel avaneb taoline vaade, kus tuleb lehe tühjas (alumises osas) 5 korda toksata, et välja tuua 3 peidetud menüüpunkti.

![](app_gateway_about.png)

Välja ilmuvad 3 hiinakeelset menüüpunkti, millest esimene näitab lihtsalt äpi versiooni (3.8.1, aga ma ei tea, mis see 3.1.1 seal on), teine on lokaalse API sisselülitamise menüüpunkt ja kolmandast näeb infot _Gateway_ enda ja tema külge ühendatud seadmete kohta. Valime hiinakeelsetest keskmise, et edasi liikuda.

![](app_gateway_about_dev.png)

Siin kohal saan mina iOS äpis viga "retrieve failed", mis vaid vahel harva ette ei tule, kui ma korduvalt äpi App Switcherist kinni panen ja uuesti siia menüüsse rändan. Siin tuleb nii kaua uuesti ja uuesti proovida, kuni viga enam ei tule või siis proovida Androidi äppi.

![](app_gateway_dev_enable_error.png)

Kui see leht lõpuks avaneb, tulleb lüliti sisse lülitada (roheliseks), mille peale peaks teisele reale tekkima salasõna (pildil kaetud punasega). Kopeeri see kuskile kõrvale või kirjuta üles, seda läheb pärast vaja. Vajutame confirm ja liigume tagasi eelmisesse menüüsse, kust nüüd valime viimase hiinakeelse menüüpunkti.

![](app_gateway_dev_enable.png)

See viib lehele, kus on hulk mingeid JSON-laadseid andmestruktuure. Sealt huvitab meid "mac" väärtus, mida läheb ka hiljem vaja (pildil punasega kaetud). Sellega tasub olla tähelepanelik, sest seal on ka muid MAC-aadresse. Halliga katsin ära read, mis otseselt või kaudselt mu wifi AP-ga seotud on ja ei puutu siin asjasse.

![](app_gateway_dev_info.png)

Nüüd võibki hakata alternatiivtarkvarasid katsetama, millest esimene on HomeBridge.



### HomeBridge

[HomeBridge](https://github.com/nfarina/homebridge) on loodud erinevate automaatikaseadmete-süsteemide sidumiseks Apple HomeKit-ga kuniks tootjad ise enda tooted sellega ühilduma saavad, kui see üldse kunagi juhtuma peaks. [HomeBridge'le on saadaval meeletus koguses laiendusi](https://www.npmjs.com/search?q=homebridge-plugin), see tarkvara üksi ilma nendeta suurt midagi ei teegi. Üks neist laiendustest on [homebridge-aqara](https://github.com/snOOrz/homebridge-aqara) (Aqara on selle _Gateway_ toote koodnimi või midagi..)

Peale [node.js installimist](/postitused/node-js-raspberry-pi/) ja viimase LTS (peab olema vähemalt v6.0.0) versiooni paigaldust jätkasin [HomeBridge ülesseadmisega Rasbperry Pi-le](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi), mis lühidalt näeb välja selline:

    sudo apt-get install git make g++
    sudo npm install -g --unsafe-perm homebridge hap-nodejs node-gyp
    cd /usr/local/lib/node_modules/homebridge/
    sudo npm install --unsafe-perm bignum
    cd /usr/local/lib/node_modules/hap-nodejs/node_modules/mdns
    sudo node-gyp BUILDTYPE=Release rebuild

Alustamiseks paneme HomeBridge korra käima:

    homebridge

Kui mingeid väga suuri vigu ei tulnud ja ta ise kinni ei läinud, siis lõpetame ta piinad ise CTRL+C vajutamisega.

Kopeerime nüüd seadistuste näidisfaili õigesse kohta.

    cp /usr/local/lib/node_modules/homebridge/config-sample.json ~/.homebridge/config.json

Avame, et teha mõningad muudatused:

    nano ~/.homebridge/config.json

Esimeses blokis võib asju muuta oma suva järgi, teise bloki sisu tuleb täita _Gateway_ MAC-aadressi(peab olema ilma kooloniteta ja väikeste tähtedega) ning parooliga, mis sai varem äpist vaadatud ja üles kirjutatud.

    {
      "bridge": {
            "name": "Homebridge",
            "username": "CC:22:33:44:CE:FF",
            "port": 51826,
            "pin": "031-45-154"
        },
        
        "platforms": [
        {
            "platform": "AqaraPlatform",
            "sid": ["f0b428cbec69"],
            "password": ["af434e1a55fc32ab"]
        }]
    }

Nüüd või HomeBridge uuesti käima panna ja proovida teda Home äpist leida, siduda ja kasutama hakata.


### Mis edasi?

Edasi on plaanis uurida, kas on olemas ja mis seisus on laiendused [Home Assistant'ile](https://home-assistant.io/) või [Node-RED'ile](http://nodered.org/).
