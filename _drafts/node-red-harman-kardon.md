---
layout: post
title: "Node-RED: Harman Kardon AVR"
categories: postitused
tags: node-red
image: node-red.png
---

```
    [{"id":"4fc5eb01.4c2574","type":"mqtt-broker","z":"5fbe740.7d8188c","broker":"localhost","port":"1883","clientid":"","usetls":false,"verifyservercert":true,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"/health/pi3","willQos":"1","willRetain":"false","willPayload":"bye","birthTopic":"/health/pi3","birthQos":"1","birthRetain":null,"birthPayload":"hello"},{"id":"b23704c3.90f118","type":"mqtt in","z":"5fbe740.7d8188c","name":"test","topic":"/test","broker":"4fc5eb01.4c2574","x":163,"y":204,"wires":[["bb278f0f.e8295"]]},{"id":"bb278f0f.e8295","type":"debug","z":"5fbe740.7d8188c","name":"","active":true,"console":"false","complete":"false","x":347,"y":217,"wires":[]},{"id":"b78aa103.be206","type":"debug","z":"5fbe740.7d8188c","name":"","active":true,"console":"false","complete":"req.params","x":504,"y":286,"wires":[]},{"id":"fd92ea36.a78e78","type":"inject","z":"5fbe740.7d8188c","name":"","topic":"","payload":"{\"cmd\": \"mute-toggle\"}","payloadType":"json","repeat":"","crontab":"","once":false,"x":229,"y":470,"wires":[["c5e22e31.75e75","ab75b9bf.c7ba68"]]},{"id":"c5e22e31.75e75","type":"function","z":"5fbe740.7d8188c","name":"","func":"\n   var payload = msg.payload;\n   var cmd = payload.cmd;\n   var zone = payload.zone || 'Main Zone';\n   var param = payload.param || '';\n   //var body = '<?xml version=\"1.0\" encoding=\"UTF-8\"?> <harman> <bds> <common> <control> <name>' + cmd + '</name> <zone>' + zone + '</zone> <para>' + param + '</para> </control> </common> </bds> </harman>';\n   var body = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\\n<harman>\\\n<bds>\\\n<common>\\\n<control>\\\n<name>' + cmd + '</name>\\\n<zone>' + zone + '</zone>\\\n<para>' + param + '</para>\\\n</control>\\\n</common>\\\n</bds>\\\n</harman>';\n   var text = 'POST HK_APP HTTP/1.1\\r\\n';\n   text += 'Host: :' + 10025 + '\\r\\n';\n   text += 'User-Agent: Harman Kardon BDS Remote Controller/1.0\\r\\n';\n   text += 'Content-Length: ' + body.length + '\\r\\n';\n   text += '\\r\\n';\n   text += body;\n   return { payload: text};","outputs":1,"noerr":0,"x":437,"y":514,"wires":[["ab75b9bf.c7ba68","44e58a44.7313e4"]]},{"id":"ab75b9bf.c7ba68","type":"debug","z":"5fbe740.7d8188c","name":"","active":true,"console":"false","complete":"false","x":636,"y":440,"wires":[]},{"id":"e91dd8a.b8e2128","type":"inject","z":"5fbe740.7d8188c","name":"","topic":"","payload":"{\"cmd\": \"source-select\", \"param\": \"AUX\"}","payloadType":"json","repeat":"","crontab":"","once":false,"x":174,"y":513,"wires":[["c5e22e31.75e75"]]},{"id":"a70df175.9fb07","type":"inject","z":"5fbe740.7d8188c","name":"","topic":"","payload":"{\"cmd\": \"volume-up\"}","payloadType":"json","repeat":"","crontab":"","once":false,"x":217,"y":585,"wires":[["c5e22e31.75e75"]]},{"id":"cf679622.8fbfa8","type":"inject","z":"5fbe740.7d8188c","name":"","topic":"","payload":"{\"cmd\": \"volume-down\"}","payloadType":"json","repeat":"","crontab":"","once":false,"x":212,"y":639,"wires":[["c5e22e31.75e75"]]},{"id":"44e58a44.7313e4","type":"tcp request","z":"5fbe740.7d8188c","server":"192.168.0.12","port":"10025","out":"char","splitc":"\\n","name":"","x":594,"y":650,"wires":[["ab75b9bf.c7ba68"]]},{"id":"30444dc4.17bbc2","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr/src/:src","method":"get","swaggerDoc":"","x":154,"y":298,"wires":[["de348885.5393a8"]]},{"id":"de348885.5393a8","type":"function","z":"5fbe740.7d8188c","name":"","func":"\nvar params = msg.req.params,\n  command = {};\n\nif (params.src) {\n    command.cmd = 'source-selection',\n    command.param = params.src;\n} else if (params.volume) {\n    command.cmd = 'volume-' + params.volume;\n    command.param = '10';\n} else if (params.mute) {\n    command.cmd = 'mute-' + params.mute;\n} else if (params.cmd) {\n    command.cmd = params.cmd;\n    if (params.param) {\n        command.param = params.param;\n    }\n}\n\n\n\nmsg.payload = 'OK';\n\nreturn [msg, {payload: command}];","outputs":"2","noerr":0,"x":398,"y":372,"wires":[["9261a4b7.b360d8"],["c5e22e31.75e75","ab75b9bf.c7ba68"]]},{"id":"9261a4b7.b360d8","type":"http response","z":"5fbe740.7d8188c","name":"","x":610,"y":343,"wires":[]},{"id":"f205ad01.5b5c4","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr/volume/:volume","method":"get","swaggerDoc":"","x":179,"y":336,"wires":[["de348885.5393a8"]]},{"id":"435c522.3078eac","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr/mute/:mute","method":"get","swaggerDoc":"","x":177,"y":373,"wires":[["de348885.5393a8"]]},{"id":"965a66e8.ae62d8","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr/cmd/:cmd","method":"get","swaggerDoc":"","x":194,"y":407,"wires":[["de348885.5393a8"]]},{"id":"e3855f56.55e5e","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr/cmd/:cmd/:param","method":"get","swaggerDoc":"","x":226,"y":436,"wires":[["de348885.5393a8"]]},{"id":"ce1cc812.5403c8","type":"http request","z":"5fbe740.7d8188c","name":"","method":"GET","ret":"txt","url":"http://192.168.0.12:10025","x":547,"y":720,"wires":[["ab75b9bf.c7ba68"]]},{"id":"28741b84.9bce24","type":"template","z":"5fbe740.7d8188c","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"<link href=http://getbootstrap.com/dist/css/bootstrap.min.css rel=stylesheet>\n\n<script>\nfunction call(cmd, param) {\n    \n    var r = new XMLHttpRequest(); \n    var url = \"/avr/cmd/\" + cmd;\n    if (param) {\n        url = url + \"/\" + param;\n    }\n    r.open(\"GET\", url, true);\n    r.onreadystatechange = function () {\n    \tif (r.readyState != 4 || r.status != 200) return; \n    \tconsole.log(r.responseText);\n    };\n    r.send();\n    \n}\n</script>\n\n<div class=\"container text-center\">\n\n<br>\n<br>\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('volume-up')\">vol+</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('mute-toggle')\">mute+</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('volume-down')\">vol-</button>\n</div>\n\n<br>\n<br>\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'TV')\">TV</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Audio')\">Chromecast</button>\n</div>\n\n</div>","x":294,"y":130,"wires":[["9261a4b7.b360d8"]]},{"id":"c087435a.976ec","type":"http in","z":"5fbe740.7d8188c","name":"","url":"/avr","method":"get","swaggerDoc":"","x":134,"y":124,"wires":[["28741b84.9bce24"]]}]
```

