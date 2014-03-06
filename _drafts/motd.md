---
layout: post
title: Serveri sisselogimissõnumi seadistamine
categories: postitused
tags: linux ubuntu
image: ubuntu.png
---
Mõtlesin Ubuntu serverile MOTD ehk _Message of the day_ sõnumiks midagi vaimukat seadistada, mida sisselogimisel iga kord nädatakse - mõni ASCII pilt või kiri. Jrgmine kord sisse logides olid mu muudatused juba kadunud. Selgus, et Ubuntus genereeritakse neid.

Tavaliselt asub Unix-laadsetel süsteemidel motd asukohas `/etc/motd` aga tuli välja, et igal sisselogimisel see fail kirjutatakse üle.

Failid, mille põhjal motd genereeritakse, asuvad `/etc/update-motd.d/`. Failid käivitatakse tähestikulises järjekorras.

Skriptide toimimist saab katsetada järgneva käsuga:

    sudo run-parts /etc/update-motd.d/

Vahvat tuunimist!
