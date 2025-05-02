import form from './form.js';
const { resetForm } = form();

export default function modal(modalBlockSelector, modalOpenersSelector, modalCloseSelector) {
  const modalBlock = document.querySelector(modalBlockSelector);

  const combinedSelector = Array.isArray(modalOpenersSelector)
  ? modalOpenersSelector.join(', ')
  : modalOpenersSelector;

  const modalOpeners = document.querySelectorAll(combinedSelector); 

  modalOpeners.forEach((opener) => {
    opener.addEventListener('click', () => {
      showModal();
    });
  });

  modalBlock.addEventListener('click', (event) => {
    if (event.target === modalBlock || event.target.closest(modalCloseSelector)) {
      hideModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modalBlock.classList.contains('active')) {
      hideModal();
    }
  });

  function showModal() {
    modalBlock.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modalBlock.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
  }
}