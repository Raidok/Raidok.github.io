---
layout: default
---
<link rel="stylesheet" href="css/webicons.css"/>
<div class="hero-unit">
  <h3>See on minu blogi, aga jälgi mind ka mujal.</h3>
  
  <p class="ikoonid">
    <a class="webicon github" href="https://github.com/Raidok" >GitHub</a>
    <a class="webicon blogger" href="http://raidok.blogspot.com">Blogger</a>
    <a class="webicon stackoverflow" href="http://stackoverflow.com/users/767678/raidok">Stack Overflow</a>
    <a class="webicon skype" href="skype:raido.kalbre?userinfo">Skype</a>
    <a class="webicon twitter" href="https://twitter.com/raidohh">Twitter</a>
    <a class="webicon facebook" href="#" onclick="alert('haha, nali')">Facebook</a>
  </p>
</div>

{% for post in site.categories.postitused %}
  <div class="postitusAvalehel">
    {% if post.image %}<div class="pildipool"><a href="{{ post.url }}"><img src="/img/{{ post.image }}"></a></div>{% endif %}{% capture kuu %}{{ post.date | date: "%m"  }}{% endcapture %}{% assign kuu = kuu | minus: 1 %}
    <div class="tekstipool">
      <div class="dashedBottom">
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span class="date">{{ post.date | date: "%e"  }}{{paev}}. {{site.kuud[kuu]}} {{ post.date | date: "%Y"  }}</span>
      </div>
      {{ post.excerpt }}
    </div>
  </div>
{% endfor %}

