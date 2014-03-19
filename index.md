---
layout: default
title: Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}

{% assign posts_collate = site.posts %}
{% include JB/posts_collate %}