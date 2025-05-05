import modal from './modules/modal.js';
import form from './modules/form.js';

window.addEventListener('DOMContentLoaded', () => {
  modal('.subscribe__overlay', ['.header__subscribe', '.footer__top-link'], '.subscribe__close');
  modal('.menu__overlay', '.header__hamburger', '.menu__close');
  form();
});
