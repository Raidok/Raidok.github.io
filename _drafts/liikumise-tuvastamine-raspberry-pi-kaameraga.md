---
layout: post
title: Liikumise tuvastamine Raspberry Pi kaameraga
categories: postitused
tags: raspberry-pi linux debian
image: raspberrypi.png
---
Liikumise tuvastamine Raspberry Pi kaameraga.

    #!/usr/bin/python2.7
    # modified version of detect motion and save still image (.jpg)
    import StringIO
    import subprocess
    import os
    import time
    from datetime import datetime
    from PIL import Image

    # Original code written by brainflakes and modified to exit
    # image scanning for loop as soon as the sensitivity value is exceeded.
    # this can speed taking of larger photo if motion detected early in scan
     
    # Motion detection settings:
    # PGM maded changes to read values dynamically via command line parameters.
    # --------------------------
    # Threshold      - (how much a pixel has to change by to be marked as "changed")
    # Sensitivity    - (how many changed pixels before capturing an image) needs to be higher if noisy view
    # ForceCapture   - (whether to force an image to be captured every forceCaptureTime seconds)
    # filepath       - location of folder to save photos
    # filenamePrefix - string that prefixes the file name for easier identification of files.

    threshold = 10
    sensitivity = 180
    forceCapture = True
    forceCaptureTime = 60 * 60 # Once an hour
    filepath = "/home/pi/video"
    filenamePrefix = "pgm"
    fileType = "jpg"
    # File photo size settings
    saveWidth = 800
    saveHeight = 600
    diskSpaceToReserve = 40 * 1024 * 1024 # Keep 40 mb free on disk

    # Capture a small test image (for motion detection)
    def captureTestImage():
        command = "raspistill -w %s -h %s -t 1 -n -e bmp -o -" % (100, 75)
        imageData = StringIO.StringIO()

        imageData.write(subprocess.check_output(command, shell=True))
        imageData.seek(0)
        im = Image.open(imageData)
        buffer = im.load()
        imageData.close()
        return im, buffer

    # Save a full size image to disk
    def saveImage(width, height, diskSpaceToReserve):
        keepDiskSpaceFree(diskSpaceToReserve)
        time = datetime.now()
        filename = filepath + filenamePrefix + "-%04d_%02d_%02d-%02d:%02d:%02d" % (time.year, time.month, time.day, time.hour, time.minute, time.second)+ "." + fileType
        subprocess.call("raspistill -w "+ str(saveWidth) +" -h "+ str(saveHeight) + " -t 1 -n -e " + fileType + " -q 15 -hf -vf -o %s" % filename, shell=True)
        print "Captured image: %s" % filename

    # Keep free space above given level
    def keepDiskSpaceFree(bytesToReserve):
        if (getFreeSpace() < bytesToReserve):
            for filename in sorted(os.listdir(".")):
                if filename.startswith(filenamePrefix) and filename.endswith("." + fileType):
                    os.remove(filename)
                    print "Deleted %s to avoid filling disk" % filename
                    if (getFreeSpace() > bytesToReserve):
                        return

    # Get available disk space
    def getFreeSpace():
        st = os.statvfs(".")
        du = st.f_bavail * st.f_frsize
        return du

Skript pärineb [Raspberry Pi foorumist](http://www.raspberrypi.org/forum/viewtopic.php?f=43&t=45235&start=125#p483332).
