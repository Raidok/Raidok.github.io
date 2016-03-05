---
layout: post
title: EXIF-andmete manipuleerimine ExifTool abil
categories: postitused
tags:
image:
---
Uurisin ja mõtlesin, kuidas fotosid paremini organiseerida ja nendega ka lisainfot siduda. Pildikataloogidele andmebaaside loomine muudaks tagavarakoopiate tegemise tüütuks. Andmefailide kasutamisel oleks tulnud hakata andmestruktuurile mõtlema. Siis aga meenus [EXIF](http://en.wikipedia.org/wiki/Exchangeable_image_file_format).

EXIF-andmetesse salvestatakse väga palju infot, mis puudutab pildi tegemist. Alustades kaamera akupingest ja lõpetades GPS-koordinaatidega, sisaldades veel säri, ava ja väga palju muidu näitajaid. Võimalusi on palju ja neid kõiki ei kasutata kaugeltki mitte ära.

Hoiatan ette, et kui hakkate järgnevat katsetama, siis omal vastutusel. Üldiselt allolevaga pilti ennast ei muudeta, kuid metainfo võib küll ära rikkuda.


# ExifTool

Uurisin, et millega seda infot lugeda ja kirjutada saaks - leidsin [ExifTool](http://owl.phy.queensu.ca/~phil/exiftool/)i.

Exiftool suudab teha kõike, milleks EXIF-andmed mõeldud on ja rohkemgi veel. Dokumentatsioon on kohati raskesti mõistetav, kuid mulle osutus see vägagi väärtuslikuks tööriistaks.


# Töövoog

Esialgne töövoog näeb mul ette selline:

1. ekspordin pildid kaustade kaupa JSON-formaati
2. lisan sinna vajalikud andmed juurde
3. loen failist andmed pildifailidesse


# Andmed

Mulle hakkasid silma järgnevad väljad, mida ma kasutama hakkan:

* DateTimeOriginal ja CreatedDate - piltide puhul on kõik kuupäevad alati olemas ja samad, videote puhul kipub esimene puudu olema ja siis tuleb leppida teisega
* Title - pealkirja väli pilid/albumi/kausta/sündmuse nime jaoks
* Comment - kirjeldus pildist või lihtsalt sellega seonuv info, mida pildiga ei ole võimalik edasi anda
* Keywords - lihtsalt sorteerimiseks ja grupeerimiseks mõnes globaalsemas rakenduses nagu nt [Shotwell](http://en.wikipedia.org/wiki/Shotwell_(software)).


# Eksportimine:

Kõikide kuupäevadega (s.t DateTimeOriginal, CreateDate, ModifyDate):

    exiftool -json -filename -filetype -title -comment -keywords -alldates . > data.json

Jätab faili muutmiskuupäeva välja (s.t DateTimeOriginal, CreateDate)

    exiftool -json -filename -filetype -title -comment -keywords -datetimeoriginal -createdate . > data.json

Näiteks jooksutades esimest käsku kataloogis, kus on kaks pildi- ja üks videofail, tekib data.json faili järgnev sisu:

    [{
      "SourceFile": "./IMGP3754.JPG",
      "FileName": "IMGP3754.JPG",
      "FileType": "JPEG",
      "DateTimeOriginal": "2014:10:08 12:05:06",
      "CreateDate": "2014:10:08 12:05:06",
      "ModifyDate": "2014:10:08 12:05:06"
    },
    {
      "SourceFile": "./IMGP3753.JPG",
      "FileName": "IMGP3753.JPG",
      "FileType": "JPEG",
      "DateTimeOriginal": "2014:10:08 12:05:10",
      "CreateDate": "2014:10:08 12:05:10",
      "ModifyDate": "2014:10:08 12:05:10"
    },
    {
      "SourceFile": "./IMGP3755.MOV",
      "FileName": "IMGP3755.MOV",
      "FileType": "MOV",
      "CreateDate": "2014:10:08 12:05:55"
    }]


# Modifitseerimine

Nüüd lisame sinna juurde mingisugust infot (lihtsam on vahele lisada, ei teki ohtu komaga eksida):

    [{
      "SourceFile": "./IMGP3754.JPG",
      "FileName": "IMGP3754.JPG",
      "FileType": "JPEG",
      "Title": "Pargis",
      "Comment": "Kirjud puud",
      "Keywords": ["loodus"],
      "DateTimeOriginal": "2014:10:08 12:05:06",
      "CreateDate": "2014:10:08 12:05:06",
      "ModifyDate": "2014:10:08 12:05:06"
    },
    {
      "SourceFile": "./IMGP3753.JPG",
      "FileName": "IMGP3753.JPG",
      "FileType": "JPEG",
      "Title": "Pargis",
      "Comment": "Vihmapiisad",
      "Keywords": ["loodus"],
      "DateTimeOriginal": "2014:10:08 12:05:10",
      "CreateDate": "2014:10:08 12:05:10",
      "ModifyDate": "2014:10:08 12:05:10"
    },
    {
      "SourceFile": "./IMGP3755.MOV",
      "FileName": "IMGP3755.MOV",
      "FileType": "MOV",
      "Title": "Pargis",
      "Comment": "Eeva müttab lehtedes",
      "Keywords": ["loodus","eeva"],
      "CreateDate": "2014:10:08 12:05:55"
    }]


# Importimine

Loeme andmed sisse:

    exiftool -json=data.json .

Käsklus nimetab originaalfailid ümber, lisades lõppu "_original". Need saab tagantjärgi ära kustutada, kuid rikub ära failide loomise ajad ja minu jaoks on see *dealbreaker*. Kui paistab, et midagi rikki ei läinud eelmise käsuga, siis kõige parem oleks see taaskord läbi jooksutada lisaparameetriga `-overwrite_original_in_place`, mis kirjutab faili üle ja jätab ka faili loomise kuupäeva failisüsteemis õigeks. Enne tasub ka muidugi üleliigsed failid ära kustutada ühega järgnevatest käsklustest:

    exiftool -delete_original .
    rm *_original

Ja lõplik käsklus, mis originaalfailid üle kirjutab:

    exiftool -overwrite_original_in_place -json=data.json .


# Muid ExifTool nippe

## Dubleerivate siltide vältimine

Sildi "mets" lisamine ilma dubleerimiseta failidele kataloogis "seenelkäik":

    TAG="mets" exiftool -keywords-="$TAG" -keywords+="$TAG" seenelkäik

See on kasulik siis, kui selle kataloogi peal on juba korra silte lisatud, kuid nüüd sai sinna pilte juurde pandud ja tahaks neile ka sildid külge panna. Operaator `-=` eemaldab sildi, `+=` lisab ja `=` kirjutaks olemasolevad lihtsalt ühe ainsa sildiga üle.

## Failide loomise ajad on nihkes

Eksporditud EXIF-andmeid uurides selgus, et MP4-tüüpi videofailidel (telefoniga tehtud) on kellaaeg kolme tunni (ajatsooni) võra maas. Selle parandamiseks:

    exiftool -alldates+=3 -filemodifydate+=3 *.mp4

Vaikimisi liidetakse tunde, muude ajatehete kohta on täpsemalt kirjutatud [ExifTool Date/Time Shift Feature kirjelduses](http://www.sno.phy.queensu.ca/~phil/exiftool/#shift).


# Ja edasi?

* Leida või luua võimalus neid andmeid natukene kasutajasõbralikumal viisil lisada ja muuta
* Uurida galeriitarkvarade võimalusi, mis oskaksid seda infot piltide juurde kuvada (nt [node-galley](https://github.com/cianclarke/node-gallery)-st annaks midagi sellist valmis teha üsna kerge vaevaga)
* Ajajoonte genereerimine JSON-failide või lennult EXIF-andmete pealt
