---
layout: post
title: Building an NTP agent : Part 1
date: 2016-09-10 10:00:00
---

This series of blog posts covers my experiments with the NTP time protocol.

-------------

My home/media server has a small Grafana instance with a Spoon instance collecting
and reporting metrics to it (network stats, disk usage, etc..). It's been
running for quite a while now and I've used the stats for a bunch of things so
far. Recently I was adding an additional ping test metric and notices something
interesting while I was on the server:

```bash
macbook$ date && ssh ben@192.168.1.2 date
Sat Sep 10 10:09:40 SAST 2016       <-- time from macbook
Sat Sep 10 10:17:07 SAST 2016       <-- time from microserver

```

> Oops - Ben (2016)

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

### More to come..
