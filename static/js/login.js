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

// Handle login button click
// Handle login button click
async function handleLogin() {
  const loginData = { UserName: 'username', Password: 'password' }; // Replace with actual login data

  try {
      const response = await fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
      });

      if (!response.ok) {
          // Handle login failure
          return;
      }

      const data = await response.json();

      if (data.isAdmin && data.redirectURL) {
        console.log('Redirecting to:', data.redirectURL);
    
        // Redirect to admin page for admin user
        window.location.href = data.redirectURL;
    } else {
        console.log('Admin status or redirect URL not found:', data.isAdmin, data.redirectURL);
        // Handle other user types or scenarios
    }
    
    
  } catch (error) {
      // Handle errors
      console.error('Error:', error);
  }
}

// Call handleLogin when login button is clicked
const loginButton = document.getElementById('btnLogin'); // Replace with your button ID
loginButton.addEventListener('click', handleLogin);
