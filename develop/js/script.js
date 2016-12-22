$(function() {

	// фенсибокс
	$('.js-fancybox').fancybox();

	// замена телефонов по клику на города в header
	$('.js-phone-trigger').on('click', function() {
		$('.js-phone-trigger').removeClass('active');
		$(this).addClass('active');
		$('.js-phone-holder').html($(this).attr('data-phone'));
		$('.js-phone-holder').attr('href', 'tel:+' + $(this).attr('data-phone').replace(/[^0-9]/g, "") + '');
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


	// собираем проекты  при скролле
	function elBuilding() {
		$('.portfolio__block').each(function() {
			var m_height = $(this).offset().top - $(window).scrollTop() - $(window).height() + 300,
				e_offset = 100,
				range = 0;
			if (m_height <= 50 && m_height >= -240) {
				range = m_height / 13 + 30;
			} else if (m_height > 50) {
				range = 60;
			} else if (m_height < -240) {
				range = 0;
			}

			$(this).find('.right-to-left').css('transform', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + (range) + ', 0, 0, 1)');
			$(this).find('.left-to-right').css('transform', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + (-range) + ', 0, 0, 1)');
		});
	}

	// меняем позиции элементов преимуществ при скролле
	function advElPosition() {
		$('.advantages__el').each(function() {
			var m_height = $(this).offset().top - $(window).scrollTop() - $(window).height() + 300,
				e_offset = 100,
				range = 0;
			if (m_height <= 50 && m_height >= -1000) {
				range = m_height / 13 + 30;
			} else if (m_height > 50) {
				range = 60;
			} else if (m_height < -1000) {
				range = -50;
			}

			$(this).css('transform', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + range + ', 0, 1)');
		});
	}

	elBuilding();

	$(window).on('scroll load resize', function() {
		elBuilding();
		advElPosition();
	});


	// задаем разные позиции превьюхам картинок рекомендаций
	$('.recommendations__thumb').each(function(i) {
		for (k = 1; k <= i; k++) {
			rand = ((Math.random() * 15) - 5);
			$(this).css({
				'top': rand,
				'left': rand
			});
		}
	});


	// смена картинок рекомендаций
	$('.recommendations__thumb').on('click', function() {
		$('.recommendations__thumb').removeClass('active');
		$(this).addClass('active');
		var imgSrc = $(this).attr('data-img-src');

		$('.recommendations__img-holder').addClass('fadeOut');
		$('.recommendations__img-holder a').attr('href', imgSrc);
		setTimeout(function() {
			$('.recommendations__img').attr('src', imgSrc);
			$('.recommendations__img-holder').removeClass('fadeOut');
		}, 200);
	});



	// запускаем видео
	$('.video__block-play').on('click', function() {
		var $video = $('#video'),
			src = $video.attr('src');
		$(this).fadeOut(400);
		$video.attr('src', src + '&autoplay=1');
	});


});