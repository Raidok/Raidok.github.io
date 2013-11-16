$(function() {
  // search
  var idx, data, inProgress = false;
  $('.header').click(function(){
    $('.welcome').attr('contentEditable', true);
    if (!idx && !inProgress) {
      inProgress = true;
      idx = lunr(function () {
        this.field('title', 10);
        this.field('content');
      });
      $.ajax({ url: "/posts.json", dataType: "json" }).done(function(result){
        data = result;
        for(var index in data) {
          idx.add(data[index]);
        }
        console.log('done');
      }).fail(function(data){
        console.log('failed');
      });
    }
  }).keydown(function(e) {
    if(e.keyCode == 13) {
      e.preventDefault();
      var welcome = $('.welcome');
      welcome.attr('contentEditable', false);
      var results = idx.search(welcome.text());
      var area = $('.results');
      for (result in results) {
        var div = $('<div>');
        var a = $('<a>');
        a.attr('href', data[result].url);
        a.append(data[result].title);
        div.append(a);
        area.append(div);
      }
    }
  });

  // lazy loading
  $("img.lazy").show().lazyload({
    effect : "fadeIn",
    threshold : 200
  });
});
