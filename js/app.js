// app.js

var configureGridItemHover = function( img ) {
  hover_url = img.attr('src').split("BW.png").join("Color.png");

  img.hoverImg(hover_url);
};

var configureGridItemPlayback = function ( a ) {
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

var configureGrid = function( selector ) {
  items = $(selector).find('.item');

  $.each(items, function () {
    item = $(this);

    a = item.find('a').first();
    configureGridItemPlayback(a);

    img = item.find('img').first();
    configureGridItemHover(img);
  });
};

var configureSocial = function( selector ) {
  $(selector).each(function () {
    var $img = $(this).find('img').first();
    //hover_url = $img.attr('src').split('.png').join(' hover.png');
    // $img.hoverImg(hover_url);
  });
};

$(document).ready(function () {
  $("#menu").sidr();
  
  configureGrid('.work-section');
  configureGrid('.impact-section');

  configureSocial('.contact-section ul li');

  toggleNavSelector = 'a#toggleNav';

  $(toggleNavSelector).click(function () {
    selector = '.' + $(this).attr('href').split('#').join('');
    isHidden = $(selector).hasClass('hidden');

    togglers = $(toggleNavSelector);
    togglers.each(function () {
      eachSelector = '.' + $(this).attr('href').split('#').join('');
      $(eachSelector).toggleClass('hidden', true);
    });

    if (isHidden == true) {
      $(selector).toggleClass('hidden');
    }
  });

  /* RESIZE VIDEO CODE */

  var ResizeVideo = function(videoTag) {
    console.log(videoTag);
    var $video = $(videoTag),
        videoRatio = videoTag.videoWidth / videoTag.videoHeight,
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

  $(window).resize(function() {
    $('.stretchToFit').each(function() {
      var CurrentChild = this;
      ResizeVideo(CurrentChild);
    });
  });

  $('video').bind("loadeddata", function(anEvent) {
    var loadedVideoElement = anEvent.target;
    if ($(loadedVideoElement).hasClass('stretchToFit')) {
      ResizeVideo(loadedVideoElement);
    }
  });

  $('.stretchToFit').each(function() {
    var CurrentChild = this;
    ResizeVideo(CurrentChild);
  });
});