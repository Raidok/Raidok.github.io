---
layout: post
title: Blogipidamine Jekylliga
categories: postitused
tags: 
image: jekyll.png
---


Paigaldame ruby ja gemmid:

    sudo apt-get install ruby rubygems

Jekyll on mugavalt gemmi abil installeeritav:

    sudo gem install jekyll

Hiljem tõenäoliselt tekib viga `gem_original_require': no such file to load -- json (LoadError)`, selle lahendab JSON gemmi installimine:

    sudo gem install json

