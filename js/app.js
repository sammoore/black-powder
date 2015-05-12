// app.js

/* configureGridItemHover
 *
 * configures an `img` element in our Grid use a Color.png on hover.
 */
this.configureGridItemHover = function( img ) {
  hover_url = img.attr('src').split("BW.png").join("Color.png");

  img.hoverImg(hover_url);


};

/* configureGridItemPlayback
 *
 * configures an `a` element to open magnific-popup with its video URL.
 */
this.configureGridItemPlayback = function ( a ) {
  a.magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    iframe: {
      patterns: {
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: 'https://player.vimeo.com/video/%id%?autoplay=1'
        },
        youtube: {
        	index: 'youtu.be/',
        	id: '/',
        	src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        }
      }
    }
  });
};

/* configureStretchToFitVideo
 *
 * configures a video tag that matches the selector
 * to stretch to the size of its container, rather than
 * maintaining aspect ratio as per W3 Specifications.
 */
this.configureStretchToFitVideo = function( selector ) {
	var $video = $(selector),
	    videoRatio = selector.videoWidth / selector.videoHeight,
	    tagRatio = $video.width() / $video.height();
	if (videoRatio < tagRatio) {
	  $video.css('-webkit-transform','scaleX(' + tagRatio / videoRatio  + ')')
	  $video.css('-moz-transform','scaleX(' + tagRatio / videoRatio  + ')')
	  $video.css('-ms-transform','scaleX(' + tagRatio / videoRatio  + ')')
	  $video.css('transform','scaleX(' + tagRatio / videoRatio  + ')')
	} else if (tagRatio < videoRatio) {
	  $video.css('-webkit-transform','scaleY(' + videoRatio / tagRatio  + ')')
	  $video.css('-moz-transform','scaleY(' + videoRatio / tagRatio  + ')')
	  $video.css('-ms-transform','scaleY(' + videoRatio / tagRatio  + ')')
	  $video.css('transform','scaleY(' + videoRatio / tagRatio  + ')')
	}
};

/* configureGrid
 *
 * Takes a selector which matches a DOM element which contains many:
 *
 * <div class="item">
     <a href="LINK_TO_VIDEO_OR_OTHER">
       <img src="path/to/anImage BW.png">
     </a>
   </div>
 *
 * and triggers configuration for the `a` and `img` element respectively.
 * It also makes any `.item-label` only appear on hover.
 */
this.configureGrid = function( selector ) {
  items = $(selector).find('.item');

  $.each(items, function () {
    $item = $(this);

    a = $item.find('a').first();
    configureGridItemPlayback(a);

    img = $item.find('img').first();
    configureGridItemHover(img);

    label = $item.find('.item-label').first();
    label.toggleClass('hidden', true);
    $(a).hover(function () {
    	console.log('hello');
    	$(this).find('.item-label').first().toggleClass('hidden');
    });
  });
};

