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
 */
this.configureGrid = function( selector ) {
  items = $(selector).find('.item');

  $.each(items, function () {
    $item = $(this);

    a = $item.find('a').first();
    configureGridItemPlayback(a);

    img = $item.find('img').first();
    configureGridItemHover(img);
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

  // hide all containers
  $(toggleArtistSelector).each(function () {
  	$(this).next().toggleClass('hidden', true);
  });

  // handle toggle attempts
  $(toggleArtistSelector).click(function () {
  	$toggler = $(this);
  	$container = $toggler.next();
  	
  	// 1. cache whether the corresponding container for clicked link is hidden
  	wasHidden = $container.hasClass('hidden');

  	// 2. hide all containers
  	togglers = $(toggleArtistSelector);
  	togglers.each(function () {
  		$(this).next().toggleClass('hidden', true);
  	});

  	// 3. if the chosen container was hidden, we then show it.
  	if (wasHidden) {
  		$container.toggleClass('hidden');
  	}
  });

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
});