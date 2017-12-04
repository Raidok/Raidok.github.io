

screen /dev/tty.SLAB_USBtoUART 115200,cs8,parenb,-parodd,-cstopb

brew cask install tftpserver



Writing ErrCtl register=00000000
Readback ErrCtl register=00000000
Memory: 25840k/32768k available (1866k kernel code, 6928k reserved, 450k data, 120k init, 0k highmem)
NR_IRQS:128
plat_time_init: plat time init done
Calibrating delay loop... 433.15 BogoMIPS (lpj=866304)
Mount-cache hash table entries: 512

****************ALLOC***********************
 Packet mem: 80275420 (0x400000 bytes)
********************************************

NET: Registered protocol family 16
ath_pcibios_init: bus 0
***** Warning PCIe 0 H/W not found !!!
registering PCI controller with io_map_base unset
bio: create slab <bio-0> at 0
NET: Registered protocol family 2
IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
TCP established hash table entries: 1024 (order: 1, 8192 bytes)
TCP bind hash table entries: 1024 (order: 0, 4096 bytes)
TCP: Hash tables configured (established 1024 bind 1024)
TCP reno registered
NET: Registered protocol family 1
ATH GPIOC major 0
squashfs: version 4.0 (2009/01/31) Phillip Lougher
msgmni has been set to 50
io scheduler noop registered
io scheduler deadline registered (default)
Serial: 8250/16550 driver, 1 ports, IRQ sharing disabled
serial8250.0: ttyS0 at MMIO 0xb8020000 (irq = 19) is a 16550A
console [ttyS0] enabled
PPP generic driver version 2.4.2
NET: Registered protocol family 24
5 cmdlinepart partitions found on MTD device ath-nor0
Creating 5 MTD partitions on "ath-nor0":
0x000000000000-0x000000020000 : "u-boot"
0x000000020000-0x000000120000 : "kernel"
0x000000120000-0x0000003e0000 : "rootfs"
0x0000003e0000-0x0000003f0000 : "config"
0x0000003f0000-0x000000400000 : "art"
->Oops: flash id 0xc84016 .
Ooops, why the devices couldn't been initialed?
TCP cubic registered
NET: Registered protocol family 10
NET: Registered protocol family 17
802.1Q VLAN Support v1.8 Ben Greear <greearb@candelatech.com>
All bugs added by David S. Miller <davem@redhat.com>
athwdt_init: Registering WDT success
VFS: Mounted root (squashfs filesystem) readonly on device 31:2.
Freeing unused kernel memory: 120k freed
init started:  BusyBox v1.01 (2016.04.06-03:18+0000) multi-call binary
This Board use 2.6.31
xt_time: kernel timezone is -0000
nf_conntrack version 0.5.0 (512 buckets, 5120 max)
ip_tables: (C) 2000-2006 Netfilter Core Team
insmod: cannot open module `/lib/modules/2.6.31/kernel/iptable_raw.ko': No such file or directory
insmod: cannot open module `/lib/modules/2.6.31/kernel/flashid.ko': No such file or directory
PPPoL2TP kernel driver, V1.0
PPTP driver version 0.8.3
insmod: cannot open module `/lib/modules/2.6.31/kernel/harmony.ko': No such file or directory
insmod: cannot open module `/lib/modules/2.6.31/kernel/af_key.ko': No such file or directory
insmod: cannot open module `/lib/modules/2.6.31/kernel/xfrm_user.ko': No such file or directory
qca955x_GMAC: Length per segment 1536
953x_GMAC: qca953x_gmac_attach
Link Int Enabled
qca953x_set_gmac_caps  CHECK DMA STATUS
mac:1 Registering S27....
qca955x_GMAC: RX TASKLET - Pkts per Intr:18
qca955x_GMAC: Max segments per packet :   1
qca955x_GMAC: Max tx descriptor count :   511
qca955x_GMAC: Max rx descriptor count :   128
qca955x_GMAC: Mac capability flags    :   2D81
953x_GMAC: qca953x_gmac_attach
Link Int Enabled
qca953x_set_gmac_caps  CHECK DMA STATUS
mac:0 Registering S27....
qca955x_GMAC: RX TASKLET - Pkts per Intr:18
qca955x_GMAC: Max segments per packet :   1
qca955x_GMAC: Max tx descriptor count :   511
qca955x_GMAC: Max rx descriptor count :   128
qca955x_GMAC: Mac capability flags    :   2581

 (none) mips #22 Wed Apr 6 11:15:00 CST 2016 (none)
(none) login: [A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[Aathr_gmac_ring_alloc Allocated 8176 at 0x81d9c000
athr_gmac_ring_alloc Allocated 2048 at 0x81e5e800
HONEYBEE ----> S27 PHY MDIO
ATHRS27: resetting s27
ATHRS27: s27 reset done
++++ athrs27_igmp_setup once
port0 vid is 0xb000b
port1 vid is 0x30003
port2 vid is 0x50005
port3 vid is 0x70007
port4 vid is 0x90009
++ PVID: 0x0000000b, bitmap: 0x0000001f
++ PVID: 0x00000003, bitmap: 0x0000001f
++ PVID: 0x00000005, bitmap: 0x0000001f
++ PVID: 0x00000007, bitmap: 0x0000001f
++ PVID: 0x00000009, bitmap: 0x0000001f
vtable vid: 0x00000002, bitmap 0x00000003
vtable vid: 0x00000004, bitmap 0x00000005
vtable vid: 0x00000006, bitmap 0x00000007
vtable vid: 0x00000008, bitmap 0x00000009
vtable vid: 0x0000000a, bitmap 0x0000000b
vtable vid: 0x0000000c, bitmap 0x0000000d
vtable vid: 0x0000000e, bitmap 0x0000000f
vtable vid: 0x00000010, bitmap 0x00000011
vtable vid: 0x00000012, bitmap 0x00000013
vtable vid: 0x00000014, bitmap 0x00000015
vtable vid: 0x00000016, bitmap 0x00000017
vtable vid: 0x00000018, bitmap 0x00000019
vtable vid: 0x0000001a, bitmap 0x0000001b
vtable vid: 0x0000001c, bitmap 0x0000001d
vtable vid: 0x0000001e, bitmap 0x0000001f
vtable vid: 0x00000020, bitmap 0x00000021
Setting Drop CRC Errors, Pause Frames and Length Error frames
Setting PHY...
[A[A[A[A[A[A[A[AADDRCONF(NETDEV_UP): eth0: link is not ready
[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[Bathr_gmac_ring_alloc Allocated 8176 at 0x81c54000
athr_gmac_ring_alloc Allocated 2048 at 0x81f11000
HONEYBEE ----> S27 PHY MDIO
Setting Drop CRC Errors, Pause Frames and Length Error frames
Setting PHY...
enet1 port3 up 100Mbps Full duplex
953x_GMAC: Enet Unit:1 PHY:3 is UP eth1  RGMII  1000Mbps  full duplex
953x_GMAC: done cfg2 0x7215 ifctl 0x0 miictrl
Setting Drop CRC Errors, Pause Frames and Length Error frames
[A[A[A[A[A[A[A[ADDRCONF(NETDEV_UP): eth1: link is not ready
A[A[A[A[A[A[A[A[ADDRCONF(NETDEV_CHANGE): eth0: link becomes ready
A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[Adevice eth0 entered promiscuous mode
athr_gmac_ring_free Freeing at 0x81c54000
athr_gmac_ring_free Freeing at 0x81f11000
athr_gmac_ring_alloc Allocated 8176 at 0x81ee6000
athr_gmac_ring_alloc Allocated 2048 at 0x81f11000
HONEYBEE ----> S27 PHY MDIO
Setting Drop CRC Errors, Pause Frames and Length Error frames
Setting PHY...
ADDRCONF(NETDEV_UP): eth1: link is not ready
athr_gmac_ring_free Freeing at 0x81d9c000
athr_gmac_ring_free Freeing at 0x81e5e800
athr_gmac_ring_alloc Allocated 8176 at 0x81c60000
athr_gmac_ring_alloc Allocated 2048 at 0x81e5e800
HONEYBEE ----> S27 PHY MDIO
Setting Drop CRC Errors, Pause Frames and Length Error frames
Setting PHY...
ADDRCONF(NETDEV_UP): eth0: link is not ready
enet1 port3 up 100Mbps Full duplex
953x_GMAC: Enet Unit:1 PHY:3 is UP eth1  RGMII  1000Mbps  full duplex
953x_GMAC: done cfg2 0x7215 ifctl 0x0 miictrl
Setting Drop CRC Errors, Pause Frames and Length Error frames
ADDRCONF(NETDEV_CHANGE): eth0: link becomes ready
br0: port 1(eth0) entering forwarding state
nf_conntrack_rtsp v0.6.21 loading
nf_nat_rtsp v0.6.21 loading
IPv6 over IPv4 tunneling driver
qca955x_GMAC: GE0 RX DMA ENABLE
blockWps_proc_write 1228: write value = 0






Pärast R26 eemaldamist:

U-Boot 1.1.4 (Apr  6 2016 - 11:12:21)

ap143-2.0 - Honey Bee 2.0

DRAM:  32 MB
Flash Manuf Id 0xc8, DeviceId0 0x40, DeviceId1 0x16
flash size 4MB, sector count = 64
Flash:  4 MB
Using default environment

In:    serial
Out:   serial
Err:   serial
Net:   ath_gmac_enet_initialize...
ath_gmac_enet_initialize: reset mask:c02200
Scorpion ---->S27 PHY*
S27 reg init
: cfg1 0x800c0000 cfg2 0x7114
eth0: ba:be:fa:ce:08:41
athrs27_phy_setup ATHR_PHY_CONTROL 4 :1000
athrs27_phy_setup ATHR_PHY_SPEC_STAUS 4 :10
eth0 up
Honey Bee ---->  MAC 1 S27 PHY *
S27 reg init
ATHRS27: resetting s27
ATHRS27: s27 reset done
: cfg1 0x800c0000 cfg2 0x7214
eth1: ba:be:fa:ce:08:41
athrs27_phy_setup ATHR_PHY_CONTROL 0 :1000
athrs27_phy_setup ATHR_PHY_SPEC_STAUS 0 :10
athrs27_phy_setup ATHR_PHY_CONTROL 1 :1000
athrs27_phy_setup ATHR_PHY_SPEC_STAUS 1 :10
athrs27_phy_setup ATHR_PHY_CONTROL 2 :1000
athrs27_phy_setup ATHR_PHY_SPEC_STAUS 2 :10
athrs27_phy_setup ATHR_PHY_CONTROL 3 :1000
athrs27_phy_setup ATHR_PHY_SPEC_STAUS 3 :10
eth1 up
eth0, eth1
Setting 0x181162c0 to 0x60c1a100
is_auto_upload_firmware=0
Autobooting in 1 seconds
## Booting image at 9f020000 ...
   Uncompressing Kernel Image ... OK

Starting kernel ...

Booting QCA953x
Linux version 2.6.31 (tomcat@buildserver) (gcc version 4.3.3 (GCC) ) #22 Wed Apr 6 11:15:00 CST 2016
Ram size passed from bootloader =32M
flash_size passed from bootloader = 4
CPU revision is: 00019374 (MIPS 24Kc)
ath_sys_frequency: cpu apb ddr apb cpu 650 ddr 392 ahb 216
Determined physical RAM map:
 memory: 02000000 @ 00000000 (usable)
Zone PFN ranges:
  Normal   0x00000000 -> 0x00002000
Movable zone start PFN for each node
early_node_map[1] active PFN ranges
    0: 0x00000000 -> 0x00002000
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 8128
Kernel command line: console=ttyS0,115200 root=31:2 rootfstype=squashfs init=/sbin/init mtdparts=ath-nor0:128k(u-boot),1024k(kernel),2816k(rootfs),64k(config),64k(art) mem=32M
PID hash table entries: 128 (order: 7, 512 bytes)
Dentry cache hash table entries: 4096 (order: 2, 16384 bytes)
Inode-cache hash table entries: 2048 (order: 1, 8192 bytes)
Primary instruction cache 64kB, VIPT, 4-way, linesize 32 bytes.
Primary data cache 32kB, 4-way, VIPT, cache aliases, linesize 32 bytes
Writing ErrCtl register=00000000
Readback ErrCtl register=00000000
Memory: 25840k/32768k available (1866k kernel code, 6928k reserved, 450k data, 120k init, 0k highmem)
NR_IRQS:128
plat_time_init: plat time init done
Calibrating delay loop... 433.15 BogoMIPS (lpj=866304)
Mount-cache hash table entries: 512







* [](https://wiki.openwrt.org/doc/howto/generic.flashing.tftp)
* [](http://www.dd-wrt.com/phpBB2/viewtopic.php?t=306359&sid=63de7ea24a6c8b774b09a29246f2aaef)
