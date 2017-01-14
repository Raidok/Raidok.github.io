---
layout: post
title: OpenVPN täppisseadistamine valikulisele marsruutimisele
categories: postitused
tags: vpn turvalisus
image: openvpn.png
---
VPN on kasulik olles ühendatud kahtlases võrgus, näiteks parooliga kaitsmata wifis kesklinna kohvikus. Samas saaks läbi VPN-i ka näiteks [Hulu](http://www.hulu.com)t või [Netflix](https://www.netflix.com)i kasutada. On ka olukordi, kus võrgus piiratakse väljuvat liiklust. Näiteks oled sattunud võrku, kus praktiliselt kõik peale veebiportide (80 ja 443) on kinni keeratud.


##Suunamine

Sellisel juhul aitab [OpenVPN seadistamine ebastandartsetele portidele](/postitused/docker-openvpn/). Vaikimis suunatakse kogu liiklus läbi VPN-serveri, mis on ebaturvalises võrgus loomulikult eelistatud lahendus. Ainult seriaalide vaatamiseks võib kogu liikluse ümbersuunamine ja krüpteerimine olla ebavajalik aja raiskamine ning VPN-profiili pidev sisse-välja lülitamine tüütu. Võib ka juhtuda, et liiklus läbi VPNi on piiratud mahu poolest (näiteks 1 TB kuus) ja muu suuremamahulise liikluse sealkaudu suunamine võib limiidi kiiresti lõhki lüüa.

##Portide suunamine

Mõnikord on vaja ainult üksikuid porte suunata. Näiteks ei õnnestunud mul teatud võrgus Ubuntu keyserverist võtmete laadimine. Hiljem selgus, et [`apt-key`-d saab ka veebipordilt kasutada](http://ubuntuforums.org/showthread.php?t=1101366#post10043037), kuid OpenVPNi kasutamine ja pikemaajaliselt üksiku marsruudi määramine OpenVPNi konfiguratsiooni aitas ka.

On ka juhtunud, et võrgust väljuval liiklusel on SSH port (22/tcp) kinni keeratud. Näiteks GIT töötab vaikimisi üle SSH. GitHubi puhul on ka sellele _workaround_ - HTTPS kasutamine, kuid see kasutjaanime ja parooli sisestamine on tüütu.

Probleem on aga selles, et OpenVPNiga tegelikult porte suunata ei saa, kuna ta marsruudib ainult [ISO/OSI mudel](http://et.wikipedia.org/wiki/Avatud_s%C3%BCsteemide_sidumise_arhitektuur)i teisel ja kolmandal kihil aga pordid on realiseeritud neljandal. Teoreetiliselt peaks saama ka `iptables` häkkimisega selle kuidagi tehtud, kuid see oleks tuleviku muusika.

Hetkeline lahendus on see, et suuname hosti (ehk siis IP-aadressi, aadresside vahemiku või lihtsalt domeeninime) kogu liikluse läbi VPN-serveri.


##Märkus striimimise kohta

Olgu siinkohal ära öeldud, et näiteks [DigitalOcean](https://www.digitalocean.com)is enda loodud VPN-server populaarseid striimimisportaale ära ei peta, selleks tasub kasutada spetsiaalseid VPN-teenuseid nagu pakub näiteks [blackVPN](https://www.blackvpn.com) või *proxy*sid nagu näiteks [Media Hint](https://mediahint.com). **NB!** [Tasuta *proxy*id võivad olla pahatahtlikud](https://blog.haschek.at/post/fd9bc) või kui ei ole, võivad iga hetk selliseks muutuda.


##Seadistamine

Sai palju eeljuttu, näitame nüüd ära, kuidas asjad tegelikult käivad. Võtame lahti kliendi konfiguratsioonifaili. Soovitatav oleks esialgsest koopia teha juhuks kui oleks mõnikord siiski kogu liiklus ümber suunata vaja. Failis peaks üldiselt leiduma analoogne rida:

    redirect-gateway def1

Tema vastutada ongi see, et kogu liiklus ümber suunataks. Seda saab muide kontrollida käsklusega `route`. Osaliseks suunamiseks tuleb see rida ära kustutada või välja kommenteerida. Välja kommenteerimiseks tuleb rea ette lisada märk `#`.

Marsruutide lisamine IP-aadresside järgi on selline:

    route 192.30.252.0 255.255.252.0 vpn_gateway #GitHub

Tegu on GitHubile eraldatud aadressiruumiga. Läheb vaja kui kohalikust võrgust väljuval liiklusel on SSH port kinni keeratud. Seletame lahti ka:

* `route` tähendab, et antud rida defineerib marsruudi
* `192.30.252.0` on võrgu aadress või võib ka konkreetne IP-aadress olla
* `255.255.252.0` on võrgu mask, fikseeritud IP-aadressi puhul peaks olema see `255.255.255.255`
* `vpn_gateway` määrab lüüsi, vastandina on saadaval `lan_gateway`
* `#GitHub` on lihtsalt kommentaar, et hiljem marsruute lihtsam eristada oleks

Nende võrgu aadresside ja maskide määramiseks võib lähtuda [sellest `nslookup`i ja `whois`i kasutamise õpetusest](http://support.vpnsecure.me/articles/frequently-asked-questions/openvpn-split-tunneling), kuid saab ka lihtsamalt!

Kui faili lisada järgnev rida:

    allow-pull-fqdn

See teeb elu lihtsamaks ja laseb DNS-kirjete järgi _ruutimist_ ellu viia:

    route keyserver.ubuntu.com 255.255.255.255 vpn_gateway
    route hulu.com 255.255.255.255 vpn_gateway

Maagiline!
