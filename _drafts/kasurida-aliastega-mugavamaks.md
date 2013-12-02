---
layout: post
title: Käsurida aliastega mugavamaks
categories: postitused
tags: linux
image: linux.png
---
##Bash

    alias ..='cd ..'
    alias apt-get='sudo apt-get'
    alias update='apt-get update'
    alias upgrade='apt-get update && sudo apt-get upgrade'

    alias datenow='date +"%Y-%m-%d"'
    alias timenow='date +"%H-%M-%S"'
    alias now='date +"%Y-%m-%d-%H-%M-%S"'


##GIT

    [alias]
	    undo = reset --hard
    	new = !sh -c 'git log $1@{1}..$1@{0} "$@"'
        logg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
        dif = diff --color

##SSH .config

    Host cb
        Hostname cb
        Port 2222
        User root

    Host atv
        Hostname atv
        User atv

    Host github.com
        IdentityFile ~/.ssh/github.key
