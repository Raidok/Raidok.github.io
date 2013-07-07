---
layout: default
---

<div class="hero-unit">
    See on minu blogi. Jälgi.
</div>

{% for post in site.posts %}
  <div class="postitusAvalehel">
    {% capture kuu %}{{ post.date | date: "%m"  }}{% endcapture %}
    {% assign kuu = kuu | minus: 1 %}
    <p class="dashedBottom">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="date">{{ post.date | date: "%e"  }}{{paev}}. {{site.kuud[kuu]}} {{ post.date | date: "%Y"  }}</span>
    </p>
    {{ post.excerpt }}
  </div>
{% endfor %}

