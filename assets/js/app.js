"use strict";

var fadeInNodes = document.querySelectorAll('.JS-fadein'); //Add the class
//That initializes the fadein animation

addClassToElements(fadeInNodes, 'JS-fadein--activate'); //Execute the fadein on document scroll

document.addEventListener('scroll', function () {
  animateFadeIn();
});
/**
 * The fadein animation
 * @return {Void}
 */

function animateFadeIn() {
  for (var i = 0; i < fadeInNodes.length; i++) {
    var node = fadeInNodes[i];

    if (isElementVisible(node) && !node.classList.contains('JS-fadein--animate')) {
      node.classList.add('JS-fadein--animate');
    }
  }
}
/**
 * Check if an element is in the view port
 * @param  {Element}  el The element to check
 * @return {Boolean}
 */


function isElementVisible(el) {
  var dimension = el.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  var top = dimension.top;
  var bottom = dimension.bottom;

  if (dimension.height > windowHeight) {
    bottom = bottom / 2;
  }

  return dimension.top >= 0 && bottom <= windowHeight * 1.3;
}
/**
 * Add a class to a list of elements
 * @param {Element} els       The elements to add the class to
 * @param {String} className  The class name
 */


function addClassToElements(els, className) {
  for (var i = 0; i < els.length; i++) {
    var node = els[i];
    node.classList.add(className);
  }
}