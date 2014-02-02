---
layout: post
title: Käsurida aliastega mugavamaks
categories: postitused
tags: linux ubuntu
image: linux.png
---
Graafilisi liideseid erinevatele tööriistadele tekib aina juurde, kuid vana hea käsurea vastu ei saa siiski miski. Väga spetsiifilised tegevused võivad mõnikord aga väga tüütult pikaks kujuneda. Õnneks on selle peale mõeldud. Keerulisemaid käsklusi on võimalik oma suva järgi mugandada.


##Bash

Esimene kohandus, mida Ubuntu puhul teha oleks mõttekas, oleks `~/.bashrc` failis sisse kommenteerida järgnev rida:

    #force_color_prompt=yes

See lisab värvi. Millegipärast on mingitel veidratel põhjustel vaikimisi maha keeratud.

OSX puhul on vaja lisada midagi sarnast `~/.profile` faili:

    export CLICOLOR=1
    export LSCOLORS=GxFxCxDxBxegedabagaced

Järgmisena lisame aliased. Need võib panna `~/.bashrc`, kuid tavaliselt on seal lingitud failile `~/.bash_aliases`, mis on just selle jaoks.

    # trükivigade ignoreerimine
    alias sl='ls'
    alias cd..='cd ..'

    # apt mugavamaks
    alias apt-get='sudo apt-get'
    alias update='apt-get update'
    alias upgrade='apt-get update && sudo apt-get upgrade'
    alias search='apt-cache search'

    # lühendid
    alias ..='cd ..'
    alias h='history'
    alias ff='find . -name $1'
    alias rmdir='rm -rf'

    # ajatemplid
    alias datenow='date +"%Y-%m-%d"'
    alias timenow='date +"%H-%M-%S"'
    alias now='date +"%Y-%m-%d-%H-%M-%S"'

    # GIT
    alias gits='git status'

Et muudatused mõjuksid ühes terminalis - `. ~/.bashrc`, et üldiselt, tuleb korraks välja logida.


##GIT

Globaalne GIT-i konfiguratioonifail asub `~/.gitconfig` failis. Sinna võib näiteks lisada järgmise jupi:

    [alias]
        undo = reset --hard
        new = !sh -c 'git log $1@{1}..$1@{0} "$@"'
        logg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

* `git dif` - vaikimisi värviline diff
* `git undo` - _working directory_ viimase _commit_i seisu tagasi viimine
* `git new` - viimase tegevusega tekkinud _commit_id
* `git logg` - kena ja värviline graafiline logi

Järgneva jupi lisamisel konfifaili muudetakse GIT-käsud `branch`, `diff` ja `status` vaikimisi värvilisteks:

    [color]
        branch = auto
        diff = auto
        status = auto
        ui = auto

Või kui tahta täpsemalt värve ja fonte seadistada, võib alustada sellest:

    [color "branch"]
        current = blue reverse
        local = blue
        remote = green
    [color "diff"]
        meta = blue bold
        frag = magenta bold
        old = red bold
        new = green bold
    [color "status"]
        added = blue
        changed = green
        untracked = cyan
    [color]
        ui = auto


##SSH .config

Ka SSH-ühendusi, portide suunamisi ja võtmete haldamist on võimalik palju lihtsamaks teha. Selleks on fail `~/.ssh/config`:

    Host cb
        Hostname cb
        Port 2222
        User root

    Host atv
        Hostname atv
        User atv

    Host github.com
        IdentityFile ~/.ssh/github.key


##z

Käsureal kataloogide vahel hüppamise saab teha lihtsamaks [z-käskluse](https://github.com/rupa/z) abil.

    cd ~
    git clone git@github.com:rupa/z.git

Lisame profiili:

    echo ". ~/z/z.sh" >> ~/.bashrc

Muudatuste jõustumiseks tuleks korra välja ja uuesti sisse logida, kuid ühe terminali ulatuses profiili laadimiseks aitab ajutiselt `.` või `source` käsklus:

    . ~/.bashrc

`z` kasutamisele eelnev väike õppeprotsess. Selleks tuleb natukene käsuga `cd` ringi liikuda, näiteks:

    cd ~
    cd Dokumendid
    cd /var/wwww
    cd /var/log

Ja edaspidi saab suvalisest asukohast neisse kataloogidesse hüpata juba nii:

    z ~
    z Dokumendid
    z www
    z log

Õpitud asukohtasid näeb lihtsalt `z` käsuga. Meeldejäetud asukohad põhinevad `pwd -P` väljundil, ehk _symlink_idest ta ennast häirida ei lase, vaid jätab meelde õige asukoha.

