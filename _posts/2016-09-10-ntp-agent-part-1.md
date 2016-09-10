---
layout: post
title: Building an NTP agent : Part 1
date: 2016-09-10 11:01:40
---

My home/media server has a small Grafana instance with a [Spoon](http://github.com/AstromechZA/spoon)
instance collecting and reporting metrics to it (network stats, disk usage, etc..). It's been
running for quite a while now and I've used the stats for a bunch of things so
far. Recently I was adding an additional ping test metric and noticed something
interesting while I was on the server:

```bash
macbook$ date && ssh ben@192.168.1.2 date
Sat Sep 10 10:09:40 SAST 2016       <-- time from macbook
Sat Sep 10 10:17:07 SAST 2016       <-- time from microserver
```

> Oops

The time was REALLY out of sync. I'm not too suprised though. The server isn't
running an NTP update daemon and it's a shitty little microserver which has had
time issues in the past. In the age of NTP, hardware clocks don't *have* to be
as reliable as they could be.

For those that don't know. NTP (Network Time Protocol) is an age old and
time-proven protocol for synchronising a large number of servers clocks. It is
basically structured like a hierarchy of "strata" with a few super-reliable,
super-accurate time sources in "Stratum 0" connected to time servers in
"Stratum 1" with layers of descendent servers in peer-to-peer networks below them.

![NTP strata](/assets/img/2016-09-10/stratum.png)

I started going through the process of looking at how to setup NTP update on
an Ubuntu server, but halfway through that I thought:

> How hard can building an NTP update client be?? It's just getting an accurate
time and pushing your local clock towards that... right?

My knowledge of NTP before this was redimentary: I knew there were hierachies of
time servers but had no idea of the complexity of the communication protocol.
This series of blog posts will hopefully shed some light on that as I work
through building my own NTP client.

--------

### 1. Who are my upstream servers and how do I communicate with them?

Looking at the stratum diagram, my server is in stratum "N". I need to pull time
information from stratum "N-1" or from other peers on the network. Since I don't
have any peers, I'll need to rely on some NTP pool servers. The organisation at
[www.pool.ntp.org](http://www.pool.ntp.org/en/use.html) has a great explanation
of how their pools work and various other considerations and also allows you to
drill down and target specific continent or country local servers.

At the time of writing:

- pool.ntp.org had 2635 servers
- africa.pool.ntp.org had 33
- za.pool.ntp.org had 21

I'm going to be using the `za` pool for my experiments, just to keep latency
down, but it should be completely configurable. ntp.org allows you to address
the pool using the four domains `{0,1,2,3}.za.pool.ntp.org`.

Each of the addresses that those domains resolve to is listening on the NTP port
`123` for UDP packets. It's great that NTP uses UDP since this makes writing
a client *much* easier than a TCP protocol.

The best description of the NTP protocol I could find was this
[90 page PDF](https://www.eecis.udel.edu/~mills/database/reports/ntp4/ntp4.pdf).
Pretty heavy reading, but the most reliable source I could find that had
text, diagrams, and sample source code for the algorithms.

The simplest UDP client packet that can be sent is almost completely zeroes. The
ownly filled in fields of the 48 byte packet are the 3-bit version and 3-bit mode
at the start. This outgoing packet will get a little more filled in later. But
this is the minimum required to get a response from an NTP server.

```
00 011 011 0000000000....000
   --- ---
```

For more details of what all the fields mean look at page 11 and 43 of the
pdf.

A quick client in Golang to send an NTP request to multiple upstream servers:

```golang
func getNTP(server string) (*[]byte, error) {
    svrAddr, err := net.ResolveUDPAddr("udp", fmt.Sprintf("%s:%d", server, 123))
    if err != nil { return nil, err }

    conn, err := net.DialUDP("udp", nil, svrAddr)
    if err != nil { return nil, err }

    defer conn.Close()

    buf := make([]byte, 48)
    buf[0] = 0x1B
    _, err = conn.Write(buf)
    if err != nil { return nil, err }

    inbuf := make([]byte, 1024)
    n, _, err := conn.ReadFromUDP(inbuf)
    if err != nil { return nil, err }
    response := inbuf[:n]
    return &response, nil
}

...

    for _, server := range flag.Args() {
        r, err := getNTP(server)
        if err != nil {
            fmt.Println(err.Error())
        } else {
            fmt.Printf("%x\n", *r)
        }
    }
```

Net us:

```
$ ./ntp-blog 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org
1c0305ed00002c4900000f3b10a1d288db7e4a1c26d5d5e20000000000000000db7e4dd48ca0ebd1db7e4dd48cabb83e
1c0300ec0000014000000644294e8011db7e4daf22d3e5e60000000000000000db7e4dd498cd5e82db7e4dd498cdf83a
1c0203eb00000058000008e32949280bdb7e4a8d7d2e3c0d0000000000000000db7e4dd4a37d57cbdb7e4dd4a37ee3be
1c0303e80000362700001505c550447bdb7e46800def4dd30000000000000000db7e4dd4af70612cdb7e4dd4af7380ad
```

Seems legit. Next is parsing those responses.
