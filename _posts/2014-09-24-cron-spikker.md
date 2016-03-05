---
layout: post
title: CRON spikker
categories: postitused
tags: linux
image: linux.png
---
CRON on tööriist, millega saab protsesse ajakava järgi jooksutada. Üldine teooria on hästi seletatud [Wikipedias](http://en.wikipedia.org/wiki/Cron), aga teen siia lühikokkuvõtte.

# Teooria

<pre style="line-height: 15px">* * * * * käsk mida jooksutatakse
│ │ │ │ │
│ │ │ │ │
│ │ │ │ └─── nädalapäev (0 - 7) (0 ja 7 on pühapäev, 1 on esmaspäev, 6 on laupäev jne)
│ │ │ └─── kuu (1 - 12)
│ │ └─── kuupäev (1 - 31)
│ └─── tunnid (0 - 23)
└─── minutid (0 - 59)
</pre>


# Tagavara koopiad

Alati tasub igaks juhuks tagavarakoopia teha:

    crontab -l > ~/crontab.bak

Siis saab alati kergelt taastada:

    crontab ~/crontab.bak

Sest mõnikord võib `-e` parameetri asemel kogemata `-r` minna ja see teeb lehe ilma igasuguste hoiatustega puhtaks.


# Paaris ja paaritutel minutitel jooksutamine

    1-59/2 * * * * /home/skript/mis-jookseb/paaritutel-minutitel
    0-58/2 * * * * /home/skript/mis-jookseb/paaris-minutitel
    */2 * * * * /home/skript/mis-jookseb/ka/paaris-minutitel

Analoogselt saab ka tunde, minuteid jne seada, näiteks:

    * 6-18/2 * * * /home/skript/mis-jookseb/igal-minutil/kuuest-kuueni-päeval/paaris-tundidel

