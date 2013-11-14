$('.welcome').bind('dblclick', function(){
  $(this).attr('contentEditable',true);
}).blur(function(){
  $(this).attr('contentEditable', false);
  if (localStorage) localStorage.setItem('welcome', $(this).text());
});
$(function() {
	if ($('.welcome').text().length === 0)
		setTimeout(function(){
  		var txt = localStorage.getItem('welcome') || 'hei';
  		$('.welcome').hide().text(txt).fadeIn('slow');
		}, 2000)
});
