// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form validation
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const validators = {
  name: (value) => value.trim().length > 0,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  message: (value) => value.trim().length > 0,
};

const errorMessages = {
  name: 'お名前を入力してください。',
  email: '正しいメールアドレスを入力してください。',
  message: 'お問い合わせ内容を入力してください。',
};

function setFieldError(field, message) {
  const row = form.querySelector(`#${field}`).closest('.form-row');
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  if (message) {
    row.classList.add('has-error');
    errorEl.textContent = message;
  } else {
    row.classList.remove('has-error');
    errorEl.textContent = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;

  Object.keys(validators).forEach((field) => {
    const value = form.querySelector(`#${field}`).value;
    if (!validators[field](value)) {
      setFieldError(field, errorMessages[field]);
      isValid = false;
    } else {
      setFieldError(field, '');
    }
  });

  if (!isValid) {
    formStatus.textContent = '';
    return;
  }

  // 送信先サーバーが未設定のため、ここではダミー送信のみ。
  // 実運用時はここを実際のAPI/フォーム送信サービスへの通信に置き換えてください。
  formStatus.textContent = 'お問い合わせありがとうございます。（このフォームはデモです。実際の送信処理は未設定です）';
  form.reset();
});
