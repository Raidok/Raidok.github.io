---
layout: post
title: Käsurida aliastega mugavamaks
categories: postitused
tags: linux
image: linux.png
---
##Bash

    # trükivigade ignoreerimine
    alias sl='ls'
    alias cd..='cd ..'

    # apti kasutamine lihtsamaks
    alias apt-get='sudo apt-get'
    alias update='apt-get update'
    alias upgrade='apt-get update && sudo apt-get upgrade'

    # lühendid
    alias ..='cd ..'
    alias h='history'
    alias ff='find . -name $1'
    alias rmdir='rm -rf'

    # ajatemplid
    alias datenow='date +"%Y-%m-%d"'
    alias timenow='date +"%H-%M-%S"'
    alias now='date +"%Y-%m-%d-%H-%M-%S"'

    # tüüpilisemad GIT käsud
    alias gits='git status'
    alias giff='git diff --color'

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
