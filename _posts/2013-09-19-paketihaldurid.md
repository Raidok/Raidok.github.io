---
layout: post
title: Paketihaldurid
categories: postitused
tags: linux paketihaldur
---

Üks mugavamaid asju Debianil ja teistel sellesarnastel distributsioonidel on paketihaldur aptitude, millega saab ühe käsureaga terve hulga pakette paigaldada. Olles sellega harjunud, tunnen end teistel operatsioonisüsteemidel kui vangis. Õnneks on selle jaoks OSX jaoks loodud [Homebrew](http://brew.sh) ja Windowsi jaoks [Chocolatey](http://chocolatey.org).

OSX peal on selle paigaldamine väga lihtne:

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

Ja alustuseks installime näiteks git-i:

    brew install git