```
[
    {
        "id": "c4641ea2.4afdb",
        "type": "inject",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "topic": "",
        "payload": "{\"cmd\": \"mute-toggle\"}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 280,
        "y": 440,
        "wires": [
            [
                "31c8754a.ce7daa"
            ]
        ]
    },
    {
        "id": "31c8754a.ce7daa",
        "type": "function",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "func": "\n   var payload = msg.payload;\n   var cmd = payload.cmd;\n   var zone = payload.zone || 'Main Zone';\n   var param = payload.param || '';\n   //var body = '<?xml version=\"1.0\" encoding=\"UTF-8\"?> <harman> <bds> <common> <control> <name>' + cmd + '</name> <zone>' + zone + '</zone> <para>' + param + '</para> </control> </common> </bds> </harman>';\n   var body = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\\n<harman>\\\n<bds>\\\n<common>\\\n<control>\\\n<name>' + cmd + '</name>\\\n<zone>' + zone + '</zone>\\\n<para>' + param + '</para>\\\n</control>\\\n</common>\\\n</bds>\\\n</harman>';\n   var text = 'POST HK_APP HTTP/1.0\\r\\n';\n   text += 'Host: :' + 10025 + '\\r\\n';\n   text += 'User-Agent: Harman Kardon BDS Remote Controller/1.0\\r\\n';\n   text += 'Content-Length: ' + body.length + '\\r\\n';\n   text += '\\r\\n';\n   text += body;\n   return { payload: text};",
        "outputs": 1,
        "noerr": 0,
        "x": 650,
        "y": 360,
        "wires": [
            [
                "d62ab3b0.b1d3f"
            ]
        ]
    },
    {
        "id": "6a5a8ffe.cd718",
        "type": "debug",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 990,
        "y": 440,
        "wires": []
    },
    {
        "id": "359e53f4.1e869c",
        "type": "inject",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "topic": "",
        "payload": "{\"cmd\": \"source-select\", \"param\": \"AUX\"}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 330,
        "y": 480,
        "wires": [
            [
                "31c8754a.ce7daa"
            ]
        ]
    },
    {
        "id": "fa1b487.31edab8",
        "type": "inject",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "topic": "",
        "payload": "{\"cmd\": \"volume-up\"}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 280,
        "y": 520,
        "wires": [
            [
                "31c8754a.ce7daa"
            ]
        ]
    },
    {
        "id": "2e98dcd3.afc844",
        "type": "inject",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "topic": "",
        "payload": "{\"cmd\": \"volume-down\"}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 270,
        "y": 560,
        "wires": [
            [
                "31c8754a.ce7daa"
            ]
        ]
    },
    {
        "id": "a7157bb1.e608b8",
        "type": "tcp request",
        "z": "d170aeb5.2c5c6",
        "server": "192.168.126.31",
        "port": "10025",
        "out": "sit",
        "splitc": " ",
        "name": "",
        "x": 740,
        "y": 440,
        "wires": [
            [
                "6a5a8ffe.cd718",
                "494d796d.574eb8"
            ]
        ]
    },
    {
        "id": "e99e4ce1.e7551",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr/src/:src",
        "method": "get",
        "swaggerDoc": "",
        "x": 190,
        "y": 200,
        "wires": [
            [
                "b26ac2e8.b11"
            ]
        ]
    },
    {
        "id": "b26ac2e8.b11",
        "type": "function",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "func": "\nvar params = msg.req.params,\n  command = {};\n\nif (params.src) {\n    command.cmd = 'source-selection',\n    command.param = params.src;\n} else if (params.volume) {\n    command.cmd = 'volume-' + params.volume;\n    command.param = '10';\n} else if (params.mute) {\n    command.cmd = 'mute-' + params.mute;\n} else if (params.cmd) {\n    command.cmd = params.cmd;\n    if (params.param) {\n        command.param = params.param;\n    }\n}\n\n\n\nmsg.payload = 'OK';\n\nreturn [msg, {payload: command}];",
        "outputs": "2",
        "noerr": 0,
        "x": 450,
        "y": 280,
        "wires": [
            [
                "c36c4c11.d937c"
            ],
            [
                "31c8754a.ce7daa",
                "913c1ff1.ada2f"
            ]
        ]
    },
    {
        "id": "c36c4c11.d937c",
        "type": "http response",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "x": 710,
        "y": 120,
        "wires": []
    },
    {
        "id": "50051e89.260d7",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr/volume/:volume",
        "method": "get",
        "swaggerDoc": "",
        "x": 160,
        "y": 240,
        "wires": [
            [
                "b26ac2e8.b11"
            ]
        ]
    },
    {
        "id": "aaf16cc8.ac2aa",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr/mute/:mute",
        "method": "get",
        "swaggerDoc": "",
        "x": 170,
        "y": 280,
        "wires": [
            [
                "b26ac2e8.b11"
            ]
        ]
    },
    {
        "id": "b9d490c6.f71ac",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr/cmd/:cmd",
        "method": "get",
        "swaggerDoc": "",
        "x": 180,
        "y": 320,
        "wires": [
            [
                "b26ac2e8.b11"
            ]
        ]
    },
    {
        "id": "53315a02.338224",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr/cmd/:cmd/:param",
        "method": "get",
        "swaggerDoc": "",
        "x": 150,
        "y": 360,
        "wires": [
            [
                "b26ac2e8.b11"
            ]
        ]
    },
    {
        "id": "64ced01.eb8863",
        "type": "template",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "<link href=http://getbootstrap.com/dist/css/bootstrap.min.css rel=stylesheet>\n\n<script>\nfunction call(cmd, param) {\n    \n    var r = new XMLHttpRequest(); \n    var url = \"avr/cmd/\" + cmd;\n    if (param) {\n        url = url + \"/\" + param;\n    }\n    r.open(\"GET\", url, true);\n    r.onreadystatechange = function () {\n    \tif (r.readyState != 4 || r.status != 200) return; \n    \tconsole.log(r.responseText);\n    };\n    r.send();\n    \n}\n</script>\n\n<div class=\"container text-center\">\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('power-on')\">on</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('sleep')\">sleep</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('power-off')\">off</button>\n</div>\n\n<br>\n<br>\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('volume-up')\">vol+</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('mute-toggle')\">mute+</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('volume-down')\">vol-</button>\n</div>\n\n<br>\n<br>\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'TV')\">TV</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Audio')\">Chromecast</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'STB')\">STB</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Game')\">PC</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'AUX')\">AUX</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Server')\">Binge</button>\n</div>\n\n<div class=\"btn-group\">\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Disc')\">Disc</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Cable Sat')\">Cable/SAT</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'vTuner')\">vTuner</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Home Network')\">Home Network</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'iPod')\">iPod</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'USB')\">USB</button>\n<button class=\"btn btn-default btn-lg\" onclick=\"call('source-selection', 'Radio')\">Radio</button>\n</div>\n\n</div>",
        "x": 390,
        "y": 120,
        "wires": [
            [
                "c36c4c11.d937c"
            ]
        ]
    },
    {
        "id": "6b66879.8b18378",
        "type": "http in",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "url": "/avr",
        "method": "get",
        "swaggerDoc": "",
        "x": 130,
        "y": 120,
        "wires": [
            [
                "64ced01.eb8863"
            ]
        ]
    },
    {
        "id": "7458ae1d.8570b",
        "type": "trigger",
        "z": "d170aeb5.2c5c6",
        "op1": "true",
        "op2": "false",
        "op1type": "bool",
        "op2type": "bool",
        "duration": "1000",
        "extend": false,
        "units": "ms",
        "reset": "",
        "name": "",
        "x": 920,
        "y": 620,
        "wires": [
            [
                "143d15d2.65462a"
            ]
        ]
    },
    {
        "id": "913c1ff1.ada2f",
        "type": "switch",
        "z": "d170aeb5.2c5c6",
        "name": "is heart-alive?",
        "property": "payload.cmd",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "heart-alive",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "outputs": 1,
        "x": 680,
        "y": 620,
        "wires": [
            [
                "7458ae1d.8570b"
            ]
        ]
    },
    {
        "id": "494d796d.574eb8",
        "type": "change",
        "z": "d170aeb5.2c5c6",
        "name": "reset",
        "rules": [
            {
                "t": "set",
                "p": "reset",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            },
            {
                "t": "delete",
                "p": "payload",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 710,
        "y": 540,
        "wires": [
            [
                "7458ae1d.8570b"
            ]
        ]
    },
    {
        "id": "143d15d2.65462a",
        "type": "debug",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 1130,
        "y": 620,
        "wires": []
    },
    {
        "id": "78a8534f.8f793c",
        "type": "inject",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "topic": "",
        "payload": "{\"cmd\": \"heart-alive\"}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 260,
        "y": 600,
        "wires": [
            [
                "31c8754a.ce7daa",
                "913c1ff1.ada2f"
            ]
        ]
    },
    {
        "id": "d62ab3b0.b1d3f",
        "type": "delay",
        "z": "d170aeb5.2c5c6",
        "name": "",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "2",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 830,
        "y": 360,
        "wires": [
            [
                "a7157bb1.e608b8"
            ]
        ]
    }
]
```


Allikad:

* https://gist.github.com/tomaszkubacki/8428d1d1c3d86818f534
* http://homematic-forum.de/forum/viewtopic.php?t=18971&p=157793
* https://github.com/KarimGeiger/HKAPI
