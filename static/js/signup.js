document.getElementById('btn-SignIn').addEventListener('click', function () {
  fetch('/')
    .then(response => {
      if (response.ok) {
        console.log('Request successful');
        // Redirect to the SignUp page
        window.location.href = '/';
      } else {
        throw new Error('Request failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


const form = document.getElementById('SignUp-form');
const firstName = document.getElementById('FirstName');
const lastName = document.getElementById('LastName');
const username = document.getElementById('UserName');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const password2 = document.getElementById('CPassword');

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if (firstNameValue === '') {
    setError(username, 'First Name is required');
  } else {
    setSuccess(username);
  }
  if (lastNameValue === '') {
    setError(username, 'LastName is required');
  } else {
    setSuccess(username);
  }
  if (usernameValue === '') {
    setError(username, 'Username is required');
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 character.')
  } else {
    setSuccess(password);
  }

  if (password2Value === '') {
    setError(password2, 'Please confirm your password');
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }

};
