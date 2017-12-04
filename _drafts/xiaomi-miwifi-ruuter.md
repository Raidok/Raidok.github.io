---
layout: post
title: MiWiFi
categories: postitused
tags: linux unix cli ruuter xiaomi
image: xiaomi.png
---

    > nslookup miwifi.com
    Server:   192.168.31.1
    Address:  192.168.31.1#53

    Name: miwifi.com
    Address: 192.168.31.1

    > sudo nmap -sUT 192.168.127.1/32

    Starting Nmap 7.12 ( https://nmap.org ) at 2017-01-20 20:39 EET
    Nmap scan report for XiaoQiang (192.168.127.1)
    Host is up (0.0043s latency).
    Not shown: 1982 closed ports
    PORT     STATE         SERVICE
    53/tcp   open          domain
    80/tcp   open          http
    139/tcp  open          netbios-ssn
    445/tcp  open          microsoft-ds
    1080/tcp open          socks
    4662/tcp open          edonkey
    7070/tcp open          realserver
    8192/tcp open          sophos
    8193/tcp open          sophos
    8194/tcp open          sophos
    8200/tcp open          trivnet1
    9000/tcp open          cslistener
    53/udp   open          domain
    67/udp   open|filtered dhcps
    137/udp  open          netbios-ns
    138/udp  open|filtered netbios-dgm
    514/udp  open|filtered syslog
    1900/udp open|filtered upnp
    MAC Address: 8C:BE:BE:31:B1:7C (Xiaomi Communications)

    Nmap done: 1 IP address (1 host up) scanned in 1094.47 seconds


Enable SSH

1. Assign a router with Xiaomi account, for example, through a mobile application. 
2. Upgrade to the latest version developerki (stable version of firmware is not supported). You can download it on the page http://www1.miwifi.com/miwifi_download.html
3. View the page http://d.miwifi.com/rom/ssh , indicating your account Xiaomi of claim 1 
4. Download miwifi_ssh file. bin, remember the password for Root on the page. Save the file to a USB flash drive that has been formatted in FAT32. 
5. Turn off the router, plug the flash drive into the USB port of the router 
6. Hold the RESET on the router, turn it on, wait until the indicator light will flash orange, release RESET, wait until the indicator glows blue 
7. Login to the router, for example through using WinSCP options: Protocol - of SCP, the host - miwifi.com, port - 22 name - root, password - password of claim 4 
8. Disconnect the USB flash drive




    src/gz attitude_adjustment http://downloads.openwrt.org/attitude_adjustment/12.09/brcm47xx/generic/packages/

    arch all 1
    arch noarch 1
    arch brcm47xx 10



Allikad:

* [Enable SSH on R1D](http://4pda.ru/forum/index.php?showtopic=572908&st=1680#entry36451800)
* [Fixing OPKG on R1D](http://bbs.xiaomi.cn/t-11888900)

