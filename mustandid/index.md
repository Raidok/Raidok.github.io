---
layout: default
title: Mustandid
---

Kõik postitused, mis pole veel avaldatud:

{% for post in site.categories.mustandid %}
  <div>
    {% capture kuu %}{{ post.date | date: "%m"  }}{% endcapture %}
    {% assign kuu = kuu | minus: 1 %}
    <p class="dashedBottom">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="date">{{ post.date | date: "%e"  }}{{paev}}. {{site.kuud[kuu]}} {{ post.date | date: "%Y"  }}</span>
    </p>
  </div>
{% endfor %}

