---
layout: post
title: Blogipidamine Jekylliga
categories: postitused
tags: 
image: jekyll.png
---
Staatiline blogi!

{% include select-os.html param="Debian/Ubuntu,OS X" %}

Paigaldame ruby ja gemmid:

<div class="tab-content"><div class="tab-pane active" id="debian_ubuntu">
{% highlight bash %}
sudo apt-get install ruby rubygems for $PATH if elsif
{% endhighlight %}
</div>
<div class="tab-pane" id="osx">
{% highlight bash %}
sudo brew install ruby rubygems
{% endhighlight %}
</div>
</div>

Jekyll on mugavalt gemmi abil installeeritav:

    sudo gem install jekyll

Hiljem tõenäoliselt tekib viga `gem_original_require': no such file to load -- json (LoadError)`, selle lahendab JSON gemmi installimine:

    sudo gem install json

