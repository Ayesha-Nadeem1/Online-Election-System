document.getElementById('btn-SignUp').addEventListener('click', function() {
    fetch('/SignUp')
      .then(response => {
        if (response.ok) {
          console.log('Request successful');
          // Redirect to the SignUp page
          window.location.href = '/SignUp';
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  