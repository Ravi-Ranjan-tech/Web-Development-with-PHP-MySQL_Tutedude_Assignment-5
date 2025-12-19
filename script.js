// Assignment5 rebuilt: validation + show/hide password + accessible messages
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passInput = document.getElementById('password');
const togglePass = document.getElementById('toggle-pass');
const resultBox = document.getElementById('result');
const yearSpan = document.getElementById('year');

// set current year in footer
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

function setError(el, msg){
  const box = document.getElementById(el.id + '-error');
  if (box) box.textContent = msg || '';
  el.setAttribute('aria-invalid', !!msg);
}

function clearAllErrors(){
  ['name','email','phone','password'].forEach(id=>{
    const box = document.getElementById(id + '-error');
    if (box) box.textContent = '';
    const el = document.getElementById(id);
    if (el) el.removeAttribute('aria-invalid');
  });
  resultBox.className = '';
  resultBox.textContent = '';
}

function isEmailValid(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPhoneValid(phone){
  return /^\d{10}$/.test(phone);
}

function isStrongPassword(p){
  return /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && p.length >= 8;
}

// toggle password visibility
if (togglePass) togglePass.addEventListener('click', ()=>{
  if (passInput.type === 'password'){
    passInput.type = 'text';
    togglePass.textContent = 'Hide';
    togglePass.setAttribute('aria-label','Hide password');
  } else {
    passInput.type = 'password';
    togglePass.textContent = 'Show';
    togglePass.setAttribute('aria-label','Show password');
  }
});

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  clearAllErrors();
  let ok = true;

  if (!nameInput.value.trim()){ setError(nameInput,'Name is required'); ok = false; }

  if (!emailInput.value.trim()){ setError(emailInput,'Email is required'); ok = false; }
  else if (!isEmailValid(emailInput.value.trim())){ setError(emailInput,'Email format is invalid'); ok = false; }

  const digits = phoneInput.value.replace(/\D/g,'');
  if (!digits){ setError(phoneInput,'Phone is required'); ok = false; }
  else if (!isPhoneValid(digits)){ setError(phoneInput,'Phone must be 10 digits'); ok = false; }

  if (!passInput.value){ setError(passInput,'Password is required'); ok = false; }
  else if (!isStrongPassword(passInput.value)){ setError(passInput,'Password must be 8+ chars and include upper, lower, number'); ok = false; }

  if (!ok){
    resultBox.className = 'error';
    resultBox.textContent = 'Please fix the highlighted errors.';
    const firstErr = document.querySelector('.error:not(:empty)');
    if (firstErr){
      const ctrl = firstErr.previousElementSibling || firstErr.parentElement.querySelector('input');
      if (ctrl && typeof ctrl.focus === 'function') ctrl.focus();
    }
    return;
  }

  resultBox.className = 'success';
  resultBox.textContent = 'Form submitted successfully!';
  form.reset();
});
