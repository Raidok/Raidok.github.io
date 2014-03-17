---
layout: post
title: Ubuntu serveri sisselogimissõnumi seadistamine
categories: postitused
tags: linux ubuntu
image: ubuntu.png
---
Mõtlesin Ubuntu serverile MOTD ehk _Message of the day_ sõnumiks midagi vaimukat seadistada, mida sisselogimisel iga kord nädatakse - mõni ASCII pilt või kiri. Järgmine kord sisse logides olid mu muudatused juba kadunud. Selgus, et Ubuntus teade genereeritakse.

Selle featuuri ärakasutamine on eriti kasulik siis, kui hallatavaid servereid on mitmeid - väiksem võimalus servereid segamini ajada kui SSH-ga ühendumisel mingi hästi eristatav kujutis kuvatakse.

Tavaliselt asub MOTD asukohas `/etc/motd` aga tuli välja, et igal sisselogimisel kirjutatakse see fail üle.
Failid, mille põhjal MOTD genereeritakse, asuvad `/etc/update-motd.d/` ja neid töödeldakse tähestikulises järjekorras.

Skriptide toimimist saab katsetada järgneva käsuga:

    sudo run-parts /etc/update-motd.d/

Vahvat tuunimist!
