---
layout: post
title: Huawei 4G modem ja Raspberry Pi
categories: postitused
tags: linux raspberry-pi
image: raspberrypi.png
---


# Kuidas modem tööle saada?

Ühendasin külge ja jooksutasin *dmesg*:

    [ 7641.954810] usb 1-1.3: new full-speed USB device number 18 using dwc_otg
    [ 7642.065715] usb 1-1.3: not running at top speed; connect to a high speed hub
    [ 7642.079304] usb 1-1.3: New USB device found, idVendor=12d1, idProduct=14fe
    [ 7642.090084] usb 1-1.3: New USB device strings: Mfr=2, Product=1, SerialNumber=4
    [ 7642.101297] usb 1-1.3: Product: HUAWEI Mobile
    [ 7642.109461] usb 1-1.3: Manufacturer: HUAWEI Technology
    [ 7642.118404] usb 1-1.3: SerialNumber: FFFFFFFFFFFFFFFF
    [ 7642.152199] usb-storage 1-1.3:1.0: USB Mass Storage device detected
    [ 7642.182614] scsi host3: usb-storage 1-1.3:1.0
    [ 7643.186675] scsi 3:0:0:0: CD-ROM            HUAWEI   Mass Storage     2.31 PQ: 0 ANSI: 2
    [ 7643.214662] sr 3:0:0:0: [sr0] scsi-1 drive
    [ 7643.230182] sr 3:0:0:0: Attached scsi CD-ROM sr0
    [ 7643.248055] sr 3:0:0:0: Attached scsi generic sg0 type 5
    [ 7643.276873] scsi 3:0:0:1: Direct-Access     HUAWEI   TF CARD Storage  2.31 PQ: 0 ANSI: 2
    [ 7643.316237] sd 3:0:0:1: [sda] Attached SCSI removable disk
    [ 7643.325699] sd 3:0:0:1: Attached scsi generic sg1 type 0

Jooksutasin *lsusb*:

    Bus 001 Device 017: ID 12d1:14fe Huawei Technologies Co., Ltd.

Igaks juhuks proovisin istallida usb-modeswitch pakki, kuid mul oli see juba olemas:

    sudo apt-get install usb-modeswitch

Pakime näidiskonfiguratsioonifaili lahti:

    cd /tmp
    tar -xzvf /usr/share/usb_modeswitch/configPack.tar.gz 12d1\:14fe

Selle faili sisu on mul selline:

    # T-Mobile NL (Huawei E352)
    TargetVendor=0x12d1
    TargetProductList="1506,150f,151d"
    HuaweiNewMode=1

Tegin sellest koopia modeswitch.d kataloogi:

    sudo cp 12d1\:14fe /etc/usb_modeswitch.d/12d1\:14fe

Proovisin käivitada:

    sudo usb_modeswitch -c /etc/usb_modeswitch.d/12d1\:14fe

Selle peale karjus see mulle: No default vendor/product ID given. Abort

Guugeldasin veidi, katsetasin ja lõpuks jõudsin sellise konfini:

    DefaultVendor=0x12d1
    DefaultProduct=0x14fe
    TargetVendor=0x12d1
    TargetProduct=0x1506
    HuaweiNewMode=1

Kui nüüd jooksutada:

    sudo usb_modeswitch -c /etc/usb_modeswitch.d/12d1\:14fe

On vastuseks:

    Look for target devices ...
     No devices in target mode or class found
    Look for default devices ...
       product ID matched
     Found devices in default mode (1)
    Access device 047 on bus 001
    Current configuration number is 1
    Use interface number 0
    Use endpoints 0x01 (out) and 0x81 (in)

    USB description data (for identification)
    -------------------------
    Manufacturer: HUAWEI Technology
         Product: HUAWEI Mobile
      Serial No.: FFFFFFFFFFFFFFFF
    -------------------------
    Using standard Huawei switching message
    Looking for active driver ...
     OK, driver detached
    Set up interface 0
    Use endpoint 0x01 for message sending ...
    Trying to send message 1 to endpoint 0x01 ...
     OK, message successfully sent
    Reset response endpoint 0x81
     Could not reset endpoint (probably harmless): -99
    Reset message endpoint 0x01
     Could not reset endpoint (probably harmless): -99
     Device is gone, skip any further commands
    -> Run lsusb to note any changes. Bye!

Ja tavaliselt annab lsusb peale seda:

    Bus 001 Device 041: ID 12d1:1506 Huawei Technologies Co., Ltd. E398 LTE/UMTS/GSM Modem/Networkcard

Ehk siis productId on muutunud! Jee! Aga mõnukord see ei õnnestu, ja siis tuleb lihtsalt uuesti proovida..

Et see modeswitch automaatselt toimuks, teeme faili /etc/udev/rules.d/70-huawei-modem.rules ja kirjutame sinna sisse:

    ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", ATTRS{idProduct}=="14fe", RUN+="/usr/sbin/usb_modeswitch -c /etc/usb_modeswitch.d/12d1:14fe"


# Kuidas modemiga internetti pääseda?

Installime:

    sudo apt-get install wvdial

Muudame konfifailis /etc/wvdial.conf ridu Phone, Password ja Username:

    [Dialer Defaults]
    Init1 = ATZ
    Init2 = ATQ0 V1 E1 S0=0
    Modem Type = Analog Modem
    Baud = 9600
    New PPPD = yes
    Modem = /dev/ttyUSB0
    ISDN = 0
    Phone = *99#
    Password = { }
    Username = { }

Nüüd ühendamiseks:

    sudo wvdial




Allikad:

* [How to setup a USB 3G Modem on Raspberry PI using usb_modeswitch and wvdial](https://www.thefanclub.co.za/how-to/how-setup-usb-3g-modem-raspberry-pi-using-usbmodeswitch-and-wvdial)
* [Getting a Huawei E352s-5 to work with Linux](http://bytefish.de/blog/huawei_e352s5/)
