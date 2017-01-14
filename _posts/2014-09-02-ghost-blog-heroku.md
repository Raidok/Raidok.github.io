---
layout: post
title: Tasuta Ghost blogi hostimine Herokus
categories: postitused
tags: heroku nodejs cli
image: heroku.png
---
See blogi põhineb hetkel Jekyll staatilise blogi mootoril ja on hostitud GitHubis, kuid tavalisele blogijale käib selle kasutamine üle jõu. Sellepärast saigi vahepeal uuritud blogimootorit Ghost ja selle tasuta hostimise võimalusi ning dokumenteerisin nüüd hiljem ka selle käigu.

Eeldused:

* [Heroku](https://www.heroku.com) kasutaja olemasolu
* paigaldatud [Heroku Toolbelt](https://toolbelt.heroku.com)
* Heroku Toolbelti sisse logitud (`heroku login`)
* alla laetud ja lahti pakitud [Ghost](https://ghost.org/download) lähtekood
* git ja npm

Liigume käsurealt kausta, kuhu Ghost sai lahti pakitud ja loome Heroku äpi EU regiooni:

    heroku apps:create minu-ghost-blogi --region eu

Paigaldame kohalikuks katsetamiseks kõik sõltuvused:

    npm install



# Seadistamine

Muudame faili `config.example.js` nime ära, paneme talle nimeks lihtsalt `config.js` ja avame. Objekti `production` muudame selliseks:

    production: {
        url: 'http://minu-ghost-blogi.herokuapp.com',
        mail: {
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_USER, // mailgun username
                    pass: process.env.MAILGUN_PASSWORD  // mailgun password
                }
            }
        },
        database: {
            client: 'pg',
            connection: {
                host     : process.env.POSTGRES_HOST,
                user     : process.env.POSTGRES_USER,
                password : process.env.POSTGRES_PASSWORD,
                database : process.env.POSTGRES_DATABASE,
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: process.env.PORT
        },
        fileStorage: false
    },



## Seadistuste selgitused

### url

URL on vastavalt valitud nimele või kui on eraldi domeen registreeritud, tuleks sinna panna see (nt *minu-ghost-blogi.com*).

### mail

See on oluline selleks, et Ghost oskaks meiliteavitusi välja saata. Endale on armsaks saanud [Mailgun](http://www.mailgun.com) ja soovitan seda ka teistele. Kui Mailguni veebist domeen luua, antakse sealt SMTP login ja parool, mis tuleb Heroku keskkonnamuutujate kaudu paika panna. Konfifaili neid *hardcodeda* ei tasu. Keskkonnamuutujate seadistamine käiks antud juhul nii:

    heroku config:set MAILGUN_USER=postmaster@minu-ghost-blogi.com
    heroku config:set MAILGUN_PASSWORD=242efca428de9caf03cf3abc1343eef0

### database

Andmebaasi jaoks installime postgre andmebaasi kliendi:

    sudo npm install -g pg

Konfis tuleb andmebaasi klient samuti määrata `pg`. Andmebaasi võimekuse tekitamine käib järgnevalt:

    heroku addons:add heroku-postgresql

Mille peale teatab Heroku Toolbelt midagi analoogset (värv on erinev tõenäoliselt):

    Attached as HEROKU_POSTGRESQL_BROWN_URL

Selle sama nimega jooksutame järgmise käsud:

    heroku pg:promote HEROKU_POSTGRESQL_BROWN_URL
    heroku pg:credentials HEROKU_POSTGRESQL_BROWN_URL

Ja viimasest saame kõik andmebaasiühenduseks vajalikud andmed, mis määrame keskkonnamuutujate väärtusteks:

    heroku config:set POSTGRES_HOST=host
    heroku config:set POSTGRES_USER=user
    heroku config:set POSTGRES_PASSWORD=password
    heroku config:set POSTGRES_DATABASE=database

### server

Serveri blokk on täiesti Heroku-spetsiifiline ja peab olema täpselt selline, kus host on `0.0.0.0` ja port antakse automaatselt keskkonnamuutuja kaudu Heroku poolt ette.

### fileStorage

Failide üleslaadimise funktsionaalsus tasub Heroku puhul maha keerata, sest sealne failisüsteem on [efemeerne](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem) ehk lühiealine - kui dyno ennast välja lülitab, siis taaskäivitumisel taastub repost laetud seis. Pilte ja muid staatilisi andmeid saab kasvõi Dropboxi avalikust kataloogist linkida..



## Viimane lihv

Heroku jaoks on veel vajalik teha fail nimega `Procfile`, millel sisuks:

    web: node index.js --production

Ning kindluse mõttes tasub ka veel Node keskkond produktsiooniks muuta:

    heroku config:set NODE_ENV=production


# Publitseerimine

    git add -A
    git commit -m "minu ghost plogi esimene lüke"
    git push heroku master

Viimase käsuga ta buildib ja paneb rakenduse püsti, logisid saab hiljem sirvida käsuga `heroku logs`.

Viimaste seadistuste tegemiseks ja postituste kirjutamiseks tuleb nüüd minna adminpaneeli: [http://minu-ghost-blogi.herokuapp.com/ghost](http://minu-ghost-blogi.herokuapp.com/ghost)

# Veel viiteid

* [Konfide näidised](http://www.allaboutghost.com/example-config-js-heroku-postgres-database/)
* [Ghost Herokus + Mailgun](http://www.lionhack.com/2013/12/31/hosting-custom-domain-ghost-blog-on-heroku-for-free/)
* [StartSSL + Heroku](http://yonitech.wordpress.com/2013/01/01/startssl-certificate-with-a-heroku-app/)
* [Erinev esileht](https://github.com/hswolff/Ghost/commit/fd61b9ff2a7a94a5b79f6eedbe5aa7889305260e)
* [Teemade loomine](http://webdesign.tutsplus.com/articles/adding-ghost-template-tags-and-markup--webdesign-15803)
