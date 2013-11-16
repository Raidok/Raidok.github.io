$(function() {

  // lazy loading
  $("img.lazy").show().lazyload({
    effect : "fadeIn",
    threshold : 200
  });

  // easteregg
  function save(that) {
    $(that).attr('contentEditable', false);
    if (localStorage) localStorage.setItem('welcome', $(that).text());
  }

  $('.welcome').bind('dblclick', function(){
    $(this).attr('contentEditable',true);
  }).blur(function(){
    save(this);
  }).keydown(function(e) {
    if(e.keyCode == 13) {
      save(this);
      e.preventDefault();
    }
  });

  if ($('.welcome').text().length === 0)
    setTimeout(function(){
      var txt = localStorage.getItem('welcome') || 'hei';
      $('.welcome').hide().text(txt).fadeIn('slow');
    }, 2000)
});
