const feedbackForm = document.querySelector('form.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

let localStorageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};

const setFormValuesFromLocalStorage = () => {
  email.value = localStorageData.email ? localStorageData.email.trim() : '';
  message.value = localStorageData.message ? localStorageData.message.trim() : '';
};

const handleInput = (event, field) => {
  const value = event.target.value.trim();
  localStorageData = { ...localStorageData, [field]: value };
  localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
};

const handleSubmit = event => {
  event.preventDefault();
  const form = event.target;

  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('The email and message fields must be filled in');
    return;
  }

  console.log({ email: email.value.trim(), message: message.value.trim() });
  localStorageData = {};
  localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
  form.reset();
};

document.addEventListener('DOMContentLoaded', () => {
  setFormValuesFromLocalStorage(); // Встановлення значень форми при завантаженні сторінки
});

email.addEventListener('input', event => handleInput(event, 'email'));
message.addEventListener('input', event => handleInput(event, 'message'));
feedbackForm.addEventListener('submit', handleSubmit);