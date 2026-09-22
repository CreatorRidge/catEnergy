const menu = document.querySelector('.main-nav__wrapper');
const menuButton = document.querySelector('.main-nav__toggle');

menuButton.onclick = function() {
  menu.classList.toggle('main-nav__wrapper--closed');
  menuButton.classList.toggle('main-nav__toggle--close');
};
