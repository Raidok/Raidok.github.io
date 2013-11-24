$(function() {

  // language suggestion
  var language;
  setTimeout(function(){$.ajax({ 
      url: "http://ajaxhttpheaders.appspot.com", 
      dataType: 'jsonp', 
      success: function(headers) {
          language = headers['Accept-Language'];
          if (location.href.indexOf("/en/") == -1) {
            if (language.indexOf("en;") != -1) {
              $(".note").append('This blog is also available in English. Would You like to <a href="/en/">switch over</a>?');
              $(".note").fadeIn('slow');
            }
          }
      }
  })}, 100);

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
