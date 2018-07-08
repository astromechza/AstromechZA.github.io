---
layout: post
title: The birth of this blog
date: 2014-03-22 22:00:00
---

Today (or rather late last night) I came across [Jekyll](http://jekyllrb.com) an interesting static site generation framework. Based off a Ruby Gem, it uses some simple rules to transform marked-up text into a good static website with templating and layouts. One awesome feature is that it has been built into the Github Pages system, so although the Ruby gem and environment is needed for running locally, it gets built and processed by Github Pages when you push it to your user page. This means great templating and quite a lot of power for a personal site, or small website.

I'm not going to go into what it does, as you can read that for yourself in the [documentation](http://jekyllrb.com/docs/structure/), but some of the features I particularly like are:
- Pseudo CSS variables using partials and front-formats
- Ability to have nest layout files
- Built in support for Year/Month/Day/Title blog posts
- Yaml EVERYWHERE
- Very simple rules for what gets copied where when the website is built
- The \_includes system is very useful and can be used for many different things like html partials, code separation, etc.

If you want to check out the code that has gone into this website, check it out in this repository: [AstromechZA/AstromechZA.github.io](https://github.com/AstromechZA/AstromechZA.github.io)

What I really like is that I can use Git to modify and maintain the website, I can write posts in Markdown form, and publish them very quickly using a simple ```git push```. It should integrate pretty well into my workflow.

This is by no means my first tech related blog, my other blog is still hosted here: [benmeier.co.za](http://benmeier.co.za)

Edit: Because its hosted in a github repo and processed via Jekyll ON github, I can add posts from the repository view on Github with no complications. Awesome.

~

On a random note, this was the view from Chapmans Peak Drive on Friday:
![Chapmans Peak 21/03/2014](/assets/img/chappies.jpg)

