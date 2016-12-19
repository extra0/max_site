$(function(){

	// замена телефонов по клику на города в header
	$('.js-phone-trigger').on('click', function(){
		$('.js-phone-trigger').removeClass('active');
		$(this).addClass('active');
		$('.js-phone-holder').html($(this).attr('data-phone'));
		$('.js-phone-holder').attr('href', 'tel:+'+ $(this).attr('data-phone').replace(/[^0-9]/g, "") +'');
	});


	// определяем мобильный ли браузер
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// удалем видео на IOS
	if (isMobile.iOS()) {
		$('.header__video').remove();
	}





});