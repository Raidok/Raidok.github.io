---
layout: page
title: Täägid
---
{% capture get_items %}
 {% for post in site.categories.postitused %}
   {% for tag in post.tags %}
     {{ tag | first }}
   {% endfor %}
 {% endfor %}
{% endcapture %}
{% capture num_words %}
 {{ get_items | split:' ' |  sort | join:' ' | number_of_words }}
{% endcapture %}
{% for item in (1..num_words) %}
 <li>{{ get_items | split:' ' |  sort | join:' ' | truncatewords:item | remove:'.    ..' | split:' ' | last }}</li>
{% endfor %}
