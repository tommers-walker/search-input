import 'gsap';
import '../vendor/DrawSVGPlugin';

const searchEl = document.querySelector('#search');
const searchContainer = document.querySelector('#search-container');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const svgBox = document.querySelector('#svg-box');
const searchSvg = document.querySelector('#search-svg');

const searchTl = new TimelineLite({
  paused: true,
  reversed: true,
  onReverseComplete: function() {
    searchEl.classList.remove('is-active')  
  }
});
searchTl
.to(searchBtn, 0.1, {background: "#FFF", onStart: function() {
  searchEl.classList.add('is-active')
}})
.to(searchSvg, 0.1, {fill: "#000"}, "-=0.1")
.from(searchContainer, 0.25, {width: 0}, "-=0.1")
.from(svgBox, 0.75, {delay: 0.01, drawSVG: 0, ease: Power1.easeIn})
.from(searchInput, 0.1, {opacity: 0, y: 10}, "-=0.75")

// toggle function
function toggleAnim() {
  searchTl.reversed() ? searchTl.play() : searchTl.reverse();
}

const search = {
  init() {
    window.onload = function() {
      searchEl.classList.remove('is-loading');

      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchInput.focus();
        toggleAnim();
      });
    }
  }
}

export { search }
