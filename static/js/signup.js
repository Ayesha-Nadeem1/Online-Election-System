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
