import validPhone from './validationPhone';

const page = document.querySelector('.page');
const preloaderDiv = document.createElement('div');

const reqAuthForm = document.getElementById('sending_form');
const phone = document.getElementById('this_phone');

const sendingForm = e => {
  e.preventDefault();
  if (!validPhone(phone.value)) {
    // FIXME:
    console.error('Ошибка валидации!');
    return;
  }
  preloaderDiv.classList.add('preloader');
  page.appendChild(preloaderDiv);
  setTimeout(() => {
    phone.value = '';
    reqAuthForm.setAttribute('disabled', true);
    preloaderDiv.classList = 'after_preloader';
    preloaderDiv.textContent = 'Done!';
    setTimeout(() => {
      page.removeChild(preloaderDiv);
      preloaderDiv.textContent = '';
      preloaderDiv.classList.remove('after_preloader');
    }, 2000);
  }, 3000);
};

export default () => {
  reqAuthForm.addEventListener('click', sendingForm);
  phone.addEventListener('input', event => {
    if (validPhone(event.target.value)) {
      reqAuthForm.removeAttribute('disabled');
    } else {
      reqAuthForm.setAttribute('disabled', true);
    }
  });
};
