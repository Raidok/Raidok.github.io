Raidoklogi
==========

Blogi põhineb [jekyll](http://jekyllrb.com/) staatiliste lehtede genereerimise mootoril.

Kuna [GitHub seda _hostib_](http://pages.github.com/) ja nende pakutav teenus laiendusi ei luba, siis iga kell ja vile lehe juures nõuab korralikku [Liquid markupiga](http://liquidmarkup.org/) _häkkimist_.

**Mõningad trikid, mis ma selles blogis teinud olen:**

* Postitused saab jagada kategooriatesse ja neid kategooriate kaupa näiteks nimekirjana kuvada (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/postitused/index.md))
* Postitustele saab lisada tääge (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_posts/2013-06-25-raspberry-pi-tarkvara-uuendamine.md)) ja postituste lehtedel kuvatakse seotud täägide nimekirju (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_includes/tags.html)), täägide lehed teen käsitsi (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_posts/2001-01-01-android.md))
* Eestikeelsed kuude nimetused kuupäevades (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_includes/postbox.html) ja [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_config.yml))
* Postitused jagatakse 20 kaupa lehtedele. Kuna postituste kategooriate süsteemi on kasutatud ka täägide lehtede jaoks, teeb see jekyll pagination-i katki, kuid on olemas _workaraound_ (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/index.html))
* Postitustevaheline navigeerimine (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/_includes/postnavigation.html), [allikas](https://github.com/mojombo/jekyll/issues/260a))
* Postitused väljastatakse ka RSS voona, mis on ka RSS-voogude lugejate jaoks automaatselt leitavad (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/feed.xml) ja [siia](https://github.com/Raidok/Raidok.github.io/commit/1835503208019bbd76178e49d326914320735078), [allikas](https://github.com/snaptortoise/jekyll-rss-feeds))
* Otsingumootorite tarbeks genereeritakse sitemap.xml (vt [siia](https://github.com/Raidok/Raidok.github.io/blob/master/sitemap.xml), [allikas](http://davidensinger.com/2013/11/building-a-better-sitemap-xml-with-jekyll/))

**Tulekul:**

* Disqus kommentaariumite integreerimine lehega, kui selle eestikeelne tõlge laivi läheb.

## Litsents
<a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.et"><img alt="Creative Commonsi litsents" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/80x15.png" /></a><br />See teos on litsentseeritud <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.et">Creative Commonsi Autorile viitamine 3.0 Jurisdiktsiooniga sidumata litsentsiga</a>.
