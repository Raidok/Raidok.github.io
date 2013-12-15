---
layout: post
title: ImageMagick nalja
categories: mustandid
tags: linux
---

    apt-get install imagemagick

    for file in *.jpg; do convert $file -resize 300x -quality 85 p-$file; done

