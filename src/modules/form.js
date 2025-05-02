export default function form() {
  const form = document.querySelector('.form');
  const formSuccess = document.querySelector('.form__success');
  const btn = document.querySelector('.form__btn');
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegExp = /^\+?\d[\d\s\-()]{7,}$/;

  const name = new Input('#name', '#name-err', { required: true, min: 3 });
  const surname = new Input('#surname', '#surname-err', { required: true, min: 3 });
  const email = new Input('#email', '#email-err', { required: true, reg: emailRegExp });
  const phone = new Input('#phone', '#phone-err', { required: true, reg: phoneRegExp });

  [name, surname, email, phone].forEach((input) => {
    input.elem.addEventListener('focus', () => {
      input.clearErr();
    });
    input.elem.addEventListener('blur', () => {
      input.check();
    });
  });

  function Input(elem, elemErr, checks = {}) {
    this.elem = document.querySelector(elem);
    this.elemErr = document.querySelector(elemErr);
    this.checks = checks;

    this.check = function () {
      // валидация
      if (this.checks.required && !this.elem.value) {
        this.showErr('This field is required');
      } else if (this.checks.min && this.elem.value.length < this.checks.min) {
        this.showErr(`Enter at least ${this.checks.min} characters`);
      } else if (this.checks.reg && !this.checks.reg.test(this.elem.value)) {
        this.showErr('Invalid format');
      } else {
        this.clearErr();
      }
    };

    this.showErr = function (message) {
      this.elemErr.textContent = message;
      this.elemErr.style.display = 'flex';
      this.elem.style.borderColor = 'red';
    };

    this.clearErr = function () {
      this.elemErr.style.display = 'none';
      this.elemErr.textContent = '';
      this.elem.style.borderColor = '#bcc6d0';
    };
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    name.check();
    surname.check();
    email.check();
    phone.check();

    if (
      !name.elemErr.textContent &&
      !surname.elemErr.textContent &&
      !email.elemErr.textContent &&
      !phone.elemErr.textContent
    ) {
      btn.setAttribute('disabled', ''); // блокирует кнопку, пока не пришел ответ

      const formData = {
        name: name.elem.value,
        surname: name.elem.value,
        email: email.elem.value,
        phone: phone.elem.value,
      };
      const response = await postData('/server.php', formData); // await cюда и async в начале, чтобы результат был после обработки запроса

      btn.removeAttribute('disabled', '');

      if (response.success) {
        // форма успешно отправлена
        resetForm();
        showResult('Form successfully submitted');
      } else {
        showResult('Form submission error');
      }
    }
  });

  function resetForm() {
    form.style.display = 'flex';
    formSuccess.style.display = 'none';
    name.elem.value = '';
    surname.elem.value = '';
    email.elem.value = '';
    phone.elem.value = '';
    [name, surname, email, phone].forEach((input) => {
      input.clearErr();
    });
  }

  function showResult(result) {
    console.log(result);
    form.style.display = 'none';
    formSuccess.style.display = 'flex';
  }

  async function postData(url, data) {
    // заглушка
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
    return await {
      ...result,
      success: true,
    };
  }

  return { resetForm };
}
