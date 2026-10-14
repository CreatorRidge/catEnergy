const navMain = document.querySelector('.main-nav');
const menu = document.querySelector('.main-nav__wrapper');
const menuButton = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

menuButton.onclick = function() {
  menu.classList.toggle('main-nav__wrapper--closed');
  menuButton.classList.toggle('main-nav__toggle--close');
};

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.classList.add('main-nav__wrapper--closed');
    menuButton.classList.remove('main-nav__toggle--close');
  }
});


const slider = document.querySelector('.slider');
const control = document.querySelector('.case__slider-control');
const beforeImg = document.querySelector('.slider__image--before');
const afterImg = document.querySelector('.slider__image--after');
const button = document.querySelector('.slider__control-button');

document.addEventListener('DOMContentLoaded', () => {
  if (!slider) {
    return;
  }

  let isDragging = false;
  let sliderRect = null;

  function updateSlider(percent) {
    const safePercent = Math.max(0, Math.min(100, percent));
    const px = (safePercent / 100) * slider.clientWidth;

    control.style.transform = `translateX(${px}px)`;

    beforeImg.style.clipPath = `polygon(0 0, ${px}px 0, ${px}px 100%, 0 100%)`;

    afterImg.style.clipPath = `polygon(${px}px 0, 100% 0, 100% 100%, ${px}px 100%)`;
  }

  const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();

    sliderRect = slider.getBoundingClientRect();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - sliderRect.left;
    const percent = (relativeX / slider.clientWidth) * 100;

    updateSlider(percent);
  };

  const onMove = (e) => {
    if (!isDragging || !sliderRect) {
      return;
    }

    e.preventDefault();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - sliderRect.left;
    const percent = (relativeX / slider.clientWidth) * 100;

    updateSlider(percent);
  };

  const onStop = () => {
    isDragging = false;
    sliderRect = null;
  };

  button.addEventListener('mousedown', startDrag);
  button.addEventListener('touchstart', startDrag, { passive: false });

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onStop);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onStop);

  updateSlider(50);
});
