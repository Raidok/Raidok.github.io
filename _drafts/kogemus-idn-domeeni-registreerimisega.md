---
layout: post
title: Kogemus IDN-tüüpi domeeni registreerimisega
categories: postitused
tags: www linux
image: 
---
IDN ehk Internationalized Domain Name on selline domeeninimi, mis sisaldab vähemalt ühte mitte-ASCII tähemärki. Praegu on sellise aadressi kasutuselevõtt veel suhteliselt kohmakas tegevus. Kirjeldangi selle postitusega, mida ja kuidas ma selleks tegin.



# Domeeni registreerimine

IDN-tüüpi domeeni registreerimisel tuleb arvestada topelt aastatasuga, kuna ära tuleks registreerida nii täpitähtedega kui ka ilma nendeta versioon. Üheks põhjuseks on see, et inimesed pole veel päris harjunud selliste domeeninimedega, mis täpitähti sisaldavad ja võivad automaatselt ilma täppideta alternatiivi aadressiribale sisestada. Teine põhjus on see, et kõik tarkvara ei pruugi veel selliseid aadresse toetada. Brauseritega seda probleemi enam olla ei tohiks, e-maili klientidega aga küll.

Kui nüüd registreerimisest endast rääkida, siis ise olen selleks kasutanud [veebimajutus.ee](https://www.veebimajutus.ee/) teenuseid. Domeen aktiveerub mõne minuti jooksul ja seda ööpäevaringselt.



# E-maili vastuvõtmine

Selleks on kõige lihtsam viis, mis ma leidnud olen, registreerida [mailgun](https://mailgun.com) konto, lisada sinna oma domeen või domeenid, järgida juhiseid, et mis DNS-kirjed lisada vaja on ja siis tekitada näiteks catch_all route, mis *@minudomeen.ee aadressidele tulevad meilid näiteks gmaili aadressile edasi suunab.



# E-maili saatmine

Eelmises punktis sai seletatud, kuidas emailid Gmaili jõuaksid. Kui nüüd peaks olema vajadus sinna jõudnud emailidele vastata, tuleb minna [http://mail.google.com/mail/#settings/accounts](Gmaili kontode seadistamise lehele). Juhul, kui oled juba Inboxi kasutama asunud ja see Gmaili link automaatselt sind ära suunab, siis tuleb see funktsioon Inboxi seadistustest käsitsi maha keerata:

![Inboxi seadistused](inbox-settings.png)

Kliki "Send mail as" all "Add another email address you own" peal.

Esimesel vormil palutakse sisestada oma meilidega kaasa minev nimi ja seadistatav e-posti aadress.

Teisel vormil tuleb sai vanasti valida automaatsed Google SMTP seadistused, nüüd on see võimalus ära võetud, kuid käsitsi saab tekitada samasuguse olukorra:

SMTP Server: smtp.gmail.com
Username: oma Google/Gmaili kasutajanimi koos @gmail.com lõpuga
Password: **genereeri** [Google rakendusepõhine salasõna](https://security.google.com/settings/security/apppasswords)

![Google SMTP-seadistused](google-smtp.png)

Kolmandal vormil palutakse sisestada kinnituskood, mis tuleb gmaili aadressile. Peale kinnitamist saadki juba emaile seadistatud aadressi alt Gmailist välja saata!






Allikad:

* [Add new alias to Gmail without SMTP (forwarding-only address)](http://webapps.stackexchange.com/a/72975/129033)