// ===================
// ==   ON READY   ===
// ===================
$(document).ready(function () {
  // configure mobile menu
  $("#menu").sidr();
  
  // configure `a` and `img` tags in the grid.
  configureGrid('.work-section');
  configureGrid('.impact-section');

  // ------------
  // SUB-NAV CODE
  // ------------

  // selector of `a` tags that can trigger the subnav
  toggleNavSelector = 'a#toggleNav';

  $(toggleNavSelector).click(function () 
  {
    // 1. cache whether the corresponding container for clicked link is hidden
    selector = '.' + $(this).attr('href').split('#').join('');
    isHidden = $(selector).hasClass('hidden');

    // 2. now hide all containers that can be toggled 
    togglers = $(toggleNavSelector);
    togglers.each(function () {
      eachSelector = '.' + $(this).attr('href').split('#').join('');
      $(eachSelector).toggleClass('hidden', true);
    });

    // 3. if the clicked container was hidden, we then show it.
    if (isHidden) {
      $(selector).toggleClass('hidden');
    }
  });

  // ---------------------
  // Artist Collapse-ables
  // ---------------------
  toggleArtistSelector = '.toggleArtist';

  hideContainers = function () {
  	$($(this).parent()).next().toggleClass('hidden', true);

  	if ( ! $(this).attr('data-artists') ) {
  		$(this).attr('data-artists', '#artists');
  	}

		if ( $(this).attr('href') == '#artists' ) {
			$(this).attr('href', $(this).attr('data-artists'));
			$(this).attr('data-artists', '#artists');
  	}

  	// since the .click() gets called before the href is triggered,
  	// we need to swap the attributes out from the start.
  	href = $(this).attr('data-artists');
  	nextHref = $(this).attr('href');
  	$(this).attr('href', href);
  	$(this).attr('data-artists', nextHref);
  }

  $(toggleArtistSelector).each(hideContainers);

  // handle toggle attempts
  toggleArtistClick = function () {
  	$toggler = $(this);
  	$container = $toggler.parent().next();

  	// 0. cache whether the corresponding container for clicked link is hidden
  	wasHidden = $container.hasClass('hidden');

  	// 1. hide all other containers
  	$(toggleArtistSelector)
  	.not(function (index, element) {
  		if (wasHidden) {
  			return ($(element).attr('data-artists') == $toggler.attr('data-artists'));
  		} else {
  			return ($(element).attr('href') == $toggler.attr('href'));
  		}
  	})
  	.each(hideContainers);

  	// 2. hide all containers
  	togglers = $(toggleArtistSelector);
  	togglers.each(function () {
  		$(this).parent().next().toggleClass('hidden', true);
  	});

  	// 3. if the chosen container was hidden, we then show it.
  	if (wasHidden) {
  		$container.toggleClass('hidden');
  	}

  	// 5. Swap href with #artists for better user experience.
  	href = $toggler.attr('data-artists');
  	nextHref = $toggler.attr('href');
  	$toggler.attr('href', href);
  	$toggler.attr('data-artists', nextHref);
  	console.log('done click');
  };

  $(toggleArtistSelector).click(toggleArtistClick);

  toggleArtistClick.call($(toggleArtistSelector).first());

  // ------------
  // SPLASH VIDEO
  // ------------

  $video = $('.stretchToFit');

  $(window).resize(function() {
    $video.each(function() {
      var CurrentChild = this;
      configureStretchToFitVideo(CurrentChild);
    });
  });

  $video.each( function () {
  	if (this.readyState > 0) {
  		configureStretchToFitVideo(this);
  	} else {
  		$video.bind("loadedmetadata", function(anEvent) {
  			configureStretchToFitVideo(this);
  		});
  	}
  });

  // ---------------------------------
  // TRIGGER VIDEO PAUSE ON LOGO CLICK
  // ---------------------------------
  $('.toggleVideoPlayback').click(function () {
  	$video.each(function () {
  		if (this.currentTime > 0 && !this.paused && !this.ended) {
  			// video is playing
  			this.pause();
  		} else {
  			this.play();
  		}
  	});
  });

  // ===========================
  // Nav-Bar Sticky After Splash
  // ===========================

  // make nav-bar non-sticky with JavaScript, so we have sensible fall-back
  $('.bar').toggleClass('sticky', false);
  $('.bar').toggleClass('non-sticky', true);

  // swap the class based on direction of scroll
  var contentWaypoint = new Waypoint({
  	element: $('.wrapper-anchor'),
  	handler: function(direction) {
  		if (direction == 'down') {
  			$('.bar').toggleClass('non-sticky', false);
  			$('.bar').toggleClass('sticky', true);
  		} else {
  			$('.bar').toggleClass('sticky', false);
  			$('.bar').toggleClass('non-sticky', true);
  		}
  	}
  });

  // ===============
  // FORM SUBMISSION
  // ===============

  $('.submit-error').hide();
  $('#contact-form').on('submit', function () {
  	// 1. validation code TODO
  	var name = $('input#contact-name').val();
  	var email = $('input#contact-email').val();
  	var message = $('textarea#contact-message').val();

  	console.log(name);
  	console.log(email);
  	console.log(message);

  	// 2. Compile AJAX request string

  	var dataString = 'name='+ name +'&email=' + email + '&message=' + message;

  	// 3. Try sending it

  	$.ajax({
	    type: "POST",
	    url: "contact.php",
	    data: dataString,
	    success: function() {
	      console.log("OWP!");
	    },
	    failure: function() {
	    	console.log('no good');
	    }
	  })
	  .done(function (data) {
	  	if (data == 'OK') {
	  		$('.submit-error').html('Thanks for getting in touch! We will get back to you soon!');
	  	} else if (data != 'ERROR') {
	  		$('.submit-error').html(data);
	  	}

	  	$('.submit-error').show();
	  });

  	// `false` prevent page reload
  	return false;
  });

});