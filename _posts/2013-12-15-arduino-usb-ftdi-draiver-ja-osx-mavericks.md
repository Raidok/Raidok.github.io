---
layout: post
title: Arduino USB FTDI draiver ja OSX Maverics
categories: postitused
tags: osx arduino bsd
image: arduino.png
---
OSX Mavericks uuendus viskab endiselt kaikaid kodarasse - uneprobleemid, puuteplaat teeb trikke, väga paljud äpid läksid katki.. Võiks lausa raamatu kirjutada! Nüüd avastasin veel, et mu vana ja ustav Arduino Duemilanove ei lase end enam programmeerida. Kus viga näed laita, seal tule ja aita, eksole.

Sümptomitena esinesid erinevaid jadaporte proovides järgnevad veateated:

    avrdude: stk500_getsync(): not in sync: resp=0x00
    avrdude: stk500_recv(): programmer is not responding

Aitab, kui konsooli sisestada järgnevad read:

    cd /System/Library/Extensions/IOUSBFamily.kext/Contents/PlugIns 
    sudo mv AppleUSBFTDI.kext AppleUSBFTDI.disabled 
    sudo touch /System/Library/Extensions

Seejärel teha restart ja installida [õiged FTDI driverid](http://www.ftdichip.com/Drivers/VCP.htm).

Ühenda Arduino, käivita IDE ja töötab!


