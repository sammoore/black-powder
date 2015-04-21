/* Hover Image Replacement Plug-in for jQuery
 * 
 * Authors: 
 *   Sam Moore - sam@hashtack.com
 *
 * Adds a query function to swap the 'src' attribute
 * of the given img tag to a desired URL on hover.
 *
 */

(function ( $ ) {

  swapImageSrc = function (image) {
    oldSrc = image.attr('src');
    newSrc = image.attr('data-hover-image')

    image.attr('src', newSrc);
    image.attr('data-hover-image', oldSrc);
  };

  hoverCallback = function(image, animated) {
    // TODO: add animated option
    swapImageSrc( $(image.delegateTarget) );
  };

  $.fn.hoverImg = function ( hover_src ) {
    this.attr('data-hover-image', hover_src);

    this.hover(
      hoverCallback,
      hoverCallback
    );
  };

})( jQuery );