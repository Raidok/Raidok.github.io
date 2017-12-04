

iptables -t mangle -A POSTROUTING -d 192.168.1.10 -j TEE --gateway 192.168.1.136
iptables -t mangle -A PREROUTING -s 192.168.1.10 -j TEE --gateway 192.168.1.136

iptables -t mangle -A PREROUTING -d 192.168.1.10 -j TEE --gateway 192.168.1.136
iptables -t mangle -A PREROUTING -s 192.168.1.10 -j TEE --gateway 192.168.1.136

This commands will make a copy of network traffic that have source and destination 192.168.1.100 and will send it to 192.168.1.101. On 192.168.1.101 can be run wireshark in order to sniff the traffic made by 192.168.1.100.

You can use:
iptables -t mangle -A POSTROUTING -d 0.0.0.0/0 -j ROUTE --tee --gw 192.168.1.101

iptables -t mangle -A PREROUTING -s 0.0.0.0/0 -j ROUTE --tee --gw 192.168.1.101

for copying all network traffic and sending it to 192.168.1.101, but i don't recommend it. You router will run slower. You should send only what you want to sniff.



[Port mirroring](http://www.dd-wrt.com/phpBB2/viewtopic.php?t=55128)
[iptables duplicate traffic to another ip](https://superuser.com/questions/853077/iptables-duplicate-traffic-to-another-ip)
https://github.com/charmyin/IPCTimeLapse
http://www.codegists.com/code/ipcam%20clock/



Sisselogimine:
{ "EncryptType" : "MD5", "LoginType" : "DVRIP-Web", "PassWord" : "tlJwpbo6", "UserName" : "admin" }


info:
C;vE@@9f
ihnHP!&Y{ "Name" : "SystemInfo", "Ret" : 100, "SessionID" : "0x7", "SystemInfo" : { "AlarmInChannel" : 1, "AlarmOutChannel" : 0, "AudioInChannel" : 1, "BuildTime" : "2016-12-20 18:50:36", "CombineSwitch" : 0, "DeviceRunTime" : "0x000000E0", "DigChannel" : 0, "EncryptVersion" : "Unknown", "ExtraChannel" : 0, "HardWare" : "50H20L_18EV200_S38", "HardWareVersion" : "Unknown", "SerialNo" : "80ddebc37a3b44b9", "SoftWareVersion" : "V4.02.R12.00018520.12010.143200.00000", "TalkInChannel" : 1, "TalkOutChannel" : 1, "UpdataTime" : "", "UpdataType" : "0x00000000", "VideoInChannel" : 1, "VideoOutChannel" : 1 } }





C;vE@@f
ihoP!Q{ "Name" : "SystemFunction", "Ret" : 100, "SessionID" : "0x00000007", "SystemFunction" : { "AlarmFunction" : { "AlarmConfig" : true, "BlindDetect" : true, "Consumer433Alarm" : false, "ConsumerRemote" : false, "IPCAlarm" : false, "LossDetect" : true, "MotionDetect" : true, "NetAbort" : true, "NetAbortExtend" : true, "NetAlarm" : true, "NetIpConflict" : true, "StorageFailure" : true, "StorageLowSpace" : true, "StorageNotExist" : true, "VideoAnalyze" : false }, "CommFunction" : { "CommRS232" : true, "CommRS485" : true }, "EncodeFunction" : { "CombineStream" : false, "DoubleStream" : true, "IFrameRange" : false, "LowBitRate" : false, "SmartH264" : false, "SnapStream" : true, "WaterMark" : false }, "InputMethod" : { "NoSupportChinese" : false }, "MobileDVR" : { "CarPlateSet" : false, "DVRBootType" : false, "DelaySet" : false, "GpsTiming" : false, "StatusExchange" : false }, "NetServerFunction" : { "MACProtocol" : false, "MonitorPlatform" : false, "NATProtocol" : false, "Net3G" : false, "Net4G" : false, "NetARSP" : true, "NetAlarmCenter" : true, "NetAnJuP2P" : false, "NetBaiduCloud" : false, "NetBjlThy" : false, "NetDAS" : true, "NetDDNS" : true, "NetDHCP" : true, "NetDNS" : true, "NetDataLink" : false, "NetEmail" : true, "NetFTP" : true, "NetGlobalEyes" : false, "NetGodEyeAlarm" : false, "NetIPFilter" : true, "NetIPv6" : false, "NetKaiCong" : false, "NetKeyboard" : false, "NetLocalSdkPlatform" : false, "NetMobile" : false


C;vE@@f
ihoP!#portModifyFrontcfg" : false, "SupportNVR" : false, "SupportNetLocalSearch" : false, "SupportOSDInfo" : false, "SupportOnvifClient" : false, "SupportPOS" : false, "SupportPWDSafety" : false, "SupportPlayBackExactSeek" : true, "SupportPtzIdleState" : false, "SupportRTSPClient" : false, "SupportResumePtzState" : false, "SupportSPVMNNasServer" : false, "SupportSetDigIP" : false, "SupportShowConnectStatus" : false, "SupportShowProductType" : false, "SupportSlowMotion" : false, "SupportSmallChnTitleFont" : false, "SupportSnapCfg" : false, "SupportSnapSchedule" : false, "SupportSplitControl" : false, "SupportStatusLed" : false, "SupportStorageFailReboot" : true, "SupportStorageNAS" : false, "SupportSwitchResolution" : false, "SupportTextPassword" : true, "SupportTimeZone" : true, "SupportUserProgram" : false, "SupportWIFINVR" : false, "SupportWriteLog" : true, "Supportonviftitle" : true, "SuppportChangeOnvifPort" : true, "TitleAndStateUpload" : true, "USBsupportRecord" : false }, "PreviewFunction" : { "GUISet" : false, "Tour" : false }, "TipShow" : { "NoBeepTipShow" : false, "NoDiskManagerButtonShow" : false, "NoEmailTipShow" : false, "NoFTPTipShow" : false } } }



C;vEW@@of
ihoZP!ZQ{ "DimenCode" : { "SN" : { "code" : "0x83FD717F097609ECA8BAEDD1374075DB5FE0A028D9807F553FA3D1006461EA1DB851EE53466E164A17723374103EFF57336F625563C2005F0B540DFD95D68EB2C24BB5F6A9DF17707F6D17200001D833", "size" : 25 }, "appAndroid" : { "code" : "0x83FC057FBD760A2CA3D2EDD23746E5DB5FE0AB68AD007F554974C5008F5F726B2015DE1DE39D31A1F1A2E250CE5A3C3862D706EEA2CE009F0CD42DFEA5DC891252CBBBFBE49CD75E7F0EAE2000012567", "size" : 25 }, "appIOS" : { "code" : "0x3FDF477F7608A1E8AEDD12B165DBA1425C83748C555FE09A715807F54214ED003DD834BA36917DE218FE3C5A32602A84D3B8D7A500EF330DD3474E8452D38B1C0FB505D229FB5C157FBE7F22FE3C26000AD7145F5D18ABAAEBADF396ED7666744120D225D637F5DC0000009B", "size" : 29 }, "otherInfo" : { "code" : "0x", "size" : 0 } }, "Name" : "DimenCode", "Ret" : 100, "SessionID" : "0x00000007" }
