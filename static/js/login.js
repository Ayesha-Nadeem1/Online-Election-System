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

//   async function handleLogin() {
//     const loginData = { UserName: 'username', Password: 'password' }; // Replace with actual login data
//     console.log('Admin status or redirect URL not found:')

//     try {
//         const response = await fetch('/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(loginData),
//         });
//         if (!response.ok) {
//             // Handle login failure
//             return;
//         }

//         const data = await response.json();
//         console.log(data);

//         if (data.isAdmin && data.redirectURL) {
//             console.log('Redirecting to:', data.redirectURL);
//             // Redirect to admin page for admin user
//             window.location.href = data.redirectURL;
//         } else {
//             console.log('Admin status or redirect URL not found:', data.isAdmin, data.redirectURL);
//             // Handle other user types or scenarios
//             // For example, redirect to a default user page
//             window.location.href = '/user/dashboard'; // Replace with your default user dashboard URL
//         }
//     } catch (error) {
//         // Handle errors
//         console.error('Error:', error);
//     }
// }

// // Call handleLogin when login button is clicked
// document.addEventListener('DOMContentLoaded', () => {
//     const loginButton = document.getElementById('btnLogin');
//     loginButton.addEventListener('click', handleLogin);
// });
