$('.welcome').bind('dblclick', function(){
  $(this).attr('contentEditable',true);
}).blur(function(){
  $(this).attr('contentEditable', false);
  if (localStorage) localStorage.setItem('welcome', $(this).text());
});
$(setTimeout(function(){
  var txt = localStorage.getItem('welcome') || 'hei';
  $('.welcome').hide().text(txt).fadeIn('slow');
}, 2000));
