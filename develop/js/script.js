$(function() {

	// фенсибокс
	$('.js-fancybox').fancybox();

	// замена телефонов по клику на города в header
	$('.js-phone-trigger').on('click', function() {
		var trigger = $(this).parents('.js-phone-trigger-parent').find('.js-phone-trigger'),
			holder = $(this).parents('.js-phone-trigger-parent').find('.js-phone-holder'),
			dataPhone = $(this).attr('data-phone');

		trigger.removeClass('active');
		$(this).addClass('active');
		holder.addClass('blur-in');
		holder.attr('href', 'tel:+' + dataPhone.replace(/[^0-9]/g, "") + '');
		setTimeout(function() {
			holder.html(dataPhone);
			holder.removeClass('blur-in');
		}, 200)
	});

	// открываем моб меню
	$('.header__menu-btn-open').on('click', function() {
		$('.header__menu-block').addClass('active');
	});

	$('.header__menu-btn-close').on('click', function() {
		$('.header__menu-block').removeClass('active');
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
		$('.advantages__el').each(function(i) {
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

			for (k = 0; k <= i; k++) {
				rand = ((Math.random() * 10) - 20);
				rand2 = ((Math.random() * 20));
				$(this).css('transform', 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + (range + rand - rand2) + ', 0, 1)');
			}
		});
	}

	elBuilding();

	$(window).on('scroll load resize', function() {
		elBuilding();
		advElPosition();
	});


	// задаем разные позиции превьюхам картинок рекомендаций
	$('.recommendations__thumb').each(function(i) {
		for (k = 0; k <= i; k++) {
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

	// collapse 
	$('[collapse-trigger]').on('click', function() {
		$('#' + $(this).attr('collapse-trigger') + '').fadeToggle(400);
	});

	// выбираем нужный нам вариант разработки
	$('.prefooter-form__block-inner-select-item').on('click', function() {
		$('.prefooter-form__block-inner-select-holder').html($(this).html());
		$('.js-data-develop').val($(this).html());
		$(this).parent().fadeOut(400);
	});

	// меняем значения ночь/утро/день/вечер
	var date = new Date(),
		hours = date.getHours(),
		timeImg = $('.js-time-img'),
		timeText = $('.js-time-text');

	$(window).on('load', function() {
		$('.prefooter-form__block-inner-description').addClass('fadeIn');
	});

	switch (true) {
		case (hours >= 7 && hours < 12):
			timeImg.attr('src', 'img/prefooter-img-1.png');
			timeText.html('Еще утро, так что ответ будет уже к обеду!');
			break;
		case (hours >= 12 && hours < 18):
			timeImg.attr('src', 'img/prefooter-img-2.png');
			timeText.html('Сейчас день, ответим в течении пары часов!');
			break;
		case (hours >= 18 && hours < 24):
			timeImg.attr('src', 'img/prefooter-img-3.png');
			timeText.html('Уже, вечер, так что ответ будет у вас утром!');
			break;
		case (hours >= 0 && hours < 7):
			timeImg.attr('src', 'img/prefooter-img-4.png');
			timeText.html('Сейчас ночь, но уже в обед вы получите ответ!');
			break;
	}

	// открываем языковую панель
	var currentLang = $('.prefooter-form__block-inner-select-holder'),
		langList = $('.prefooter-form__block-inner-select');

	$(document).mouseup(function(e) {
		if (langList.has(e.target).length === 0 && currentLang.has(e.target).length === 0) {
			langList.fadeOut(400);
		}
	});


});