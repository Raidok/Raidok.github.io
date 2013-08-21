---
layout: default
---
<link rel="stylesheet" href="css/webicons.css"/>
<div class="hero-unit">
  <h3>See on minu blogi, aga jälgi mind ka mujal.</h3>
  
  <p class="ikoonid">
    <a class="webicon github" href="https://github.com/Raidok" >Github</a>
    <a class="webicon reddit" href="http://reddit.com/u/raidohh">Reddit</a>
    <a class="webicon youtube" href="http://www.youtube.com/user/nraido">YouTube</a>
    <a class="webicon blogger" href="http://raidok.blogspot.com">Reddit</a>
    <a class="webicon stackoverflow" href="http://stackoverflow.com/users/767678/raidok">Stack Overflow</a>
    <a class="webicon googleplus" href="https://plus.google.com/u/0/112015133391777262150">Google+</a>
    <a class="webicon instagram" href="http://instagram.com/raidohh">Instagram</a>
    <a class="webicon skype" href="skype:raido.kalbre?userinfo">Twitter</a>
    <a class="webicon twitter" href="https://twitter.com/raidohh">Twitter</a>
    <a class="webicon bitbucket" href="https://bitbucket.org/Raidok">Bitbucket</a>
    <a class="webicon facebook" href="#" onclick="alert('haha, nali')">Facebook</a>
  </p>
</div>

{% for post in site.categories.postitused %}
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

