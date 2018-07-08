---
layout: post
title: Basic Jekyll Blog Tutorial
date: 2014-03-23 18:04:10
---

This will be a purely functional tutorial, just a barebones blog.

Prerequisites:

- Jekyll Gem (```gem install jekyll```) either via Gemfile or system.


### 1) Basic setup
Create Jekyll project
{% highlight bash linenos=table %}
$ mkdir blog && cd blog
$ echo "source 'http://rubygems.org'\n\ngem 'jekyll'" > Gemfile
$ bundle install
{% endhighlight %}

Now you can test the website using ```$ bundle exec jekyll serve``` at any time.

Create a '\_config.yml' containing:
{% highlight yaml linenos=table %}
# website title & tagline
title : A Simple Blog
tagline: Using Jekyll

# exclude these files from being copied into _site
exclude: [".gitignore", "Gemfile", "Gemfile.lock"]

# we will need this for later
permalink: date
{% endhighlight %}

Create some important directories
- ```_layouts/``` for html layouts
- ```_includes/``` for partials
- ```assets/``` we'll use this for static assets like css/js/images..

<br>

### 2) Create an index page
The index page will be the default page users see when they view the blog

Create an index page. We could do it like the following:
{% highlight html linenos=table %}
<!DOCTYPE html>
<html>
<head>
    <title>{{ "{{ site.title " }}}}</title>
</head>
<body>
index page
</body>
</html>
{% endhighlight %}

But instead, lets take advantage of Layouts:

```_layouts/default.html```
{% highlight html linenos=table %}
<!DOCTYPE html>
<html>
<head>
    <title>{{ "{{ site.title " }}}}</title>
</head>
<body>
{{ "{{ content " }}}}
</body>
</html>
{% endhighlight %}

```index.html```
{% highlight html linenos=table %}
---
layout: default
---
index page
{% endhighlight %}

<br>

### 3) Add in some bootstrap
```_layouts/default.html```
{% highlight html linenos=table %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ "{{ site.title " }}}} : {{ "{{ page.title " }}}}</title>

    {{ "{% include css.partial.html " }}%}

    {{ "{% include js.partial.html " }}%}
</head>
<body>

    {{ "{% include nav.partial.html " }}%}

    <div class="container narrow-container content-container">
        {{ "{{ content " }}}}
    </div>

</body>
</html>
{% endhighlight %}

```css.partial.html```
{% highlight html linenos=table %}
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
{% endhighlight %}

```js.partial.html```
{% highlight html linenos=table %}
<script src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
{% endhighlight %}

```nav.partial.html```
{% highlight html linenos=table %}
<div class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container narrow-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/index.html">{{ "{{ site.title " }}}} <small>{{ "{{ site.tagline " }}}}</small></a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <!-- some random link -->
                <li><a href="http://google.com"><i class="fa fa-search fa-lg"></i> Google</a></li>
            </ul>
        </div>
    </div>
</div>
{% endhighlight %}

<br>

### 4) Create a couple blog posts
To make testing easier lets make 2 test posts. Create 2 files in the ```_posts/``` directory. Because the file names end in '.md', we can use simple markdown formatting.

```_posts/2014-01-01-test-post-one.md```
{% highlight text linenos=table %}
---
layout: default
title: Test Post One
---

Test content number one

{% endhighlight %}

```_posts/2014-01-02-test-post-two.md```
{% highlight text linenos=table %}
---
layout: default
title: Test Post Two
---

Test content number two

{% endhighlight %}

<br>

### 5) List them in the index page
```index.html```
{% highlight html linenos=table %}
---
layout: default
title: Home
---
<ul>
{{ "{% for post in site.posts " }}%}
    <li><a href="{{ "{{ post.url " }}}}">{{ "{{ post.date | date_to_string " }}}} <small>{{ "{{ post.title " }}}}</small></a></li>
{{ "{% endfor " }}%}
</ul>
{% endhighlight %}

So for now we have an index page which lists links to all of the blog posts. Each blog post and the index page contains a nav bar with links.

<br>

### 6) A Post layout
We want to add a bit more formatting. Specifically, links to next/previous posts and Post headers.

Jekyll is capable of nested layouts, so we can create a ```post``` layout that inherits the ```default``` layout:

```_layouts/post.html```
{% highlight html linenos=table %}
---
layout: default
---

<div class="page-header">
  <h2>{{ "{{ page.title " }}}} <small>{{ " {{ page.date | date_to_string " }}}}</small></h2>
</div>

<div class="post-content">
    {{ "{{ content " }}}}
</div>

<div class="postnavlinks">
    <div class="clearfix"></div>
    {{ "{% if page.previous.url " }}%}
        <div class="pull-left">
            <a href="{{ "{{ page.previous.url " }}}}"><i class="fa fa-arrow-left"></i> {{ "{{ page.previous.title " }}}} [older]</a>
        </div>
    {{ "{% endif " }}%}
    {{ "{% if page.next.url " }}%}
        <div class="pull-right">
            <a href="{{ "{{ page.next.url " }}}}">[newer] {{ "{{ page.next.title " }}}} <i class="fa fa-arrow-right"></i></a>
        </div>
    {{ "{% endif " }}%}
    <div class="clearfix"></div>
</div>

{% endhighlight %}

And change the 'layout' parameter in each post to 'post'.

<br>

### 7) Profit
An index page:

![Index page](/assets/img/tut1_img1.jpg)


Post one:

![Post one](/assets/img/tut1_img2.jpg)


Post two:

![Post two](/assets/img/tut1_img3.jpg)

Now you can create a pretty beastly blog by adding content, styles, and leveraging the rest of Boostrap and Jekyll.

Helpful links:

- Jekyll homepage <http://jekyllrb.com/>
- Bootstrap docs <http://getbootstrap.com/css/>
- How to host a Jekyll site on github pages <https://help.github.com/articles/using-jekyll-with-pages>
- Github flavoured markdown <https://help.github.com/articles/github-flavored-markdown>