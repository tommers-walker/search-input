import { utils } from './utils';
import 'gsap';
import '../vendor/DrawSVGPlugin';

const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const circlePath = document.querySelector('#circle-path');
const circleIcon = document.querySelector('#circle-icon');
const searchIcon = document.querySelector('#search-icon');

const enterKeyCode = 13;
const escKeyCode = 27;

let done;

const swapIconsTl = new TimelineMax({paused:true})

swapIconsTl
.fromTo(circleIcon, 0.2, {
  opacity: 0,
  scale: 0
}, {
  opacity: 1,
  scale: 1
})
.fromTo(searchIcon, 0.2, {
  opacity: 1,
  scale: 1
}, {
  opacity: 0,
  scale: 0
}, "-=0.2")

const circlePathTl = new TimelineMax({
  paused: true,
  repeat: -1,
  onStart: function() {
    done = false;
  },
  onRepeat: function() {
    if (done) {
      this.pause();
      swapIconsTl.reverse();
    }
  }
});

circlePathTl
.from(circlePath, 0.4, {
  drawSVG: "0% 0%",
  ease: Power1.easeOut
}, "-=0.1")
.to(circlePath, 0.4, {
  drawSVG: "100% 100%",
  ease: Power1.easeOut
})

const searchAnim = () => {
  swapIconsTl.restart();
  circlePathTl.restart();
}

const toggleSearchInput = () => {
  utils.toggleClass(searchInput, 'is-active')
  utils.hasClass(searchInput, 'is-active') ? searchInput.focus() : searchInput.blur();
}

const submitSearch = () => {
  searchAnim();

  // Simulate AJAX call..
  setTimeout(function() {
    done = true;
  }, 1000)
}

const search = {
  init() {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSearchInput();
    });

    document.addEventListener('keydown', function(e) {
      if (utils.hasClass(searchInput, 'is-active')) {
        if (e.keyCode === enterKeyCode) {
          e.preventDefault();
          // Submit form
          submitSearch();
        } else if (e.keyCode === escKeyCode) {
          toggleSearchInput();
        }
      }
    });
  }
}

export { search }
