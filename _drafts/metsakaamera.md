---
layout: post
title: Metsakaamera
categories: postitused
tags: raspberry-pi
image: raspberrypi.png
---

80W päikesepaneel

10A laadimiskontroller

Aku 9Ah 12V:
https://www.oomipood.ee/product/ps9p_12_t2_pliiaku_12v_9_0ah_151_65_95mm_klemm_6_3mm_power_kingdom


Raspberry Pi A+ koos kaameraga tarbib 5 V juures ~0,3 A, see teeb 5 * 0,3 = 1,5W.

9Ah mahutavus on vatt-tundides on 9 * 12 = 108Wh.

Pi tarbib selle ära 108 / 1,5 = 72 tunniga.

See võib tunduda palju, kuid meie kliimas ei tule päike vahepeal nädal aega pilve tagant välja. Eks läbi pilve on ka võimalik midagi kinni püüda, kuid kas sellest piisab, et Pi elus püsiks?

Päikesepaneeli võimsuse arvutamiseks arvestame, et see võiks 6 tunni otsese päikesega aku teoreetiliselt täiesti täis laadida. Kui aku oli 108Wh, siis selle täislaadimiseks on vaja 108 / 6 = 18W paneeli.
