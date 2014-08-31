---
layout: post
title: Ghost blogi Herokus
categories: postitused
tags: 
image: heroku.png
---


    heroku login


    npm install pg --save

Muudame faili `config.example.js` faili nime ära, paneme talle nimeks lihtsalt `config.js` ja avame. Objekti `production` muutsin ma järgnevaks:

    production: {
        url: 'http://www.everydaypromotions.ee',
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
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.PORT
        },
        fileStorage: false
    },



    heroku addons:add heroku-postgresql
    Attached as HEROKU_POSTGRESQL_BROWN_URL

heroku pg:promote HEROKU_POSTGRESQL_BROWN_URL
heroku config:set NODE_ENV=production
heroku pg:credentials
heroku config:set POSTGRES_HOST=host
heroku config:set POSTGRES_USER=user
heroku config:set POSTGRES_PASSWORD=password
heroku config:set POSTGRES_DATABASE=database