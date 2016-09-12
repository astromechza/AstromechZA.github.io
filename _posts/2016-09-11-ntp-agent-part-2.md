---
layout: post
title: Building an NTP agent - Part 2
date: 2016-09-11 11:04:00
---

See [Part 1](http://astromechza.github.io/2016/09/10/ntp-agent-part-1.html) of
this blog post for background.

Continuing in my goal to build an NTP update agent, this post will focus on
pulling multiple NTP packets from multiple upstream servers, filtering them, and
selecting a most accurate time to synchronise with.

Since the last post, I put in some work making sure my translation functions
between NTP and Time were as accurate as possible. I also refactored some things
around into separate modules. So this post is starting from commit [5b4dd295](https://github.com/AstromechZA/ntp-agent/commit/5b4dd295483394857504d1fc5dab836c0b109ec5).

---

### Progress updates before post:

- [2016/09/12] 5dfc6fb : studying sample code from ntp doc
