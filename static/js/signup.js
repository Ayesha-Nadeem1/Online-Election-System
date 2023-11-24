document.getElementById('SignUp-form').addEventListener('submit', function(event) {
  const firstName = document.getElementById('FirstName').value.trim();
  const lastName = document.getElementById('LastName').value.trim();
  const userName = document.getElementById('UserName').value.trim();
  const email = document.getElementById('Email').value.trim();
  const password = document.getElementById('Password').value;
  const confirmPassword = document.getElementById('CPassword').value;

  // Check if any field is empty
  if (firstName === '' || lastName === '' || userName === '' || email === '' || password === '' || confirmPassword === '') {
      alert('All fields are required.');
      event.preventDefault();
      return false;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
      alert('Password and Confirm Password must match.');
      event.preventDefault();
      return false;
  }

  openPopup();

});
function openPopup(){
  let popup= document.getElementById('popup');

  popup.classList.add('open-popup')
}

function closePopup(){
  let popup= document.getElementById('popup');

  popup.classList.remove('open-popup')
}

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