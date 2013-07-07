---
layout: default
---

<div class="hero-unit">
    See on minu blogi. Jälgi.
</div>

{% for post in site.posts %}
  <div class="separator">
    <p class="dashedBottom"><a href="{{ post.url }}">{{ post.title }}</a><span class="date">{{ post.date | date: "%e %B %Y"  }}</span></p>
    
    {{ post.excerpt }}
  </div>
{% endfor %}

