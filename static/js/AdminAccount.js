window.addEventListener('error', function(event) {
  console.log('error');
  const errorData = {
      message: event.message,
      filename: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno,
      error: event.error ? event.error.stack : null
  };
console.log(errorData)
  // Send the errorData to your server (via an API endpoint)
  fetch('/log/error', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },

      body: JSON.stringify(errorData)
  }).then(response => {
      // Handle response if needed
  }).catch(error => {
      console.error('Error sending error data:', error);
  });
});
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()